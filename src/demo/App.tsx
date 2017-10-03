import * as React from 'react';
import Email from '../forms/inputs/Email';
import { Email as E2 } from '../forms/inputs/vanilla';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <E2 />
                <Email
                    dirty={false}
                    onCommit={() => null}
                    onUpdate={(x) => null}
                    validity={{ state: 'valid', cleanValue: '' }}
                    value=""
                />
            </div>
        );
    }
}
