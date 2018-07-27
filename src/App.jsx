import React, { Component } from "react";
import moment from "moment";
import Form from "./Form";
import Table from "./Table";
import { formatBrazil } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animais: []
    };
    this.addAnimal = this.addAnimal.bind(this);
  }

  addAnimal(animal) {
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
      animais
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Controle de ganho de peso</h2>
        <div className="row">
          <div className="col-sm col-md-6">
            <Form onSubmit={this.addAnimal} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <Table animais={this.state.animais} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
