import { ComponentType } from 'react';
import { Validity } from '.';

export interface FormInfo<FieldTypes> {
   readonly id: string;
   readonly dirty: boolean;
   readonly disabled: boolean;
   readonly validity: {
      readonly [ID in keyof FieldTypes]: Validity<FieldTypes[ID]>;
   };
}

interface Props {
   onPartialSubmit?: () => void;
   onSubmit: () => void;
}

export interface FormProps<F, P extends Props> extends FormInfo<F> {
   readonly formProps: P;
   readonly onReset: () => void;
   readonly onTouch: () => void;
}

export type FormComponentType<F, P extends Props = Props> =
   ComponentType<FormProps<F, P>>;
