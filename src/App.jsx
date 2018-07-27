import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import moment from "moment";
import { isEmpty, isNumeric } from "validator";

const formatBrazil = "DD/MM/YYYY";

class InpuForm {
  constructor() {
    this.animal = "";
    this.peso = "";
    this.data = moment().format(formatBrazil);
  }
  get isValid() {
    return (
      !isEmpty(this.animal) &&
      isNumeric(this.peso) &&
      this.peso > 0 &&
      moment(this.data, formatBrazil).isValid()
    );
  }
  toAnimal() {
    return new Animal(this.animal, this.peso, this.data);
  }
}

class Animal {
  constructor(registro, peso, data) {
    this.registro = registro;
    this.pesoFinal = peso;
    this.dataAtual = data;
    this.pesoInicial = undefined;
    this.dataAnterior = undefined;
  }

  get dias() {
    if (this.dataAnterior === undefined) return undefined;
    return moment(this.dataAtual, formatBrazil).diff(
      moment(this.dataAnterior, formatBrazil),
      "days"
    );
  }

  get gdp() {
    if (this.dataAnterior === undefined) return undefined;
    return ((this.pesoFinal - this.pesoInicial) / this.dias) * 1000;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animais: [],
      form: new InpuForm()
    };

    this.addAnimal = this.addAnimal.bind(this);
    this.animalChange = this.animalChange.bind(this);
    this.pesoChange = this.pesoChange.bind(this);
    this.dataChange = this.dataChange.bind(this);
  }

  animalChange(e) {
    const form = this.state.form;
    form.animal = e.target.value.toUpperCase();
    this.setState({
      form
    });
  }

  pesoChange(e) {
    const form = this.state.form;
    form.peso = e.target.value;
    this.setState({
      form
    });
  }

  dataChange(e) {
    const form = this.state.form;
    form.data = e.target.value;
    this.setState({
      form
    });
  }

  addAnimal(e) {
    e.preventDefault();
    if (!this.state.form.isValid) return;

    const animal = this.state.form.toAnimal();
    const animais = this.state.animais;
    animais.push(animal);
    animais.sort((a, b) => {
      if (a.registro === b.registro) {
        return moment(a.dataAtual, formatBrazil).isBefore(
          moment(b.dataAtual, formatBrazil)
        );
      }
      return a.registro > b.registro;
    });
    const filteredAnimais = animais.filter(
      item => item.registro === animal.registro
    );
    for (var i = 1; i < filteredAnimais.length; i++) {
      const previous = filteredAnimais[i - 1];
      const current = filteredAnimais[i];
      if (current) {
        previous.pesoInicial = current.pesoFinal;
        previous.dataAnterior = current.dataAtual;
      }
    }
    this.setState({
      animais,
      form: new InpuForm()
    });
    ReactDOM.findDOMNode(this.animal).focus();
  }

  render() {
    return (
      <div className="container">
        <h2>Controle de ganho de peso</h2>
        <div className="row">
          <div className="col-sm col-md-6">
            <Form className="m-2" onSubmit={this.addAnimal}>
              <FormGroup>
                <Label for="animal" className="mr-sm-2">
                  Animal
                </Label>
                <Input
                  type="text"
                  name="animal"
                  id="animal"
                  placeholder="Animal"
                  ref={input => {
                    this.animal = input;
                  }}
                  autoFocus
                  value={this.state.form.animal}
                  onChange={this.animalChange}
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
                  value={this.state.form.peso}
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
                  value={this.state.form.data}
                  onChange={this.dataChange}
                  tabIndex="-1"
                  required
                />
              </FormGroup>
              <Button enabled={this.state.form.isValid}>Gravar</Button>
            </Form>
          </div>
        </div>
        <Table responsive bordered>
          <thead>
            <tr>
              <th rowSpan="2" className="align-middle text-center">
                No
              </th>
              <th rowSpan="2" className="align-middle text-center">
                Animal
              </th>
              <th colSpan="2" className="text-center">
                Data Pesagem
              </th>
              <th rowSpan="2" className="align-middle text-center">
                Dias
              </th>
              <th colSpan="2" className="text-center">
                Pesagem (Kg)
              </th>
              <th rowSpan="2" className="align-middle text-center">
                GPD
              </th>
            </tr>
            <tr>
              <th className="text-center">Anterior</th>
              <th className="text-center">Atual</th>
              <th className="text-center">Inicial</th>
              <th className="text-center">Final</th>
            </tr>
          </thead>
          <tbody>
            {this.state.animais.map((animal, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{animal.registro}</td>
                  <td>{animal.dataAnterior}</td>
                  <td>
                    {moment(animal.dataAtual, formatBrazil).format(
                      formatBrazil
                    )}
                  </td>
                  <td>{animal.dias}</td>
                  <td>{animal.pesoInicial}</td>
                  <td>{animal.pesoFinal}</td>
                  <td>{animal.gdp}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
