import { flow, types, IType } from 'mobx-state-tree';
import { validate } from '../validation';
import validityModel from './validityModel';
import { VALID, INVALID } from '../types';
import { MSTComponentType } from '.';


/**
 * TRaw :  Input value prior to validation
 * TClean: Output value after validation.
 */
interface FieldConfig<TRaw, TClean> {
    readonly disabled?: boolean;
    readonly required?: boolean;
    // tslint:disable-next-line:no-any
    readonly valueType?: IType<any, any>;
    readonly inputComponent: MSTComponentType<TRaw, TClean>;
}

const fieldModel = <TClean>(id: string, {
    inputComponent,
    valueType = types.string,
    required = false,
    disabled = false,
    // tslint:disable-next-line:no-any
}: FieldConfig<any, TClean>) => {
    const cleanValueType = required ? valueType : types.maybe(valueType);
    return types.model(id, {
        instance: types.optional(types.string, id),
        touched: types.optional(types.boolean, false),
        committed: types.optional(types.boolean, false),  // validates on init with commit=true
        validity: types.optional(validityModel(cleanValueType), { state: VALIDATING }),
        raw: types.optional(types.string, '')
    })
        .views((self) => {
            return {
                get htmlId() {
                    return self.instance;
                },
                get name() {
                    return self.instance;
                },
            };
        })
        .views(self => ({
            get Component() {
                return inputComponent;
            },
            get disabled() {
                return disabled;
            },
            get required() {
                return required;
            },
            get dirty() {
                return self.touched;
            },
        }))
        .actions(self => ({
            validate: function (commit: boolean) {
                try {
                    const validity = validate(self.raw, required, self.Component.isEmpty, self.Component.validate);
                    self.validity = validity;
                    if (validity.state !== VALID) {
                        // always un-commit if we're no longer valid
                        self.committed = false;
                    } else if (commit) {
                        self.committed = true;
                    }
                } catch (err) {
                    self.validity = { state: INVALID, reason: `Error while validating: ${err}` };
                }
            },
        }))
        .actions(self => ({
            afterCreate() {
                self.validate(true);
            },
            handleCommit() {
                self.touched = true;
                self.validate(true);
            },
            handleUpdate(newValue: string) {
                self.raw = newValue;
                self.committed = false;
                if (self.dirty) {
                    self.validate(false);
                }
            },
            touch() {
                self.touched = true;
            },
        }));
};

export default fieldModel;
