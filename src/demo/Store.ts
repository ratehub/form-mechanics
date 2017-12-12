import { formModel } from '../mst';
import { types } from 'mobx-state-tree';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import NumberInput from './NumberInput';

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
   age: {
      widget: NumberInput,
      // required: true,
      valueType: types.number,
   }
});
