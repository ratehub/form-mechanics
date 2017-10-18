import { types } from 'mobx-state-tree';
import { FieldComponentType } from '../types';
import validityModel from './validityModel';

interface FieldConfig<T, U> {
   readonly required?: boolean;
   readonly widget: FieldComponentType<T, U>;
}

type X = {
   readonly [ID: string]: FieldConfig<string, string>;
};

const fieldModel = (id: string, { widget, required = false }: FieldConfig<string, string>) =>
   types.model(id, {
      dirty: types.optional(types.boolean, false),
      validity: types.optional(validityModel(types.string), { state: 'VALIDATING' }),
      raw: types.string,
   });

const formModel = (id: string, fields: X) =>
   types.model(id, {
      touched: types.optional(types.boolean, false),
      error: types.maybe(types.string),
      fields: types.optional(
         types.model(`FormFields(${id})`, Object.keys(fields).reduce(
            (props, fieldId: string) => ({
               ...props,
               [fieldId]: types.optional(fieldModel(id, fields[id]), {}),
            }),
            {} as { notUndefined: true })),
         {}),
   });


export default formModel;
