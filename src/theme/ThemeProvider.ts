import * as React from 'react';
import * as defaults from './defaults';
import { theme } from './types';

interface Props {
    children: React.ReactNode;
    theme?: theme;
}

export default class ThemeProvider extends React.Component<Props, {}> {
    static defaultProps = {
       theme: {},
    };
    static childContextTypes = {
       __forms_theme: () => null,
    };
    static contextTypes = {
       __forms_theme: () => null,
    };
    getChildContext() {
       const fromContext = this.context.__forms_theme || {};
       return {
          __forms_theme: {
             ...defaults,
             ...fromContext,
             ...this.props.theme,
          }
       };
    }
    render() {
       return React.Children.only(this.props.children);
    }
}
