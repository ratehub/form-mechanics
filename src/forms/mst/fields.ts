import * as React from 'react';
import { observer } from 'mobx-react';
import { process, types, IType } from 'mobx-state-tree';
import getName from 'react-display-name';
import { InputComponentType, FieldOptions, VALID, VALIDATING, INVALID } from '../types';
import validate from '../validate';

export const make = <T, U>(InputComponent: InputComponentType<T, U>,
                           name: string,
                           { required = false }: FieldOptions,
                           emptyValue: T,
                           isEmpty: (x: string) => boolean,
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
               const validity = yield validate(self.value, required, isEmpty, InputComponent.validate);

               // MST bug? switch the following two lines to render with a dead validity subtree.
               // self.validity = validity;
               self.setValidity(validity);
            } catch (err) {
               throw err;
            }
         }),
      }))
      .actions(self => ({
         afterCreate() {  // lifecycle hook
            self.validate();
         },
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
         reset() {
            self.dirty = false;
            self.value = emptyValue;
            self.validate();
         },
      }));

   return Model;
};

import RawText from '../inputs/Text';
import RawEmail from '../inputs/Email';

const isStringEmpty = (value: string) =>
   value === '';

const makeString = (Component: InputComponentType<string, string>) =>
   (name: string, options: FieldOptions) =>
      make<string, string>(Component, name, options, '', isStringEmpty, types.string, types.string);

export const text = makeString(RawText);
export const email = makeString(RawEmail);
