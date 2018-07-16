import { ComponentType } from 'react';
import * as PropTypes from 'prop-types';
import { Validity } from '.';



export interface FieldConfig {
    readonly id: string;
    readonly disabled: boolean;
    readonly required: boolean;
}

export interface FieldInfo<TClean> extends FieldConfig {
    readonly committed: boolean;
    readonly dirty: boolean;
    readonly validity: Validity<TClean>;
}

export interface FieldProps<TRaw, TClean, TInputProps> extends FieldInfo<TClean> {
    readonly inputProps: TInputProps;
    readonly name: string;
    readonly onCommit: () => void;
    readonly onUpdate: (value: TRaw) => void;
    readonly onSelect: (value: Boolean) => void;
    readonly raw: TRaw;
    readonly checked: Boolean;
}

/**
 * Shape of the React props for our field model.
 */
export const inputProps = () => ({
    committed: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    inputProps: PropTypes.object,
    onCommit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    raw: PropTypes.any.isRequired,
    checked: PropTypes.bool,
    required: PropTypes.bool.isRequired,
    validity: PropTypes.object.isRequired,
});

/**
 * 
 */
export type FieldComponentType<TRaw, TClean, TInputProps = {}> =
    ComponentType<FieldProps<TRaw, TClean, TInputProps>> & {
        readonly isEmpty: (value: TRaw) => boolean;
        readonly validate: (value: TRaw) => TClean;
    };
