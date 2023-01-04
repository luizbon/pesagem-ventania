import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import Form from "./Form";
import Table from "./Table";
import { formatDatabase } from "../../shared/constants";
import { firebase } from "../../firebase";
import { ref, onValue, set } from "firebase/database";

const Dashboard = (props) => {
    const [loading, setLoading] = useState(false);
    const [animais, setAnimais] = useState([]);

    let animaisRef = ref(firebase.database, `animais/${props.group.key}`);

    useEffect(() => {
        onValue(animaisRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val().sort(sortAnimais);
                setAnimais(data);
            } else {
                setAnimais([]);
            }
            setLoading(false);
        });
    }, [props.group.key]);

    const sortAnimais = (a, b) => {
        if (a.registro === b.registro) {
            return moment(a.dataAtual, formatDatabase).isBefore(
                moment(b.dataAtual, formatDatabase)
            ) ? -1 : 1;
        }
        return a.registro > b.registro ? 1 : -1;
    };

    const deleteAnimal = (id) => {
        set(animaisRef, animais.filter(item => item._id !== id));
    }

    const addAnimal = (animal) => {
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
        set(animaisRef, animais);
    }

    return (
        <Fragment>
            <h2>Controle de ganho de peso {props.group.name}</h2>
            <Row className="d-print-none">
                <Col sm="auto">
                    <Form onSubmit={addAnimal} />
                </Col>
            </Row>
            <Row>
                <Col sm>
                    {loading === true ? (
                        <h3> CARREGANDO... </h3>
                    ) : (
                        <Table
                            animais={animais}
                            delete={deleteAnimal}
                        />
                    )}
                </Col>
            </Row>
        </Fragment>
    );
}

export default Dashboard;
