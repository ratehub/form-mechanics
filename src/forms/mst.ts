import { Email } from './inputs/mst';

interface Field {
   type: 'field';
   Component: React.ComponentType;
}

interface FieldGroup {
   type: 'group';
   // tslint:disable-next-line:no-any
   model: any;
}

type x = Field
       | FieldGroup;

export const compose = (...fields: x[]): FieldGroup => {
   return {
      type: 'group',
      model: null,
   };
};

interface BaseFieldOptions {
   required?: boolean;
}

export const text = (name: string, options: BaseFieldOptions): Field => {
   return {
      type: 'field',
      Component: Email,
   };
};

export const email = text;
