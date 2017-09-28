import * as React from 'react';
import RawEmail from './Email';
import { InputProps } from './types';

interface Props<T> {
    initialValue?: T;
}

interface State<T> {
    value: T;
}

const stateWrap = <T>(Component: React.ComponentType<InputProps<T>>, defaultInitialValue: T) =>
    class extends React.Component<Props<T>, State<T>> {
        public static displayName = 'stateWrap';

        public static defaultProps: Partial<Props<T>> = {
            initialValue: defaultInitialValue,
        };

        constructor(props: Props<T>) {
            super(props);
            const { initialValue } = this.props;
            this.state = {
                value: initialValue as T,
            };
        }

        handleUpdate = (value: T) => {
            this.setState({ value });
        }

        render(): React.ReactElement<InputProps<T>> {
            const { value } = this.state;
            return React.createElement(Component, {
                dirty: false,
                onUpdate: this.handleUpdate,
                valid: 'yes',
                value,
            });
        }
    };

export const Email = stateWrap<string>(RawEmail, '');
