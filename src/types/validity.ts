
export const VALIDATING: 'validating' = 'validating';
export interface Validating {
   readonly state: typeof VALIDATING;
}

export const VALID: 'valid' = 'valid';
export interface Valid<V> {
   readonly state: typeof VALID;
   readonly cleanValue?: V;
}

export const INVALID: 'invalid' = 'invalid';
export interface Invalid<E> {
   readonly state: typeof INVALID;
   readonly reason: E;
}

export type Validity<T, E = string> = Validating
                                    | Valid<T>
                                    | Invalid<E>;