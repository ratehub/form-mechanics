import { types } from 'mobx-state-tree';
import {
   Text as RawText,
   Email as RawEmail,
} from '../../ui/widgets';

export const Text = Object.assign(RawText.bind(null), RawText, {
   raw: types.string,
   clean: types.string,
});

export const Email = Object.assign(RawEmail.bind(null), RawEmail, {
   raw: types.string,
   clean: types.string,
});
