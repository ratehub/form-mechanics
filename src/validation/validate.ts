import { Validity, VALID, INVALID } from '../types';


/**
 * A function to determine if an input value can be translated into an output value
 * and satisfy the input requirements.
 * @param value input value
 * @param required if a non-empty value must be supplied
 * @param isEmpty function to test whether the input is empty
 * @param typeValidator function to convert from input type to output type
 * @param extraValidator function to determine if a converted output type is within acceptable range
 * @returns validation result of the input.
 */
export default function validate<T, U>(
                    value: T,
                    required: boolean,
                    isEmpty: (v: T) => boolean,
                    typeValidator: (v: T) => U,
                    extraValidator: (v: U) => U):
    Validity<U> {
    
    if (isEmpty(value) && required) {
        return { 
            state: INVALID, 
            reason: "A value is required"
        };
    }

    try {
        let result = typeValidator(value);
        
        if (extraValidator) {
            result = extraValidator(result);
        }
        
        return { 
            state: VALID, 
            cleanValue: result 
        };
    }
    catch(err) {
        return { 
            state: INVALID,
            reason: (err && `${err}`) || "Input is not valid"
        }
    }
};
