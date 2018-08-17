import { types, IType } from 'mobx-state-tree';

import { VALID, INVALID } from '../types';

/**
 * Produce an MST type definition for a Validity object.
 */
// tslint:disable-next-line:no-any
function createValidType<TOutput>(valueType: IType<any, TOutput>){
    return types.model('Valid', {
        state: types.literal(VALID),
        cleanValue: valueType,
    });
}

function createInvalidType<TOutput>(valueType: IType<any, TOutput>){
    return types.model('Invalid', {
        state: types.literal(INVALID),
        reason: types.string,
    });
}

export {
    createValidType,
    createInvalidType
};
