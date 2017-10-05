
export const VALIDATING: 'validating' = 'validating';
export interface Validating {
    state: typeof VALIDATING;
}

export const VALID: 'valid' = 'valid';
export interface Valid<V> {
    state: typeof VALID;
    cleanValue?: V;
}

export const INVALID: 'invalid' = 'invalid';
export interface Invalid {
    state: typeof INVALID;
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

export type ChangeHandler<T> = (v: Validity<T>) => void;
