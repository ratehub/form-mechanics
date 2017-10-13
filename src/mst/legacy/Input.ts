// import * as React from 'react';
// import { CTX_KEY } from './constants';

// interface InputProps {
//    children?: React.ReactNode;
//    field: string;
// }

// const Input: React.StatelessComponent<InputProps> = (
//    { children, field: fieldName }: InputProps,
//    { [CTX_KEY]: { model } }
// ) => {
//    const field = model.fields[fieldName];
//    if (!field) {
//       const available = Object.keys(model.fields).map(n => `'${n}'`).join(', ');
//       throw new Error(`could not find field '${fieldName}' (available: ${available})`);
//    }
//    return React.createElement(field.Component, { field });
// };

// Input.contextTypes = {
//    [CTX_KEY]: () => null,
// };

// export default Input;
