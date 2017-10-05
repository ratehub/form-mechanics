import * as React from 'react';
// import { IStateTreeNode } from 'mobx-state-tree';

interface InputProps {
   children?: React.ReactNode;
   field: string;
}
interface InputContext {
   // tslint:disable-next-line:no-any
   __form_fields: any;
}

const Input: React.StatelessComponent<InputProps> = (
   { children, field: fieldName }: InputProps,
   { __form_fields }: InputContext
) => {
   const field = __form_fields.fields[fieldName];
   if (!field) {
      const available = Object.keys(__form_fields.fields).map(n => `'${n}'`).join(', ');
      throw new Error(`could not find field '${fieldName}' (available: ${available})`);
   }
   return React.createElement(field.Component, { field });
};

Input.contextTypes = {
   __form_fields: () => null,
};

export default Input;
