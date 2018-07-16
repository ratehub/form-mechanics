import { types, IType } from 'mobx-state-tree';
import { VALID, INVALID } from '../types';

// tslint:disable-next-line:no-any
const validityModel = (valueType: IType<any, any>) =>
   types.union(
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
