import * as React from 'react';
import { observer } from 'mobx-react';
import { injectFieldInfo } from '..';
import { INVALID } from '../types';

interface InjectedProps {
   // tslint:disable-next-line:no-any
   field: any;
   fieldId: string;
}

const FieldError: React.StatelessComponent<InjectedProps> = ({ field, fieldId }) =>
   field.dirty && field.validity.state === INVALID
      ? React.createElement('p', { className: 'invalid-field' }, field.validity.reason)
      : null;

export default injectFieldInfo(observer(FieldError));
