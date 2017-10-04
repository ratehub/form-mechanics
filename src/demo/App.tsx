import * as React from 'react';
import { ThemeProvider } from '../theme';
import { Form, Input } from '../forms/mst';
import { Form as ProfileForm } from './Store';

const handleSubmit = (_: {}) => null;

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

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <ThemeProvider>
                <div>
                    <h1>Profile form</h1>
                    <Form
                        model={ProfileForm.model}
                        onSubmit={handleSubmit}
                    >
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
                            <Col>
                                <Input field="phone" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button type="submit">submit</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </ThemeProvider>
        );
    }
}
