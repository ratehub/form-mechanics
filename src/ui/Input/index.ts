import * as React from 'react';

interface P {
   field: string;
}

const Input: React.StatelessComponent<P> = ({ field }) =>
   React.createElement('div', {}, field);

export default Input;
