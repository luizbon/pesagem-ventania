import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Form from "./Form";
import Table from "./Table";
import HistoryModal from "./HistoryModal";
import { Animal } from "../../shared/database";

const Dashboard = (props) => {
    const [animais, setAnimais] = useState([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [historyKey, setHistoryKey] = useState(null);
    const animaisRef = new Animal(props.user, props.group);

    useEffect(() => {
        setAnimais([]);
        animaisRef.stream((animais) => {
            const list = [];
            animais.forEach(animal => {
                list.push(animal.data());
            });
            setAnimais(list);
        });
    }, [props.group.key]);

    const deleteAnimal = (key) => {
        animaisRef.delete(key);
    }

    const addAnimal = (animal) => {
        return animaisRef.addOrUpdate({
            id: animal.registro,
            registro: animal.registro,
            pesagem: [
                {
                    data: animal.dataAtual,
                    peso: animal.pesoFinal
                }
            ]
        });
    }

    const showHistory = (key) => {
        setHistoryKey(key);
        setIsHistoryOpen(true);
    }

    const historyToggle = () => {
        setHistoryKey(null);
        setIsHistoryOpen(!isHistoryOpen);
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
                        showHistory={showHistory}
                    />
                </Col>
            </Row>
            <HistoryModal isOpen={isHistoryOpen} toggle={historyToggle} animalKey={historyKey} animaisRef={animaisRef} />
        </Fragment>
    );
}

export default Dashboard;
