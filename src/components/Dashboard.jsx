import React, { Component, Fragment } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import Form from "./Form";
import Table from "./Table";
import { formatBrazil } from "../shared/constants";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animais: []
    };
    this.addAnimal = this.addAnimal.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    this.setState({
      animais: this.state.animais.filter(item => item._id !== id)
    });
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
      <Fragment>
        <h2>Controle de ganho de peso</h2>
        {/* <Row>
          <Col sm="auto">
            <Form onSubmit={this.addAnimal} />
          </Col>
        </Row>
        <Row>
          <Col sm>
            <Table animais={this.state.animais} delete={this.delete} />
          </Col>
        </Row> */}
      </Fragment>
    );
  }
}

export default Dashboard;
