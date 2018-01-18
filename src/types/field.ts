import { ComponentType } from 'react';
import * as PropTypes from 'prop-types';
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
   readonly name: string;
   readonly onCommit: () => void;
   readonly onUpdate: (value: TRaw) => void;
   readonly raw: TRaw;
}

export const inputProps = () => ({
   dirty: PropTypes.bool.isRequired,
   disabled: PropTypes.bool.isRequired,
   id: PropTypes.string.isRequired,
   inputProps: PropTypes.object,
   onCommit: PropTypes.func.isRequired,
   onUpdate: PropTypes.func.isRequired,
   raw: PropTypes.any.isRequired,
   required: PropTypes.bool.isRequired,
   validity: PropTypes.object.isRequired,
});

export type FieldComponentType<TRaw, TClean, TInputProps = {}> =
   ComponentType<FieldProps<TRaw, TClean, TInputProps>> & {
      readonly isEmpty: (value: TRaw) => boolean;
      readonly validate: (value: TRaw) => Promise<TClean>;
   };
