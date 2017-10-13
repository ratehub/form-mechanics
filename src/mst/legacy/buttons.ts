// import * as React from 'react';
// import { observer } from 'mobx-react';
// import {
//    Submit as SubmitButton,
//    Reset as ResetButton,
// } from '../buttons';
// import { CTX_KEY } from './constants';

// interface SubmitProps {
//    disabled?: boolean;
// }
// const Submit: React.StatelessComponent<SubmitProps> = (
// {
//    children,
//    disabled: disabledByProps = false
// },
// { [CTX_KEY]: { model, onSubmit } }) => {

//    const disabled = disabledByProps ||
//                     model.validity.state !== 'valid';
   
//    const handleSubmit = disabled
//       ? model.touch
//       : onSubmit;

//    return React.createElement(
//       SubmitButton,
//       {
//          disabled,
//          onSubmit: handleSubmit,
//       },
//       children);
// };
// Submit.contextTypes = {
//    [CTX_KEY]: () => null,
// };
// const ObservedSubmit = observer(Submit);
// export { ObservedSubmit as Submit };

// interface ResetProps {
//    disabled?: boolean;
// }
// const Reset: React.StatelessComponent<ResetProps> = ({ children, disabled }, { [CTX_KEY]: { onReset } }) =>
// React.createElement(ResetButton, { disabled, onReset }, children);

// Reset.contextTypes = {
//    [CTX_KEY]: () => null,
// };

// export {
//    Reset,
// };
