import * as React from 'react';
import PropTypes from 'prop-types';
import getName from 'react-display-name';
import { observer } from 'mobx-react';
import { CTX_KEY } from '../constants';

interface Props {
   field: string;
}

interface InjectProps {
   // tslint:disable-next-line:no-any
   field: any;
}

export default (BareComponent: React.ComponentType<InjectProps>) => {
   const Component = observer(BareComponent);
   const Wrapper: React.StatelessComponent<Props> = (
      { field: fieldId, children, ...props },
      { [CTX_KEY]: { model }
   }) => {
      const field = model.fields[fieldId];
      if (!field) {
         const available = Object.keys(model.fields).map(n => `'${n}'`).join(', ');
         throw new Error(`could not find field '${fieldId}' (available: ${available})`);
      }
      return React.createElement(Component, { field, ...props }, children);
   };
   Wrapper.displayName = `withFieldInfo(${getName(Component)})`;
   Wrapper.contextTypes = {
      [CTX_KEY]: () => null,
   };
   Wrapper.propTypes = {
      field: PropTypes.string.isRequired,
   };
   return Wrapper;
};
