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

const Input: React.StatelessComponent<InputProps> =
({ children, field }: InputProps, { __form_fields }: InputContext) =>
   React.createElement(__form_fields.fields[field].Component, {});

Input.contextTypes = {
   __form_fields: () => null,
};

export default Input;
