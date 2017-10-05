import { types, IModelType } from 'mobx-state-tree';

// tslint:disable-next-line:no-any
const makeFields = (fields: IModelType<any, any>[]) =>
   types.model('fields', fields.reduce(
      (fieldsSpec, field) =>
         ({ ...fieldsSpec, [field.name]: types.optional(field, {}) }),
      {}));

// tslint:disable-next-line:no-any
export default (name: string, ...fields: IModelType<any, any>[]) =>
   types.model(name, {
      dirty: types.optional(types.boolean, false),
      error: types.maybe(types.string),
      fields: types.optional(makeFields(fields), {}),
   });
