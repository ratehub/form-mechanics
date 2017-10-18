import { types, IType } from 'mobx-state-tree';
import { VALIDATING, VALID, INVALID } from '../types';

// tslint:disable-next-line:no-any
const validityModel = (valueType: IType<any, any>) =>
   types.union(
      types.model('Validating', {
         state: types.literal(VALIDATING),
      }),
      types.model('Valid', {
         state: types.literal(VALID),
         cleanValue: valueType,
      }),
      types.model('Invalid', {
         state: types.literal(INVALID),
         reason: types.string,
      }),
   );

export default validityModel;
