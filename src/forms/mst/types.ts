import * as React from 'react';
import { observer } from 'mobx-react';
import { clone, process, isAlive, types, IType } from 'mobx-state-tree';
import getName from 'react-display-name';
// import RawEmail, { P as EmailP } from './Email';
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
      console.log('RENDER', name, 'isa', isAlive(field), isAlive(field.validity), field) ||
      React.createElement(InputComponent, {
         dirty: field.dirty,
         // TODO: required from factory
         onCommit: field.handleCommit,
         onUpdate: field.handleUpdate,
         validity: clone(field.validity),
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
            self.validity = validity;
         }
      }))
      .actions(self => ({
         validate: process(function* () {
            console.log('before setting to validating', isAlive(self.validity));
            self.validity = { state: VALIDATING };
            console.log('after setting to validating, before validating', isAlive(self.validity));
            try {
               const validity = yield validate(self.value, false, () => false, InputComponent.validate);
               console.log('after validating, before setting with', validity);

               // MST bug? switch the following two lines to render with a dead validity subtree.
               // self.validity = validity;
               self.setValidity(validity);

               console.log('after setting validity', isAlive(self.validity));
            } catch (err) {
               throw err;
            }
            console.log('end of action', isAlive(self.validity));
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
