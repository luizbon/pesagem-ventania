import React, { Fragment, useState } from "react";
import moment from "moment";
import { Table, Button } from "reactstrap";
import { formatDisplay, formatDatabase } from "../../shared/constants";
import Animal from "./models/Animal";
import HistoryModal from "./HistoryModal";

const Animais = (props) => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [historyKey, setHistoryKey] = useState(null);
    const [historyRegistro, setHistoryRegistro] = useState(null);
    const deleteAnimal = (key) => {
        props.delete(key);
    }

    const showHistory = (key, registro) => {
        setHistoryKey(key);
        setHistoryRegistro(registro);
        setIsHistoryOpen(true);
    }

    const historyToggle = () => {
        setHistoryKey(null);
        setHistoryRegistro(null);
        setIsHistoryOpen(!isHistoryOpen);
    }

    const { animais } = props;
    return (
        <Fragment>
            <Table responsive bordered className="align-middle text-center">
                <thead>
                    <tr>
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
                        <th
                            rowSpan="2"
                            className="d-none d-print-table-cell align-middle text-center"
                        >
                            Pesagem Curral
                        </th>
                        <th rowSpan="2" className="align-middle text-center">
                            GPD
                        </th>
                        <th rowSpan="2" className="d-print-none" />
                    </tr>
                    <tr>
                        <th className="text-center">Anterior</th>
                        <th className="text-center">Atual</th>
                        <th className="text-center">Inicial</th>
                        <th className="text-center">Final</th>
                    </tr>
                </thead>
                <tbody>
                    {animais.map((item) => {
                        const animal = Animal.NewAnimal(item);
                        return (
                            <tr key={animal.key}>
                                <td><Button color="link" block onClick={() => showHistory(animal.key, animal.registro)}>{animal.registro}</Button></td>
                                <td>
                                    {animal.dataAnterior &&
                                        moment(
                                            animal.dataAnterior,
                                            formatDatabase
                                        ).format(formatDisplay)}
                                </td>
                                <td>
                                    {moment(
                                        animal.dataAtual,
                                        formatDatabase
                                    ).format(formatDisplay)}
                                </td>
                                <td>{animal.dias}</td>
                                <td>{animal.pesoInicial}</td>
                                <td>{animal.pesoFinal}</td>
                                <td className="d-none d-print-table-cell" />
                                <td>{animal.gdp}</td>
                                <td className="d-print-none">
                                    <Button
                                        size="sm"
                                        color="danger"
                                        block
                                        onClick={() =>
                                            deleteAnimal(animal.key)
                                        }
                                    >
                                        Apagar
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <HistoryModal isOpen={isHistoryOpen} toggle={historyToggle} animalKey={historyKey} registro={historyRegistro} />
        </Fragment>
    );
}

export default Animais;