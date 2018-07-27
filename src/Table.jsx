import React from "react";
import moment from "moment";
import { Table } from "reactstrap";
import { formatBrazil } from "./constants";

export default ({ animais }) => (
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
      {animais.map((animal, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{animal.registro}</td>
            <td>{animal.dataAnterior}</td>
            <td>
              {moment(animal.dataAtual, formatBrazil).format(formatBrazil)}
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
);
