import * as defaults from './defaults';

export type theme = { [k in keyof typeof defaults]?: string };
