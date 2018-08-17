
/**
 * Type signature for a validation function.
 */
type ValidateFn = (props: {}, propName: string, componentName: string, location: string, path: string) =>
    null | Error;

/**
 * Extension of the function proptype taking additional information.
 */
export interface Validator extends ValidateFn {
    isRequired?: ValidateFn;
    typeName: string;
}

/**
 * Construct a new prop literal validation function.
 * @param value literal the prop must exactly match.
 * @param isRequired if an empty value should return as INVALID.
 */
function getLiteralChecker<T>(value: T, isRequired: boolean): Validator {

    // Construct a validation arrow function which tests if a prop is exactly equal to a value.
    const checker: ValidateFn = (props, propName, componentName, location, path) => {
        const testValue = props[propName];
        if (!isRequired && testValue == null) {
            return null;
        }
        return testValue === value
            ? null
            : new Error(`Invalid ${location} '${path}' supplied to '${componentName}'. ` +
                `The value must exactly equal '${value}' (received '${testValue}'`);
    };

    const typeName = isRequired
        ? 'requiredExactlyChecker'
        : 'requiredChecker';

    return Object.assign(checker, { typeName });
}

/**
 * Export both a required and non-required version of our literal prop checker
 * @param value the value to check for.
 */
export function literalProp<T>(value: T) {
    const checker = getLiteralChecker(value, false);
    checker.isRequired = getLiteralChecker(value, true);
    return checker;
}
