import * as React from 'react';
import { InputProps, VALID, INVALID, VALIDATING } from '../types';

type Props = InputProps<string, string>;

const Email: React.SFC<Props> = ({ dirty, disabled, onCommit, onUpdate, validity, value }: Props) => (
    <div>
        <input
            disabled={disabled}
            type="email"
            onBlur={(_) => onCommit()}
            onChange={(e: {target: {value: string}}) => onUpdate(e.target.value)}
            value={value}
        />
        {(() => {
            switch (validity.state) {
            case VALID:
                return `valid: ${validity.cleanValue}`;
            case INVALID:
                return `nope no good: ${validity.reason}`;
            case VALIDATING:
                return 'pending';
            default:
                throw new Error('boo');
            }
        })()}
        .
        {dirty ? 'dirty' : 'clean'}
    </div>
);

/**
 * Test if an email address might be valid
 *
 * Accepts everything except some definitely-bad addresses
 *
 * @param v email address to check
 */
const validate = (v: string) =>
    // <anything>@<anything>.<anything>
    /.+@.+\.+/.test(v)
        ? Promise.resolve(v)
        : Promise.reject('Invalid email address');

export default Object.assign(Email, { validate });
