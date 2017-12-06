import * as React from 'react';
import { observer } from 'mobx-react';
import { INVALID, injectFormInfo } from '..';

interface InjectedProps {
   // tslint:disable-next-line:no-any
   form: any;
}

const FormErrors: React.StatelessComponent<InjectedProps> = ({ form }) =>
   form.touched && form.validity.state === INVALID
      ? React.createElement('div', { className: 'invalid-form' },
                            React.createElement('p', {},
                                                'The following problems prevented us from saving your form:'),
                            React.createElement('ul', {}, ...Object.keys(form.validity.reason).map(k =>
                                                React.createElement('li', {}, `${k}: ${form.validity.reason[k]}`))))
      : null;

export default injectFormInfo(observer(FormErrors));
