import * as React from 'react';
import getName from 'react-display-name';
import RawEmail from './Email';
import validate from '../validate';
import { InputProps, Validity, VALIDATING, InputComponentType } from './types';

interface Props<T, U> {
    initialValue?: T;
    required?: boolean;
    validate?(v: U): Promise<U>;
}

interface State<T, U> {
    dirty: boolean;
    validity: Validity<U>;
    value: T;
}

const stateWrap = <T, U>(Component: InputComponentType<T, U>,
                         emptyValue: T,
                         isEmpty: (v: T) => boolean) =>
    class extends React.Component<Props<T, U>, State<T, U>> {
        public static displayName = `stateWrap(${getName(Component)})`;

        public static defaultProps: Partial<Props<T, U>> = {
            initialValue: emptyValue,
            required: false,
        };

        alive = true;

        constructor(props: Props<T, U>) {
            super(props);
            const { initialValue } = this.props;
            this.state = {
                dirty: false,
                value: initialValue as T,  // safe because defaultProps
                validity: { state: VALIDATING },
            };
            this.validate();
        }

        validate = () => {
            const { required, validate: extraValidate } = this.props;
            const { value } = this.state;
            validate<T, U>(value, required as boolean, isEmpty, Component.validate, extraValidate)
                .then((validity: Validity<U>) => {
                    // TODO: cancel validation in cWU instead of guarding here
                    if (this.alive) {
                        this.setState({ validity });
                    }
                });
        }

        handleUpdate = (value: T) => {
            this.setState({ value }, () => {
                if (this.state.dirty) {
                    this.validate();
                }
            });
        }

        handleCommit = () => {
            this.setState({ dirty: true });
            this.validate();
        }

        componentWillUnmount() {
            this.alive = false;
        }

        render(): React.ReactElement<InputProps<T, U>> {
            const { dirty, validity, value } = this.state;
            return React.createElement(Component, {
                dirty,
                onCommit: this.handleCommit,
                onUpdate: this.handleUpdate,
                validity,
                value,
            });
        }
    };

const stringWrap = (Component: InputComponentType<string, string>) =>
    stateWrap<string, string>(Component, '', v => v === '');

export const Email = stringWrap(RawEmail);
