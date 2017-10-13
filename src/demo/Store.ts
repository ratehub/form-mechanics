import { formModel } from '../mst';
import { Text, Email } from '../ui/widgets';

export const Form = formModel('Profile', {
   firstName: {
      widget: Text,
      required: true,
   },
   lastName: {
      widget: Text,
      required: true,
   },
   email: {
      widget: Email,
      required: true,
   },
});
