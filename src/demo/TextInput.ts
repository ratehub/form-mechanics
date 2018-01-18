import * as React from 'react';
import { INVALID, Validity, FieldProps, inputProps } from '..';

// tslint:disable-next-line:no-any
const style = (dirty: boolean, validity: Validity<any>) => Object.assign(
{
   backgroundColor: '#eee',
   border: `solid 1.75px lightgrey`,
   borderRadius: 3,
   borderColor: '#888',
   boxSizing: 'border-box',
   color: '#333',
   fontSize: 21,
   padding: '0.5em',
   width: '100%',
},
(dirty && validity.state === INVALID) && {
   borderColor: 'firebrick',
});

const formatUpper = (value: string) =>
   value.toUpperCase();

const Text: React.StatelessComponent<FieldProps<string, string, {}>> =
({ id, committed, dirty, disabled, inputProps: forInput, name, onCommit, onUpdate, raw, validity }) =>
   React.createElement('input', {
      id,
      name,
      disabled,
      type: 'text',
      onBlur: () => onCommit(),
      onKeyPress: ({ key }) => {
         if (key === 'Enter') {
            onCommit();
         }
      },
      onChange: ({ target: { value } }: { target: { value: string } }) => onUpdate(value),
      value: committed ? formatUpper(raw) : raw,
      style: style(dirty, validity),
      ...forInput,
   });


Text.propTypes = inputProps();


export default Object.assign(Text, {
   isEmpty: (v: string) => v === '',
   validate: (v: string): Promise<string> => Promise.resolve(v),
});
