import * as React from 'react';
import { css } from 'glamor';
import { makeStyles } from '../../theme';
import { InputProps, INVALID } from '../../types';

type Props = InputProps<string, string, { placeholder: string }>;

// tslint:disable-next-line:no-any
type ThemedProps = Props & { styles: any };

const Email: React.StatelessComponent<ThemedProps> =
    ({ disabled, inputProps, onCommit, onUpdate, styles, value }: ThemedProps) => (
    <input
        disabled={disabled}
        type="email"
        onBlur={(_) => onCommit()}
        onChange={(e: {target: {value: string}}) => onUpdate(e.target.value)}
        value={value}
        {...styles}
        {...inputProps}
    />
);

/**
 * Test if an email address might be valid
 *
 * Accepts everything except some definitely-bad addresses:
 * <anything>@<anything>.<anything>
 *
 * @param v email address to check
 */
const validate = (v: string) =>
    /.+@.+\..+/.test(v)
        ? Promise.resolve(v)
        : Promise.reject('Invalid email address');

type themeType = {[k: string]: string | number};

const style = makeStyles((theme: themeType, { validity }: Props) => css(
{
    backgroundColor: theme.inputBackground,
    border: `solid 1.75px ${theme.inputBorder}`,
    borderRadius: theme.inputBorderRadius,
    boxSizing: 'border-box',
    color: theme.inputColor,
    fontSize: theme.inputFontSize,
    fontWeight: theme.inputFontWeight,
    padding: theme.inputPadding,
    width: '100%',
    ':focus': {
        outline: 'none',
        borderColor: theme.inputBorderActive,
    },
    ':disabled': {
        color: theme.inputColorDisabled,
        borderColor: theme.inputBorderDisabled,
    },
},
validity.state === INVALID && {
    borderColor: theme.inputBorderInvalid,
}));

export default Object.assign(style(Email), { validate });

export type P = React.InputHTMLAttributes<HTMLInputElement> & React.ClassAttributes<HTMLInputElement>;
