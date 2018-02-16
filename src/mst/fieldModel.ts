import { flow, types, IType } from 'mobx-state-tree';
import { validate } from '../validation';
import validityModel from './validityModel';
import { VALID, VALIDATING, INVALID } from '../types';
import { MSTComponentType } from '.';

interface FieldConfig<TRaw, TClean> {
   readonly disabled?: boolean;
   readonly required?: boolean;
   // tslint:disable-next-line:no-any
   readonly valueType?: IType<any, any>;
   readonly inputComponent: MSTComponentType<TRaw, TClean>;
}

const getFieldId = (() => {
   let currentId = 0;
   return () => currentId++;
})();

const fieldModel = <TClean>(id: string, {
   inputComponent,
   valueType = types.string,
   required = false,
   disabled = false,
   // tslint:disable-next-line:no-any
}: FieldConfig<any, TClean>) => {
   const cleanValueType = required ? valueType : types.maybe(valueType);
   return types.model(id, {
      touched: types.optional(types.boolean, false),
      committed: types.optional(types.boolean, false),  // validates on init with commit=true
      validity: types.optional(validityModel(cleanValueType), { state: VALIDATING }),
      raw: types.optional(types.string, ''),
   })
   .views((self) => {
      const volatileId = `field-id-${getFieldId()}`;
      return {
         get htmlId() {
            return volatileId;
         },
         get name() {
            return id;
         },
      };
   })
   .views(self => ({
      get Component() {
         return inputComponent;
      },
      get disabled() {
         return disabled;
      },
      get required() {
         return required;
      },
      get dirty() {
         return self.touched;
      },
   }))
   .actions(self => ({
      validate: flow(function* (commit: boolean) {
         self.validity = { state: VALIDATING };
         try {
            const validity = yield validate(self.raw, required, self.Component.isEmpty, self.Component.validate);
            self.validity = validity;
            if (validity.state !== VALID) {
               // always un-commit if we're no longer valid
               self.committed = false;
            } else if (commit) {
               self.committed = true;
            }
         } catch (err) {
            self.validity = { state: INVALID, reason: `Error while validating: ${err}` };
         }
      }),
   }))
   .actions(self => ({
      afterCreate() {  // mst lifecycle hook
         self.validate(true);
      },
      async handleCommit() {
         self.touched = true;
         await self.validate(true);
      },
      handleUpdate(newValue: string) {
         self.raw = newValue;
         self.committed = false;
         if (self.dirty) {
            self.validate(false);
         }
      },
   }));
};

export default fieldModel;
