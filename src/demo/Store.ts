import { formModel } from '../mst';
import TextInput from './TextInput';
import EmailInput from './EmailInput';

export const Form = formModel('Profile', {
   firstName: {
      widget: TextInput,
      required: true,
   },
   lastName: {
      widget: TextInput,
      required: true,
   },
   email: {
      widget: EmailInput,
      required: true,
   },
});
