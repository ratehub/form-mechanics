// import { IType } from 'mobx-state-tree';
import { FieldComponentType } from '../types';

// interface FieldSnap<TRaw, TClean> {
//    dirty?: boolean;
//    validity?: Validity<TClean>;
//    raw?: TRaw;
// }

export type MSTComponentType<TRaw, TClean, TInputProps = {}> =
   FieldComponentType<TRaw, TClean, TInputProps> & {
      // readonly raw: IType<FieldSnap<TRaw, TClean>, TRaw>;
      // readonly clean: TClean;
   };
