import { types, IModelType } from 'mobx-state-tree';

// tslint:disable-next-line:no-any
export default (name: string, ...fields: IModelType<any, any>[]) =>
   types.model(name, fields.reduce(
      (x, field) =>
         ({ ...x, [field.name]: types.optional(field, {}) }),
      {}));
