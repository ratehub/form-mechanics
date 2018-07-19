export {
  FieldComponentType,
  FieldProps,
  INVALID,
  VALID,
  Validity,
  inputProps,
} from './types';

export {
  Form,
  Input,
  injectFieldInfo,
  injectFormInfo,
} from './context';

export {
  validate,
} from './validation';

export {
  fieldModel,
  formModel
} from './mst';


if (process.env.REACT_APP_DEMO) {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const { default: App } = require('./demo/App');
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
}
