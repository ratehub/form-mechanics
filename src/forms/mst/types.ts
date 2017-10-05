import * as React from 'react';
import * as mst from 'mobx-state-tree';
// import getName from 'react-display-name';
// import RawEmail, { P as EmailP } from './Email';
import { VALID, VALIDATING, INVALID } from '../types';
import { types, IType } from 'mobx-state-tree';

export const makeModel = <T, U>(name: string,
                                emptyValue: T,
                                // tslint:disable-next-line:no-any
                                valueModel: IType<T, any>,
                                // tslint:disable-next-line:no-any
                                cleanModel: IType<U, any>
) => {
   const Valid = types.model('Valid', {
      state: types.literal(VALID),
      cleanValue: types.model(cleanModel),
   });
   const Validating = types.model('Validating', {
      state: types.literal(VALIDATING),
   });
   const Invalid = types.model('Invalid', {
      state: types.literal(INVALID),
      reason: types.string,
   });

   const Model = types.model(name, {
      dirty: types.optional(types.boolean, false),
      validity: types.optional(types.union(Valid, Validating, Invalid),
                               Validating.create()),
      value: types.model(valueModel),
   });
   console.log(Model);
   return (() => null) as React.StatelessComponent;
};

// const stateWrap = <T, U, V = {}>(Component: InputComponentType<T, U, V>
// ): React.StatelessComponent =>

// export const EmailModel = makeModel('Email', '', types.string, types.string);

import { Text } from '../vanilla';
import { Email } from '../vanilla';

// tslint:disable-next-line:no-any
export const text = (name: string, options: {}): mst.IModelType<any, any> =>
   mst.types
      .model(name, {})
      .views((_) => ({
         get Component() {
            return Text;
         }
      }));

// tslint:disable-next-line:no-any
export const email = (name: string, options: {}): mst.IModelType<any, any> =>
   mst.types
      .model(name, {})
      .views((_) => ({
         get Component() {
            return Email;
         }
      }));
