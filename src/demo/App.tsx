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
                            <Label field="firstName" />
                            <FieldError field="firstName" />
                            <Input field="firstName" />
                        </Col>
                        <Col>
                            <Label field="lastName" />
                            <FieldError field="lastName" />
                            <Input field="lastName" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label field="email" />
                            <FieldError field="email" />
                            <Input field="email" />
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
