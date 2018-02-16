import { types, IType } from 'mobx-state-tree';
import { VALID, VALIDATING, INVALID, Validity } from '../types';
import { MSTComponentType } from '.';
import fieldModel from './fieldModel';


interface FieldConfig<TRaw, TClean> {
   readonly disabled?: boolean;
   readonly required?: boolean;
   // tslint:disable-next-line:no-any
   readonly valueType?: IType<any, any>;
   readonly inputComponent: MSTComponentType<TRaw, TClean>;
}


type TFields<TClean> = {
   readonly [ID: string]: FieldConfig<string, TClean>;
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
