import { process, types } from 'mobx-state-tree';
import { validate } from '../validation';
import validityModel from './validityModel';
import { VALIDATING, INVALID } from '../types';
import { MSTComponentType } from '.';


interface FieldConfig<TRaw, TClean> {
   readonly disabled?: boolean;
   readonly required?: boolean;
   readonly widget: MSTComponentType<TRaw, TClean>;
}


type TFields = {
   readonly [ID: string]: FieldConfig<string, string>;
};


const fieldModel = (id: string, {
   widget,
   required = false,
   disabled = false,
   // tslint:disable-next-line:no-any
}: FieldConfig<any, any>) => {
   const ValidityModel = types.optional(validityModel(types.string), { state: VALIDATING });
   return types.model(id, {
      touched: types.optional(types.boolean, false),
      validity: ValidityModel,
      raw: types.optional(types.string, ''),
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
      setValidity(validity: typeof ValidityModel.Type) {
         // this action shouldn't need to exist, but there's an issue with mobx transactions, and wrapping this
         // mutation fixes it for now.
         self.validity = validity;
      }
   }))
   .actions(self => ({
      validate: process(function* () {
         self.validity = { state: VALIDATING };
         try {
            const validity = yield validate(self.raw, required, widget.isEmpty, widget.validate);
            // MST bug? switch the following two lines to render with a dead validity subtree.
            // self.validity = validity;
            self.setValidity(validity);
         } catch (err) {
            self.setValidity({ state: INVALID, reason: `Error while validating: ${err}` });
         }
      }),
   }))
   .actions(self => ({
      afterCreate() {  // lifecycle hook
         self.validate();
      },
      handleCommit() {
         self.touched = true;
         self.validate();
      },
      handleUpdate(newValue: string) {
         self.raw = newValue;
         if (self.dirty) {
            self.validate();
         }
      },
   }));
};


const formModel = (id: string, fields: TFields) =>
   types.model(id, {
      touched: types.optional(types.boolean, false),
      error: types.maybe(types.string),
      fields: types.optional(
         types.model(`${id}Fields`, Object.keys(fields).reduce(
            (props, fieldId: string) => ({
               ...props,
               [fieldId]: types.optional(fieldModel(id, fields[fieldId]), {}),
            }),
            {} as { notUndefined: true })),
         {}),
   });


export default formModel;
