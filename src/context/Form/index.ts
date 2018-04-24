import * as React from 'react';
import { isAlive } from 'mobx-state-tree';
import { CTX_KEY } from '../constants';

interface FormProps {
   // tslint:disable-next-line:no-any
   model: any;
   // tslint:disable-next-line:no-any
   onSubmit(event: any): Promise<any> | void;
}

export default class FormProvider extends React.Component<FormProps> {
   static childContextTypes = {
      [CTX_KEY]: () => null,
   };
   
   handleSubmit = () => {
      const { model, onSubmit } = this.props;
      model.touch();
      if (model.validity.state === 'valid') {
         onSubmit(model.validity.cleanValue);
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
      if(isAlive(model))
         model.touch();
   }

   handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return this.handleSubmit();
   }

   handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return this.handleReset();
   }

   render() {
      const { children } = this.props;
      if (!children) { return null; }
      return React.createElement('form', { onSubmit: this.handleFormSubmit, onReset: this.handleFormReset }, children);
   }
}
