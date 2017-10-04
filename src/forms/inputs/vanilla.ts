import * as React from 'react';
import getName from 'react-display-name';
import RawEmail, { P as EmailP } from './Email';
import RawText, { P as TextP } from './Text';
import validate from '../validate';
import { ChangeHandler, InputProps, Validity, VALIDATING, InputComponentType } from '../types';

interface Props<T, U, V> {
    disabled?: boolean;
    initialValue?: T;
    inputProps?: V;
    onChange?: ChangeHandler<U>;
    required?: boolean;
    validate?(v: U): Promise<U>;
}

interface State<T, U> {
    dirty: boolean;
    validity: Validity<U>;
    value: T;
}

const stateWrap = <T, U, V = {}>(Component: InputComponentType<T, U, V>,
                                 emptyValue: T,
                                 isEmpty: (v: T) => boolean) =>
    class extends React.Component<Props<T, U, V>, State<T, U>> {
        public static displayName = `stateWrap(${getName(Component)})`;

        public static defaultProps: Partial<Props<T, U, V>> = {
            disabled: false,
            initialValue: emptyValue,
            onChange: (_) => null,
            required: false,
        };

        alive = true;

        constructor(props: Props<T, U, V>) {
            super(props);
            const { initialValue } = this.props;
            this.state = {
                dirty: false,
                value: initialValue!,  // defaulted
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
                    if (this.alive && !this.props.disabled) {
                        this.setState({ validity });
                        this.props.onChange!(validity);  // defaulted
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

        render(): React.ReactElement<InputProps<T, U, V>> {
            const { disabled, inputProps } = this.props;
            const { dirty, validity, value } = this.state;
            return React.createElement(Component, {
                disabled,
                dirty,
                inputProps,
                onCommit: this.handleCommit,
                onUpdate: this.handleUpdate,
                validity,
                value,
            });
        }
    };

const stringWrap = <T = {}>(Component: InputComponentType<string, string, T>) =>
    stateWrap<string, string, T>(Component, '', v => v === '');

export const Email = stringWrap<EmailP>(RawEmail);
export const Text = stringWrap<TextP>(RawText);
