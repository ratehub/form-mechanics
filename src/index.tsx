import * as ui from './ui';
import * as mst from './mst';
import * as theme from './theme';
import * as types from './types';
export { types, ui, mst, theme };

if (process.env.NODE_ENV !== 'production') {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const { default: App } = require('./demo/App');
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
}
