import * as React from 'react';
import { observer } from 'mobx-react';
import { types, IType } from 'mobx-state-tree';
import getName from 'react-display-name';
// import RawEmail, { P as EmailP } from './Email';
import { VALID, VALIDATING, INVALID } from '../types';

export const make = <T, U>(InputComponent: React.ComponentType,
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

   const Wrapped: React.StatelessComponent<Props> = ({ field }) =>
      React.createElement(InputComponent, {
         dirty: field.dirty,
         // TODO: required from factory
         onCommit: field.handleCommit,
         onUpdate: field.handleUpdate,
         validity: field.validity,
         value: field.value,
      } as {});  // wat
   
   Wrapped.displayName = `mst(${getName(InputComponent)})`;

   const Model = types
      .model(name, {
         dirty: types.optional(types.boolean, false),
         validity: types.optional(types.union(Valid, Validating, Invalid),
                                  Validating.create({ state: VALIDATING })),
         value: types.optional(valueModel, emptyValue)
      })
      .views(self => ({
         get Component() {
            return observer(Wrapped);
         }
      }))
      .actions(self => ({
         handleCommit() {
            // TODO
         },
         // tslint:disable-next-line:no-any
         handleUpdate(newValue: IType<T, any>) {
            self.value = newValue;
         },
      }));

   return Model;
};

import RawText from '../inputs/Text';

// tslint:disable-next-line:no-any
export const text = (name: string, _: any) => make<string, string>(RawText, name, '', types.string, types.string);
export const email = text;
