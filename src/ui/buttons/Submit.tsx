import * as React from 'react';
import { ButtonProps } from './types';

interface Props {
   onSubmit(e: React.UIEvent<HTMLButtonElement>): void;
}

const Submit: React.StatelessComponent<ButtonProps & Props> = ({ children, disabled = false, onSubmit }) => (
   <button
      disabled={disabled}
      onSubmit={onSubmit}
      type="submit"
   >
      {children}
   </button>
);

export default Submit;
