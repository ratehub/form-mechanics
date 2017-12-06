import TextInput from './TextInput';

export default Object.assign(TextInput.bind(null), TextInput, {
   validate: (v: string): Promise<string> =>
      /.+@.+\..+/.test(v)
         ? Promise.resolve(v)
         : Promise.reject('Invalid email address'),
});
