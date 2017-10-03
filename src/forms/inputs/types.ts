
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

export type Validity<V> = Validating
                        | Valid<V>
                        | Invalid;

export interface InputProps<T, V> {
    dirty: boolean;
    disabled?: boolean;
    required?: boolean;
    validity: Validity<V>;
    value: T;
    onCommit(): void;
    onUpdate(newValue: T): void;
}

export type InputComponentType<T, V> = React.ComponentType<InputProps<T, V>> & {
    validate(v: T): Promise<V>
};
