import * as PropTypes from 'prop-types';
import { Validator, literalProp } from '.';

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

/**
 * Typescript type for our validity object.
 */
export type Validity<T, E = string> = Valid<T> | Invalid<E>;

/**
 * Function to produce a React PropType for our validity object.
 * @param cleanValueType function to convert from input to output type
 * @param required 
 * @param errReasonType 
 */
export const validityPropType = (cleanValueType: Validator,
                                 required: boolean,
                                 errReasonType: Validator = PropTypes.string) => PropTypes.oneOfType([
   PropTypes.shape({
      state: literalProp('valid').isRequired,
      cleanValue: required
         ? cleanValueType
         : PropTypes.oneOf([literalProp(undefined), literalProp(null), cleanValueType]),
   }),
   PropTypes.shape({
      state: literalProp('invalid').isRequired,
      reason: errReasonType.isRequired,
   })
]);
