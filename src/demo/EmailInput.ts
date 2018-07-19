import TextInput from './TextInput';

export default Object.assign(TextInput.bind(null), TextInput, {
   validate: (v: string): string => {
      if (!/.+@.+\..+/.test(v)) {
         throw 'Invalid email address';
      }
      return v;
   }
});
