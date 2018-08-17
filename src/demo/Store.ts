import { formModel } from '../mst';
import { types } from 'mobx-state-tree';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import NumberInput from './NumberInput';

export const Form = formModel('Profile', {
   firstName: {
      inputComponent: TextInput,
      required: true,
   },
   lastName: {
      inputComponent: TextInput,
      required: true,
   },
   email: {
      inputComponent: EmailInput,
      required: true,
   },
   age: {
      inputComponent: NumberInput,
      // required: true,
      valueType: types.number,
   }
});
