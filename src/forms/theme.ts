import * as React from 'react';
import getName from 'react-display-name';

type themeType = { [k: string]: string | number };

type Context = { __forms_theme: themeType };

// tslint:disable-next-line:no-any
export const makeStyles = <P>(make: (theme: themeType, props: P) => any) => {
    // tslint:disable-next-line:no-any
    type InjectedProps = P & { styles: any };
    return (Component: React.ComponentType<InjectedProps>): React.ComponentType<P> => {
        // tslint:disable-next-line:no-any
        const Wrapped: React.SFC = (props: P, { __forms_theme }: Context) =>
            React.createElement(Component,
                                Object.assign({ styles: make(__forms_theme, props) }, props));

        return Object.assign(Wrapped, {
            displayName: `styled(${getName(Component)})`,
            contextTypes: {
                __forms_theme: () => null,
            },
        });
    };
};

import * as defaults from './defaults';

type themeType2 = { [k in keyof typeof defaults]?: string };

interface Props {
    children: React.ReactNode;
    theme?: themeType2;
}

export class ThemeProvider extends React.Component<Props, {}> {
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
