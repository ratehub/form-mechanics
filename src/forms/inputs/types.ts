
export type tValidating = 'validating';
export const VALIDATING: tValidating = 'validating';
export interface Validating {
    state: 'validating';
}

export type tValid = 'valid';
export const VALID: tValid = 'valid';
export interface Valid<V> {
    state: tValid;
    cleanValue?: V;
}

export type tInvalid = 'invalid';
export const INVALID: tInvalid = 'invalid';
export interface Invalid {
    state: tInvalid;
    reason: string;
}

export type Validity<T> = Validating
                        | Valid<T>
                        | Invalid;

export interface InputProps<T, U, V> {
    dirty: boolean;
    disabled?: boolean;
    inputProps?: V;
    required?: boolean;
    validity: Validity<U>;
    value: T;
    onCommit(): void;
    onUpdate(newValue: T): void;
}

export type InputComponentType<T, U, V = {}> = React.ComponentType<InputProps<T, U, V>> & {
    validate(v: T): Promise<U>
};
