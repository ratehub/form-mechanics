type ValidateFn = (props: {}, propName: string, componentName: string, location: string, path: string) =>
   null | Error;

export interface Validator extends ValidateFn {
   isRequired?: ValidateFn;
   typeName: string;
}

function getLiteralChecker<T>(value: T, isRequired: boolean): Validator {
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

export function literalProp<T>(value: T) {
   const checker = getLiteralChecker(value, false);
   checker.isRequired = getLiteralChecker(value, true);
   return checker;
}
