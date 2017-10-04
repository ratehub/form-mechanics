import * as React from 'react';
import { ThemeProvider } from '../theme';
import Email from '../forms/inputs/Email';
import { Email as E2 } from '../forms/inputs/vanilla';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <ThemeProvider>
                <div>
                    <E2
                        inputProps={{
                            placeholder: 'email address',
                            maxLength: 80,
                        }}
                    />
                    <Email
                        disabled={true}
                        dirty={false}
                        onCommit={() => null}
                        onUpdate={(_: {}) => null}
                        validity={{ state: 'valid', cleanValue: '' }}
                        value=""
                    />
                </div>
            </ThemeProvider>
        );
    }
}
