import { types, IType } from 'mobx-state-tree';

import { Validity, VALID, INVALID } from '../types';
import { MSTComponentType } from '.';
import fieldModel from './fieldModel';


interface FieldConfig<TRaw, TClean> {
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly valueType?: IType<any, any>;    // tslint:disable-line:no-any
    readonly inputComponent: MSTComponentType<TRaw, TClean>;
}

const getInstanceId = (() => {
    let currentId = 0;
    return () => currentId++;
})();

type TFields<TClean> = {
    readonly [ID: string]: FieldConfig<string, TClean>;
};

// tslint:disable-next-line:no-any
const formModel = (id: string, fields: TFields<any>) => (
    types.model(id, {
        instance: types.optional(types.string, `${id}-${getInstanceId()}`),
        touched: types.optional(types.boolean, false),
        error: types.maybe(types.string),
        fields: types.optional(
            types.model(`${id}Fields`, Object.keys(fields).reduce(
                (props, fieldId: string) => ({
                    ...props,
                    [fieldId]: types.optional(fieldModel(`${id}${fieldId}${getInstanceId()}`, fields[fieldId]), {}),
                }),
                {} as { notUndefined: true })),
            {}),
    }))
    .views(self => ({
        get dirty(): boolean {
            return self.touched || Object.keys(self.fields).some(f => self.fields[f].dirty);
        },
        // tslint:disable-next-line:no-any
        get raw(): any {
            return Object.keys(self.fields).reduce(
                (r, f) => {
                    r[f] = self.fields[f].raw;
                    return r;
                },
                {});
        },
        // tslint:disable-next-line:no-any
        get validity(): Validity<any, any> {
            return Object.keys(self.fields).reduce(
                // tslint:disable-next-line:no-any
                (v: Validity<any, any>, name: string) => {
                    const field = self.fields[name];
                    if (v.state === INVALID) {
                        if (field.validity.state === INVALID) {
                            v.reason[name] = field.validity.reason;
                        }
                        return v;
                    } else if (field.validity.state === INVALID) {
                        return {
                            state: INVALID,
                            reason: { [name]: field.validity.reason },
                        };
                    } else {
                        v.cleanValue[name] = field.validity.cleanValue;
                        return v;
                    }
                },
                {
                    state: VALID,
                    cleanValue: {},
                });
        }
    }))
    .actions(self => ({
        afterCreate() {
            Object.keys(self.fields).forEach((key) => {
                self.fields[key].instance = `${self.instance}-${key}`;
            });
        },
        touch() {
            self.touched = true;
        },
        reset() {
            // Potentially add support for default values
            // and reset to those values.
        }
    }));


export default formModel;
