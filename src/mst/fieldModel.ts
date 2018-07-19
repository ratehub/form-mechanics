import { types, IType } from 'mobx-state-tree';

import { validate } from '../validation';
import { VALID, INVALID } from '../types';
import { createValidType, createInvalidType } from './validityModel';
import { MSTComponentType } from '.';


/**
 * 
 * TRaw :  Input value prior to validation
 * TClean: Output value after validation.
 */
interface FieldConfig<TRaw, TClean> {
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly valueType?: IType<any, any>;  // tslint:disable-line:no-any
    readonly inputComponent: MSTComponentType<TRaw, TClean>;
}



// inputComponent => React component??
// valueType => string
// required => boolean
// disabled => boolean

// we produce a FieldConfig<any, TClean>
//  -> TClean bakes into the validity object.






/**
 * MST definition of our field model.
 * @param id model name for this type of field.
 * @param config configuration to build the field with.
 */
const fieldModel = <TClean>(id: string, {
    inputComponent,
    valueType = types.string,
    required = false,
    disabled = false,
}: FieldConfig<any, TClean>) => {  // tslint:disable-line:no-any
    const cleanValueType = required ? valueType : types.maybe(valueType);
    const validType = createValidType(cleanValueType)
    const invalidType = createInvalidType(cleanValueType);

    const validityModelTypes = types.union(
        validType,
        invalidType
    );
    return types.model(id, {
        instance: types.optional(types.string, id),
        touched: types.optional(types.boolean, false),
        committed: types.optional(types.boolean, false),  // validates on init with commit=true
        validity: types.optional(validityModelTypes, { state: INVALID, reason: "initializing" }),
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

                if (validity.state === 'valid' ) {
                   self.validity = validType.create(validity);
                } else if (validity.state === 'invalid') {
                   self.validity = invalidType.create(validity);
                }

                if (validity.state !== VALID) {
                    self.committed = false;
                } else if (commit) {
                    self.committed = true;
                }
            } catch (err) {
                self.validity = { 
                    state: INVALID, 
                    reason: `Error while validating: ${err}` 
                };
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
