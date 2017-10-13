import * as React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from '../theme';
// import { Input, Info, Submit, Reset } from '../mst';
import { FormProvider, Input, Submit, Reset } from '../ui';
import { Form as ProfileForm } from './Store';

const Row: React.StatelessComponent = ({ children }) => (
    <div>
        {children}
    </div>
);

const Col: React.StatelessComponent = ({ children }) => (
    <div>
        {children}
    </div>
);

@observer
export default class App extends React.Component {
    fields = ProfileForm.create();

    constructor() {
        super();
    }

    handleSubmit = (data: {}) => {
        // tslint:disable-next-line:no-console
        console.log('data', data);
    }

    render() {
        return (
            <ThemeProvider>
                <FormProvider
                    model={this.fields}
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <h1>Profile form</h1>
                        <Row>
                            <Col>
                                <Input field="firstName" />
                            </Col>
                            <Col>
                                <Input field="lastName" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input field="email" />
                            </Col>
                            {/*<Col>
                                <Input field="phone" />
                            </Col>*/}
                        </Row>
                        <Row>
                            <Col>
                                <Info />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Submit>Submit</Submit>
                                <Reset>Reset</Reset>
                            </Col>
                        </Row>
                    </div>
                </FormProvider>
            </ThemeProvider>
        );
    }
}
