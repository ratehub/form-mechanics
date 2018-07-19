import { ComponentType } from 'react';
import * as PropTypes from 'prop-types';

import { Validity } from '.';


/**
 * Configuration object for a view-model field.
 */
export interface FieldConfig {
    readonly id: string;
    readonly disabled: boolean;
    readonly required: boolean;
}

/**
 * Backing state of a view-model field.
 */
export interface FieldInfo<TClean> extends FieldConfig {
    readonly committed: boolean;
    readonly dirty: boolean;
    readonly validity: Validity<TClean>;
}

/**
 * React input props for a view-model field.
 */
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
 * React PropTypes definition for a React component bound to our view-model field.
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
 * Typescript type definition for the React component we bind our view-model field to.
 */
export type FieldComponentType<TRaw, TClean, TInputProps = {}> =
    ComponentType<FieldProps<TRaw, TClean, TInputProps>> & {
        readonly isEmpty: (value: TRaw) => boolean;
        readonly validate: (value: TRaw) => TClean;
    };
