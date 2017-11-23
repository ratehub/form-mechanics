import * as React from 'react';
import { CTX_KEY } from '../constants';

interface Props {
   field: string;
}

export default (Component: React.ComponentType) => {
   const Wrapper: React.StatelessComponent<Props> = (
      { field: fieldId, children, ...props },
      { [CTX_KEY]: { model } }
   ) => {
      const field = model.fields[fieldId];
      if (!field) {
         const available = Object.keys(model.fields).map(n => `'${n}'`).join(', ');
         throw new Error(`could not find field '${fieldId}' (available: ${available})`);
      }
      return React.createElement(Component, props, children);
   };
   Wrapper.contextTypes = {
      [CTX_KEY]: () => null,
   };
   return Wrapper;
};
