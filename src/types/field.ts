import { ComponentType } from 'react';
import PropTypes from 'prop-types';
import { Validity, Validator, validityPropType } from '.';

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

export const fieldPropTypes = (rawPropType: Validator, cleanPropType: Validator, inputPropsType: Validator) => ({
   id: PropTypes.string.isRequired,
   disabled: PropTypes.boolean.isRequired,
   required: PropTypes.boolean.isRequired,
   dirty: PropTypes.boolean.isRequired,
   validity: validityPropType(cleanPropType).isRequired,
   inputProps: inputPropsType.isRequired,
   onCommit: PropTypes.func.isRequired
});

export type FieldComponentType<TRaw, TClean, TInputProps = {}> =
   ComponentType<FieldProps<TRaw, TClean, TInputProps>> & {
      readonly isEmpty: (value: TRaw) => boolean;
      readonly validate: (value: TRaw) => Promise<TClean>;
   };
