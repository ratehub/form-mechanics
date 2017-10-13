import { StatelessComponent } from 'react';
import { Validity } from '.';

export interface FieldConfig {
   readonly id: string;
   readonly disabled: boolean;
   readonly required: boolean;
}

export interface FieldInfo<Clean> extends FieldConfig {
   readonly dirty: boolean;
   readonly validity: Validity<Clean>;
}

export interface FieldProps<Raw, Clean, InputProps> extends FieldInfo<Clean> {
   readonly inputProps: InputProps;
   readonly onCommit: () => void;
   readonly onUpdate: (value: Raw) => void;
   readonly raw: Raw;
}

export interface FieldComponentType<R, C, I = {}> extends StatelessComponent<FieldProps<R, C, I>> {
   readonly isEmpty: (value: R) => boolean;
   readonly validate: (value: R) => Promise<C>;
}
