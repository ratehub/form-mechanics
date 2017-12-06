import * as React from 'react';
import getName from 'react-display-name';
import { CTX_KEY } from '../constants';
import { FormInfo } from '../../types';

interface InjectProps {
   // tslint:disable-next-line:no-any
   form: FormInfo<any>;
}

export default (Component: React.ComponentType<InjectProps>) => {
   const Wrapper: React.StatelessComponent<{}> = (
      { children, ...props },
      { [CTX_KEY]: { model } }
   ) =>
      React.createElement(Component, { form: model, ...props }, children);

   Wrapper.displayName = `withFormInfo(${getName(Component)}`;
   Wrapper.contextTypes = {
      [CTX_KEY]: () => null,
   };
   return Wrapper;
};
