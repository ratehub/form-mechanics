import * as React from 'react';
import { observer } from 'mobx-react';
import { CTX_KEY } from '../constants';

interface Props<TInputProps extends {}> {
    disabled?: boolean;
    field: any;
    inputProps?: TInputProps;
}

// tslint:disable-next-line:no-any
const Input: React.StatelessComponent<Props<any>> = (
   { field, disabled, inputProps },
   { [CTX_KEY]: {},
}) => {
   return React.createElement(field.Component, {
       id: field.htmlId,
       committed: field.committed,
       dirty: field.dirty,
       disabled: disabled || field.disabled,
       inputProps,
       name: field.name,
       onCommit: field.handleCommit,
       onUpdate: field.handleUpdate,
       raw: field.raw,
       required: field.required,
       validity: field.validity,
   });
};

Input.contextTypes = {
   [CTX_KEY]: () => null,
};

export default observer(Input);
