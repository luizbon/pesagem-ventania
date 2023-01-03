import React, { Component, Fragment } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import Form from "./Form";
import Table from "./Table";
import { formatDatabase } from "../../shared/constants";
import { firebase } from "../../firebase";
import { ref, onValue, set } from "firebase/database";

const sortAnimais = (a, b) => {
    if (a.registro === b.registro) {
        return moment(a.dataAtual, formatDatabase).isBefore(
            moment(b.dataAtual, formatDatabase)
        ) ? -1 : 1;
    }
    return a.registro > b.registro ? 1 : -1;
};

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.animaisRef = ref(firebase.database, `animais/${props.user.uid}`);
        onValue(this.animaisRef, (snapshot) => {
            const data = snapshot.val().sort(sortAnimais);
            this.setState({
                loading: false,
                animais: data
            });
        });

        this.state = {
            animais: [],
            loading: true
        };

        this.addAnimal = this.addAnimal.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(id) {
        const animais = this.state.animais.filter(item => item._id !== id);
        set(this.animaisRef, animais);
    }

    addAnimal(animal) {
        const animais = this.state.animais;
        const currentAnimal = animais.find(
            item => item.registro === animal.registro
        );
        if (currentAnimal !== undefined) {
            currentAnimal.dataAnterior = currentAnimal.dataAtual;
            currentAnimal.pesoInicial = currentAnimal.pesoFinal;
            currentAnimal.dataAtual = animal.dataAtual;
            currentAnimal.pesoFinal = animal.pesoFinal;
        } else {
            animais.push(animal);
        }
        set(this.animaisRef, animais);
    }

    render() {
        return (
            <Fragment>
                <h2>Controle de ganho de peso</h2>
                <Row className="d-print-none">
                    <Col sm="auto">
                        <Form onSubmit={this.addAnimal} />
                    </Col>
                </Row>
                <Row>
                    <Col sm>
                        {this.state.loading === true ? (
                            <h3> CARREGANDO... </h3>
                        ) : (
                            <Table
                                animais={this.state.animais}
                                delete={this.delete}
                            />
                        )}
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Dashboard;
