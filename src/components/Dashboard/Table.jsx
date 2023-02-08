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

    const animais = props.animais.map((animal) => Animal.NewAnimal(animal));
    let animaisComGdp = 0;

    const convertToNumber = (value) => {
        const number = Number(value);
        if (Number.isNaN(number)) {
            return 0;
        }

        return number;
    };

    const totals = animais.reduce((acc, cur) => {
        if (cur.gdp ?? 0 != 0) {
            animaisComGdp++;
        }
        return {
            pesoInicial: acc.pesoInicial + convertToNumber(cur.pesoInicial),
            pesoFinal: acc.pesoFinal + convertToNumber(cur.pesoFinal),
            gdp: acc.gdp + convertToNumber(cur.gdp)
        }
    }, {
        pesoInicial: Number(0),
        pesoFinal: Number(0),
        gdp: Number(0)
    });

    const average = {
        pesoInicial: totals.pesoInicial / animaisComGdp,
        pesoFinal: totals.pesoFinal / animais.length,
        gdp: totals.gdp / animaisComGdp
    };

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
                    {animais.map((animal) => {
                        const gdpClass = animal.gdp > average.gdp ? "table-success" : animal.gdp < average.gdp ? "table-danger" : "";
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
                                <td>{animal.pesoInicial.toLocaleString('pt-BR', {
                                    maximumFractionDigits: 2
                                })}</td>
                                <td>{animal.pesoFinal.toLocaleString('pt-BR', {
                                    maximumFractionDigits: 2
                                })}</td>
                                <td className="d-none d-print-table-cell" />
                                <td className={gdpClass}>{animal.gdp.toLocaleString('pt-BR', {
                                    maximumFractionDigits: 2
                                })}</td>
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
                <tfoot className="fw-semibold">
                    <tr>
                        <td>Média</td>
                        <td colSpan={3}></td>
                        <td>{average.pesoInicial.toLocaleString('pt-BR', {
                            maximumFractionDigits: 2
                        })}</td>
                        <td>{average.pesoFinal.toLocaleString('pt-BR', {
                            maximumFractionDigits: 2
                        })}</td>
                        <td className="d-none d-print-table-cell" />
                        <td>{average.gdp.toLocaleString('pt-BR', {
                            maximumFractionDigits: 2
                        })}</td>
                        <td className="d-print-none"></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td colSpan={3}></td>
                        <td>{totals.pesoInicial.toLocaleString('pt-BR', {
                            maximumFractionDigits: 2
                        })}</td>
                        <td>{totals.pesoFinal.toLocaleString('pt-BR', {
                            maximumFractionDigits: 2
                        })}</td>
                        <td colSpan={2}></td>
                    </tr>
                </tfoot>
            </Table>
            <HistoryModal isOpen={isHistoryOpen} toggle={historyToggle} animalKey={historyKey} registro={historyRegistro} />
        </Fragment>
    );
}

export default Animais;