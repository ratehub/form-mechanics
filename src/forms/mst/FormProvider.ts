import * as React from 'react';
// import { IModelType } from 'mobx-state-tree';

interface FormProps {
   children: React.ReactNode;
   // tslint:disable-next-line:no-any
   model: any;
   onSubmit(_: {}): void;
}

export default class FormProvider extends React.Component<FormProps> {
   static childContextTypes = {
      __form_fields: () => null
   };

   getChildContext() {
      const { model } = this.props;
      return {
         __form_fields: model,
      };
   }

   componentWillUnmount() {
      const { model } = this.props;
      model.touch();
   }

   render() {
      const { children } = this.props;
      if (!children) { return null; }
      return React.Children.only(children);
   }
}
