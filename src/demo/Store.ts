import { createFormModel, text, email } from '../forms/mst';

export const Form = createFormModel(
   'Profile',
   text('firstName', { required: true }),
   text('lastName', { required: true }),
   email('email', { required: true }),
   // text('phone', { required: true }),
   // ProvinceAndAgent.asField({ required: false }),
);
