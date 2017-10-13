// import { types, IModelType } from 'mobx-state-tree';

// // tslint:disable-next-line:no-any
// const makeFields = (fields: IModelType<any, any>[]) =>
//    types.model('fields', fields.reduce(
//       (fieldsSpec, field) =>
//          ({ ...fieldsSpec, [field.name]: types.optional(field, {}) }),
//       {}));

// // tslint:disable-next-line:no-any
// export default (name: string, ...fields: IModelType<any, any>[]) =>
//    types.model(name, {
//       touched: types.optional(types.boolean, false),
//       error: types.maybe(types.string),
//       fields: types.optional(makeFields(fields), {}),
//    })
//    .actions(self => ({
//       touch() {
//          self.touched = true;
//       },
//       reset() {
//          self.touched = false;
//          self.error = null;
//          Object.keys(self.fields).forEach(fieldName => {
//             const { [fieldName]: field } = self.fields;
//             field.reset();
//          });
//       },
//    }))
//    .views(self => ({
//       get dirty() {
//          return self.touched || Object.keys(self.fields)
//             .every((k: string) => self.fields[k].dirty);
//       },
//       get validity() {
//          return Object.keys(self.fields).reduce(
//             (v, n) => {
//                if (self.error) {
//                   return { state: 'invalid', reason: self.error };
//                }
//                if (v.state === 'validating' ||
//                   v.state === 'invalid') {
//                   return v;
//                }
//                const { validity } = self.fields[n];
//                if (validity.state === 'valid') {
//                   v.cleanValue[n] = validity.cleanValue;
//                   return v;
//                }
//                if (validity.state === 'invalid') {
//                   return { state: 'invalid', reason: `${n}: ${validity.reason}` };
//                }
//                return validity;  // validating
//             },
//             { state: 'valid', cleanValue: {} });
//       },
//    }));
