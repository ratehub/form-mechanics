import * as React from 'react';
import { formModel } from '../mst';
import { Text, Email } from '../mst/widgets';


const T: React.ComponentType = Text;
export { T };

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
