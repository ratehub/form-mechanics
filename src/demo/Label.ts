import * as React from 'react';
import { observer } from 'mobx-react';
import { injectFieldInfo } from '..';

interface InjectedProps {
   // tslint:disable-next-line:no-any
   field: any;
   fieldId: string;
}

const Label: React.StatelessComponent<InjectedProps> = ({ field, fieldId }) =>
   React.createElement('label', { htmlFor: field.htmlId }, fieldId);

export default injectFieldInfo(observer(Label));
