import { ComponentType } from 'react';
import { Validity } from '.';

export interface FieldConfig {
   readonly id: string;
   readonly disabled: boolean;
   readonly required: boolean;
}

export interface FieldInfo<TClean> extends FieldConfig {
   readonly dirty: boolean;
   readonly validity: Validity<TClean>;
}

export interface FieldProps<TRaw, TClean, TInputProps> extends FieldInfo<TClean> {
   readonly inputProps: TInputProps;
   readonly onCommit: () => void;
   readonly onUpdate: (value: TRaw) => void;
   readonly raw: TRaw;
}

export type FieldComponentType<TRaw, TClean, TInputProps = {}> =
   ComponentType<FieldProps<TRaw, TClean, TInputProps>> & {
      readonly isEmpty: (value: TRaw) => boolean;
      readonly validate: (value: TRaw) => Promise<TClean>;
   };
