import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from '..';
import { Form as ProfileForm } from './Store';
import FieldError from './FieldError';

const Row: React.StatelessComponent = ({ children }) => (
    <div style={{display: 'flex'}}>
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
            <Form
                model={this.fields}
                onSubmit={this.handleSubmit}
            >
                <div>
                    <h1>Profile form</h1>
                    <Row>
                        <Col>
                            <FieldError field="firstName" />
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
                            <button type="submit">Submit</button>
                            <button type="reset">Reset</button>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
}
