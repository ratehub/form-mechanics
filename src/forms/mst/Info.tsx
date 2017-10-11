import * as React from 'react';
import { observer } from 'mobx-react';
import { CTX_KEY } from './constants';

const Info: React.StatelessComponent = (_, { [CTX_KEY]: { model } }) => (
   <div>
      <p>dirty? {model.dirty ? 'ya' : 'na'}</p>
      <p>
         validity:{' '}
         {(() => {
            const { dirty, validity } = model;
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
   [CTX_KEY]: () => null,
};


export default observer(Info);
