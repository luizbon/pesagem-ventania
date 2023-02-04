import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import Form from "./Form";
import Table from "./Table";
import { formatDatabase } from "../../shared/constants";
import { firebase } from "../../firebase";
import { ref, onValue, set, push, remove, update, onChildAdded, onChildRemoved, onChildChanged } from "firebase/database";
import Peso from "./models/Peso";

const Dashboard = (props) => {
    const [animais, setAnimais] = useState([]);

    let animaisRef = ref(firebase.database, `animais/${props.group.key}`);

    useEffect(() => {
        setAnimais([]);
        onChildAdded(animaisRef, animalRef => {
            setAnimais(previous => [...previous, animalRef.val()].sort(sortAnimais));
        });

        onChildRemoved(animaisRef, animalRef => {
            setAnimais(previous => previous.filter(item => item.key !== animalRef.key));
        });

        onChildChanged(animaisRef, animalRef => {
            setAnimais(previous => {
                const data = previous.map(item => {
                    if (item.key === animalRef.key) {
                        return animalRef.val();
                    }
                    return item;
                });
                data.sort(sortAnimais);
                return data;
            });
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

    const deleteAnimal = (key) => {
        const pesagemRef = ref(firebase.database, `pesagem/${key}`);
        remove(pesagemRef);
        const animalRef = ref(firebase.database, `animais/${props.group.key}/${key}`)
        onValue(animalRef, animal => {
            if (animal.exists()) {
                remove(animalRef);
            }
        }, {
            onlyOnce: true
        });
    }

    const addAnimal = (animal) => {
        const currentAnimal = animais.find(
            item => item.registro === animal.registro
        );
        if (currentAnimal !== undefined) {
            const animalRef = ref(firebase.database, `animais/${props.group.key}/${currentAnimal.key}`)
            currentAnimal.dataAnterior = currentAnimal.dataAtual;
            currentAnimal.pesoInicial = currentAnimal.pesoFinal;
            currentAnimal.dataAtual = animal.dataAtual;
            currentAnimal.pesoFinal = animal.pesoFinal;
            update(animalRef, currentAnimal);
            addPesagem(currentAnimal);
        } else {
            const animalRef = push(animaisRef);
            animal.key = animalRef.key;
            set(animalRef, animal);
            addPesagem(animal);
        }
    }

    const addPesagem = (animal) => {
        const pesagemRef = ref(firebase.database, `pesagem/${animal.key}`);
        const novaPesagemRef = push(pesagemRef);
        set(novaPesagemRef, new Peso(animal));
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
                    <Table
                        animais={animais}
                        delete={deleteAnimal}
                    />
                </Col>
            </Row>
        </Fragment>
    );
}

export default Dashboard;
