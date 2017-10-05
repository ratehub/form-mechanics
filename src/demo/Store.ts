import { createFormModel, text, email } from '../forms/mst';

export const Form = createFormModel(
   'Profile',
   text('firstName', { required: true }),
   text('lastName', { required: true }),
   email('email', { required: true }),
   // text('phone', { required: true }),
   // ProvinceAndAgent.asField({ required: false }),
);

// tslint:disable-next-line:no-any
// export const Form = x((form: any) => ({
//    firstName: Text({
//       required: true,
//    }),
//    lastName: Text({
//       required: true,
//       type: 'string',
//    }),
//    email: {
//       required: true,
//       type: 'email',
//    },
//    phone: {
//       required: true,
//       type: 'phone',
//    },
//    province: {
//    },
//    agent: {
//       disabled: form.province !== undefined,
//    },
// }));


// export const Form = types.model('Form', {
//    dirty: types.optional(types.boolean, false),
//    firstName: types.model(x.textField({ required: true })),
//    lastName: types.model(x.textField({ required: true })),
//    email: types.model(x.emailField({  }))
// });

// export const AppStore = types.model('AppStore', {
//    form: 
// });
