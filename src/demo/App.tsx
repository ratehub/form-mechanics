import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from '..';
import { Form as ProfileForm } from './Store';
import Label from './Label';
import FieldError from './FieldError';
import FormErrors from './FormErrors';

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
export default class App extends React.Component<any> {
    model: typeof ProfileForm.Type = ProfileForm.create();

    constructor(props: {}) {
        super(props);
    }

    handleSubmit = (data: {}) => {
        // tslint:disable-next-line:no-console
        console.log('data', data);
    }

    handleReset = (data: {}) => {
        // tslint:disable-next-line:no-console
        console.log('reset', data);
    }

    render() {
        let firstName = 'firstName';
        let lastName = 'lastName';
        let email = 'email';
        let age = 'age';

        return (
            <Form
                model={this.model}
                onSubmit={this.handleSubmit}
            >
                <div>
                    <h1>Profile form</h1>
                    <Row>
                        <Col>
                            <Label field="firstName" />
                            <FieldError field="firstName" />
                            <Input field={this.model.fields[firstName]} />
                        </Col>
                        <Col>
                            <Label field="lastName" />
                            <FieldError field="lastName" />
                            <Input field={this.model.fields[lastName]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label field="email" />
                            <FieldError field="email" />
                            <Input field={this.model.fields[email]} />
                        </Col>
                        <Col>
                            <Label field="age" />
                            <FieldError field="age" />
                            <Input field={this.model.fields[age]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormErrors />
                            <button type="submit">Submit</button>
                            {/*<button type="reset">Reset</button>-->*/}
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
}
