import { types } from 'mobx-state-tree';
import { VALIDATING, VALID, INVALID } from '../types';

// tslint:disable-next-line:no-any
const validityModel = (valueType: any) =>
   types.union(
      types.model('Validating', { state: VALIDATING }),
      types.model('Valid', { state: types.literal(VALID), cleanValue: types.maybe(valueType) }),
      types.model('Invalid', { state: types.literal(INVALID), reason: types.string }),
   );

export default validityModel;
