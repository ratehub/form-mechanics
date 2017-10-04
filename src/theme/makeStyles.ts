import * as React from 'react';
import getName from 'react-display-name';
import { theme as themeType } from './types';

type Context = { __forms_theme: themeType };

export default <P>(make: (theme: themeType, props: P) => themeType) => {
    type InjectedProps = P & { styles: themeType };
    return (Component: React.ComponentType<InjectedProps>): React.ComponentType<P> => {
        const Wrapped: React.StatelessComponent = (props: P, { __forms_theme }: Context) =>
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
