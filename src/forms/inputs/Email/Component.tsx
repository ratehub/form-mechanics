import * as React from 'react';
import { InputProps } from '../types';

type Props = InputProps<string>;

const Email: React.SFC<Props> = ({ disabled, onUpdate, value }: Props) => (
    <input
        disabled={disabled}
        type="email"
        onChange={(e: {target: {value: string}}) => onUpdate(e.target.value)}
        value={value}
    />
);

export default Email;
