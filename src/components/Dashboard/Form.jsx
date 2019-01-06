import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FormClass from "./models/FormClass";

class InputForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = new FormClass();

        this.addAnimal = this.addAnimal.bind(this);
        this.registroChange = this.registroChange.bind(this);
        this.pesoChange = this.pesoChange.bind(this);
        this.dataChange = this.dataChange.bind(this);
    }

    registroChange(e) {
        this.setState({
            registro: e.target.value.toUpperCase()
        });
    }

    pesoChange(e) {
        this.setState({
            peso: e.target.value
        });
    }

    dataChange(e) {
        this.setState({
            data: e.target.value
        });
    }

    addAnimal(e) {
        e.preventDefault();
        const animal = new FormClass(this.state);
        if (!animal.isValid) return;

        this.props.onSubmit(animal.toAnimal());
        this.setState(
            new FormClass({
                data: this.state.data
            })
        );
        ReactDOM.findDOMNode(this.registro).focus();
    }

    render() {
        return (
            <Form className="m-2" onSubmit={this.addAnimal}>
                <FormGroup>
                    <Label for="animal" className="mr-sm-2">
                        Animal
                    </Label>
                    <Input
                        type="text"
                        name="animal"
                        id="registro"
                        placeholder="Animal"
                        ref={input => {
                            this.registro = input;
                        }}
                        autoFocus
                        value={this.state.registro}
                        onChange={this.registroChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="peso" className="mr-sm-2">
                        Peso
                    </Label>
                    <Input
                        type="number"
                        name="peso"
                        id="peso"
                        placeholder="Peso"
                        value={this.state.peso}
                        onChange={this.pesoChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="peso" className="mr-sm-2">
                        Data
                    </Label>
                    <Input
                        type="text"
                        name="data"
                        id="data"
                        value={this.state.data}
                        onChange={this.dataChange}
                        tabIndex="-1"
                        required
                    />
                </FormGroup>
                <Button type="submit">Gravar</Button>
            </Form>
        );
    }
}

export default InputForm;
