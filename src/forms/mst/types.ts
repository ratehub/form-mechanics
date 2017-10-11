import * as React from 'react';
import { observer } from 'mobx-react';
import { process, types, IType } from 'mobx-state-tree';
import getName from 'react-display-name';
import { InputComponentType, VALID, VALIDATING, INVALID } from '../types';
import validate from '../validate';

export const make = <T, U>(InputComponent: InputComponentType<T, U>,
                           name: string,
                           emptyValue: T,
                                // tslint:disable-next-line:no-any
                           valueModel: IType<T, any>,
                                // tslint:disable-next-line:no-any
                           cleanModel: IType<U, any>
) => {
   const Valid = types.model('Valid', {
      state: types.literal(VALID),
      cleanValue: cleanModel,
   });
   const Validating = types.model('Validating', {
      state: types.literal(VALIDATING),
   });
   const Invalid = types.model('Invalid', {
      state: types.literal(INVALID),
      reason: types.string,
   });

   interface Props {
      // tslint:disable-next-line:no-any
      field: any;
   }

   const _Wrapped: React.StatelessComponent<Props> = ({ field }) =>
      React.createElement(InputComponent, {
         dirty: field.dirty,
         // TODO: required from factory
         onCommit: field.handleCommit,
         onUpdate: field.handleUpdate,
         validity: field.validity,
         value: field.value,
      });
   _Wrapped.displayName = `mst(${getName(InputComponent)})`;
   const Wrapped = observer(_Wrapped);

   const Model = types
      .model(name, {
         dirty: types.optional(types.boolean, false),
         validity: types.optional(types.union(Valid, Validating, Invalid),
                                  { state: VALIDATING }),
         value: types.optional(valueModel, emptyValue)
      })
      .views(self => ({
         get Component() {
            return Wrapped;
         }
      }))
      .actions(self => ({
         // tslint:disable-next-line:no-any
         setValidity(validity: any) {
            // this action shouldn't need to exist, but there's an issue with mobx transactions, and wrapping this
            // mutation fixes it for now.
            self.validity = validity;
         }
      }))
      .actions(self => ({
         validate: process(function* () {
            self.validity = { state: VALIDATING };
            try {
               const validity = yield validate(self.value, false, () => false, InputComponent.validate);

               // MST bug? switch the following two lines to render with a dead validity subtree.
               // self.validity = validity;
               self.setValidity(validity);
            } catch (err) {
               throw err;
            }
         }),
      }))
      .actions(self => ({
         handleCommit() {
            self.dirty = true;
            self.validate();
         },
         // tslint:disable-next-line:no-any
         handleUpdate(newValue: IType<T, any>) {
            self.value = newValue;
            if (self.dirty) {
               self.validate();
            }
         },
      }));

   return Model;
};

import RawText from '../inputs/Text';
import RawEmail from '../inputs/Email';

// tslint:disable-next-line:no-any
export const text = (name: string, _: any) => make<string, string>(RawText, name, '', types.string, types.string);
// tslint:disable-next-line:no-any
export const email = (name: string, _: any) => make<string, string>(RawEmail, name, '', types.string, types.string);
