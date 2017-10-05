import * as React from 'react';
import { IStateTreeNode } from 'mobx-state-tree';

interface FormProps {
   children: React.ReactNode;
   model: IStateTreeNode;
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
   render() {
      const { children } = this.props;
      if (!children) { return null; }
      return React.Children.only(children);
   }
}
