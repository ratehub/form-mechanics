import * as React from 'react';
import { css } from 'glamor';
import { makeStyles, themeType } from '../../../theme';
import { InputProps, INVALID } from '../../types';

type Props = InputProps<string, string, { placeholder: string }>;

// tslint:disable-next-line:no-any
type ThemedProps = Props & { styles: any };

const Text: React.StatelessComponent<ThemedProps> =
    ({ disabled, inputProps, onCommit, onUpdate, styles, value }: ThemedProps) => (
    <input
        disabled={disabled}
        type="text"
        onBlur={(_) => onCommit()}
        onChange={(e: {target: {value: string}}) => onUpdate(e.target.value)}
        value={value}
        {...styles}
        {...inputProps}
    />
);

/**
 * All strings are valid strings
 *
 * @param v the string to check
 */
const validate = (v: string) =>
   Promise.resolve(v);

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
        cursor: 'not-allowed',
        borderColor: theme.inputBorderDisabled,
    },
},
validity.state === INVALID && {
    borderColor: theme.inputBorderInvalid,
}));

export default Object.assign(style(Text), { validate });

export type P = React.InputHTMLAttributes<HTMLInputElement> & React.ClassAttributes<HTMLInputElement>;
