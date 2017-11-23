import * as React from 'react';
import { injectFieldInfo } from '..';

interface InjectedProps {
   // tslint:disable-next-line:no-any
   field: any;
}

const FieldError: React.StatelessComponent<InjectedProps> = ({ field }) =>
   React.createElement('p', {}, 'hi');

export default injectFieldInfo(FieldError);
