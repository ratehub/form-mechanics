import * as React from 'react';
import TextInput from './TextInput';
import { FieldProps, inputProps } from '..';

const BaseInput = TextInput.bind(null);  // lose propTypes and stuff


const NumberInput: React.StatelessComponent<FieldProps<string, number, {}>> =
({ children, inputProps: propsForInput, ...props }) => {
   const numberInputProps = {
      ...propsForInput,
      type: 'number',
   };
   return React.createElement(BaseInput, {
      inputProps: numberInputProps,
      ...props,
   } as FieldProps<string, string, {}>,
                              children);
};


export default Object.assign(NumberInput, TextInput, {
   validate: (v: string): number => {
      const n = parseFloat(v);
      if (isNaN(n)) {
          throw 'Not a valid number';
      }
      return n;
   },
   propTypes: inputProps(),
});
