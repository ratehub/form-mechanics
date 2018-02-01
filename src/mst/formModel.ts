import { flow, types, IType } from 'mobx-state-tree';
import { validate } from '../validation';
import validityModel from './validityModel';
import { VALID, VALIDATING, INVALID, Validity } from '../types';
import { MSTComponentType } from '.';


interface FieldConfig<TRaw, TClean> {
   readonly disabled?: boolean;
   readonly required?: boolean;
   // tslint:disable-next-line:no-any
   readonly valueType?: IType<any, any>;
   readonly widget: MSTComponentType<TRaw, TClean>;
}


type TFields<TClean> = {
   readonly [ID: string]: FieldConfig<string, TClean>;
};


const getFieldId = (() => {
   let currentId = 0;
   return () => currentId++;
})();


const fieldModel = <TClean>(id: string, {
   widget,
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
      };
   })
   .views(self => ({
      get Component() {
         return widget;
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
      afterCreate() {  // lifecycle hook
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


// tslint:disable-next-line:no-any
const formModel = (id: string, fields: TFields<any>) =>
   types.model(id, {
      touched: types.optional(types.boolean, false),
      error: types.maybe(types.string),
      fields: types.optional(
         types.model(`${id}Fields`, Object.keys(fields).reduce(
            (props, fieldId: string) => ({
               ...props,
               [fieldId]: types.optional(fieldModel(fieldId, fields[fieldId]), {}),
            }),
            {} as { notUndefined: true })),
         {}),
   })
   .views(self => ({
      get dirty(): boolean {
         return self.touched || Object.keys(self.fields).some(f => self.fields[f].dirty);
      },
      // tslint:disable-next-line:no-any
      get raw(): any {
         return Object.keys(self.fields).reduce(
            (r, f) => {
               r[f] = self.fields[f].raw;
               return r;
            },
            {});
      },
      // tslint:disable-next-line:no-any
      get validity(): Validity<any, {k: any}> {
         return Object.keys(self.fields).reduce(
            // tslint:disable-next-line:no-any
            (v: Validity<any, any[]>, name: string) => {
               if (v.state === VALIDATING) {
                  return { state: VALIDATING };
               }
               const field = self.fields[name];
               if (field.validity.state === VALIDATING) {
                  return field.validity;
               } else if (v.state === INVALID) {
                  if (field.validity.state === INVALID) {
                     v.reason[name] = field.validity.reason;
                  }
                  return v;
               } else if (field.validity.state === INVALID) {
                  return {
                     state: INVALID,
                     reason: { [name]: field.validity.reason },
                  };
               }
               v.cleanValue[name] = field.validity.cleanValue;
               return v;
            },
            {
               state: VALID,
               cleanValue: {},
            });
      }
   }))
   .actions(self => ({
      touch() {
         self.touched = true;
      }
   }));


export default formModel;
