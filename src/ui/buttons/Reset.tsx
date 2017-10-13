import * as React from 'react';
import { ButtonProps } from './types';

interface Props {
   onReset(): void;
}

const Reset: React.StatelessComponent<ButtonProps & Props> = ({ children, disabled = false, onReset }) => (
   <button
      disabled={disabled}
      onClick={onReset}
      type="reset"
   >
      {children}
   </button>
);


export default Reset;
