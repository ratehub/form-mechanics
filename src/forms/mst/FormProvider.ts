import * as React from 'react';
import { CTX_KEY } from './constants';

interface FormProps {
   children: React.ReactNode;
   // tslint:disable-next-line:no-any
   model: any;
   // tslint:disable-next-line:no-any
   onSubmit(_: {}): Promise<any> | void;
}

export default class FormProvider extends React.Component<FormProps> {
   static childContextTypes = {
      [CTX_KEY]: () => null
   };

   handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { model, onSubmit } = this.props;
      if (model.validity.state === 'valid') {
         onSubmit(model.validity.cleanValue);
      } else {
         // can't submit -- the form hasn't validated
         model.touch();
      }
   }

   handleReset = () => {
      const { model } = this.props;
      model.reset();
   }

   getChildContext() {
      const { model } = this.props;
      return {
         [CTX_KEY]: {
            model,
            onSubmit: this.handleSubmit,
            onReset: this.handleReset,
         },
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
