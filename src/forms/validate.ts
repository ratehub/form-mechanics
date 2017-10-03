import { Validity, VALID, INVALID } from './inputs/types';

// tslint:disable-next-line:no-any
const niceError = (err: any) => {
    let reason;
    try {
        reason = `${err}`;
    } catch (err) {
        reason = 'Unknown error while validating';
    }
    return Promise.resolve({ state: INVALID, reason });
};

// tslint:disable-next-line:no-any
const id = <T>(x: T) =>
    Promise.resolve(x);

export default <T, U>(value: T,
                      required: boolean,
                      isEmpty: (v: T) => boolean,
                      typeValidator: (v: T) => Promise<U>,
                      extraValidator: (v: U) => Promise<U> = id):
    Promise<Validity<U>> => {
    if (isEmpty(value)) {
        return required
            ? Promise.resolve({ state: INVALID, reason: 'A value is required' })
            : Promise.resolve({ state: VALID });
    }
    return typeValidator(value)
        .then(extraValidator)
        .then(cleanValue => ({ state: VALID, cleanValue }))
        .catch(niceError);
};
