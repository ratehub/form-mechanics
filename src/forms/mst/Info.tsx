import * as React from 'react';
import { observer } from 'mobx-react';

const Info: React.StatelessComponent = (_, { __form_fields }) => (
   <div>
      <p>dirty? {__form_fields.dirty ? 'ya' : 'na'}</p>
      <p>
         validity:{' '}
         {(() => {
            const { dirty, validity } = __form_fields;
            if (!dirty) { return 'not dirty'; }
            switch (validity.state) {
            case 'valid':
               return `valid: ${JSON.stringify(validity.cleanValue)}`;
            case 'validating':
               return '...';
            case 'invalid':
               return `invalid: ${validity.reason}`;
            default:
               throw new Error('wat');
            }
         })()}
      </p>
   </div>
);

Info.contextTypes = {
   __form_fields: () => null,
};


export default observer(Info);
