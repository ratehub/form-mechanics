import * as React from 'react';
import { observer } from 'mobx-react';
import { CTX_KEY } from '../constants';

interface Props<TInputProps extends {}> {
   disabled?: boolean;
   field: string;
   inputProps?: TInputProps;
}

// tslint:disable-next-line:no-any
const Input: React.StatelessComponent<Props<any>> = (
   { field: fieldId, disabled, inputProps },
   { [CTX_KEY]: { model },
}) => {
   const field = model.fields[fieldId];
   if (!field) {
      const available = Object.keys(model.fields).map(n => `'${n}'`).join(', ');
      throw new Error(`could not find field '${fieldId}' (available: ${available})`);
   }
   return React.createElement(field.Component, {
      id: fieldId,
      dirty: field.dirty,
      disabled: disabled || field.disabled,
      inputProps,
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
