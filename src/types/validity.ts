import PropTypes from 'prop-types';
import { Validator, literalProp } from '.';

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


export const validityPropType = (cleanValueType: Validator,
                                 errReasonType: Validator = PropTypes.string) => PropTypes.oneOfType([
   PropTypes.shape({
      state: literalProp('validating').isRequired,
   }),
   PropTypes.shape({
      state: literalProp('valid').isRequired,
      cleanValue: cleanValueType,
   }),
   PropTypes.shape({
      state: literalProp('invalid').isRequired,
      reason: errReasonType.isRequired,
   })
]);
