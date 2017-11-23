export {
  FieldComponentType,
  FieldProps,
  INVALID,
  VALID,
  VALIDATING,
  Validity,
  inputProps,
} from './types';

export {
  Form,
  Input,
  injectFieldInfo,
} from './context';


if (process.env.REACT_APP_DEMO) {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const { default: App } = require('./demo/App');
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
}
