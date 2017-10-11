import * as React from 'react';
import { CTX } from './constants';

interface FormProps {
   children: React.ReactNode;
   // tslint:disable-next-line:no-any
   model: any;
   // tslint:disable-next-line:no-any
   onSubmit(_: {}): Promise<any> | void;
}

export default class FormProvider extends React.Component<FormProps> {
   static childContextTypes = {
      [CTX]: () => null
   };

   handleSubmit = (e: Event) => {
      e.preventDefault();
      const { model, onSubmit } = this.props;
      if (model.validity.state === 'valid') {
         onSubmit(model.validity.cleanValue);
      } else {
         // can't submit -- the form hasn't validated
         model.touch();
      }
   }

   getChildContext() {
      const { model, onSubmit } = this.props;
      return {
         [CTX]: { model, onSubmit },
      };
   }

   componentWillUnmount() {
      const { model } = this.props;
      model.touch();
   }

   render() {
      const { children } = this.props;
      if (!children) { return null; }
      return React.createElement('form', { onSubmit: this.handleSubmit }, children);
   }
}
