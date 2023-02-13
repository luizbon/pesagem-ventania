import { useEffect, useState } from "react";
import moment from "moment";
import { formatDisplay, formatDatabase } from "../../shared/constants";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { calculaGPD, formatRegistro } from "../../shared/utils";
import Animal from "./models/Animal";

const HistoryModal = (props) => {
    const [pesagens, setPesagens] = useState([]);
    useEffect(() => {
        if (!props.animalKey) {
            return;
        }
        props.animaisRef.get(props.animalKey).then((animalRef) => {
            if (animalRef.exists()) {
                const pesagem = animalRef.data().pesagem;
                if (pesagem) {
                    setPesagens(pesagem.sort(Animal.SortPesagem));
                }
            }
        });
    }, [props.animalKey]);

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Pesagem {formatRegistro(props.animalKey)}</ModalHeader>
            <ModalBody className="p-0">
                <Table striped className="m-0">
                    <thead>
                        <tr>
                            <td>Data</td>
                            <td>Peso</td>
                            <td>GPD</td>
                        </tr>
                    </thead>
                    <tbody>
                        {pesagens.map((item, index, arr) => {
                            const previous = arr[index - 1] || {};
                            const GPD = calculaGPD(previous.peso, item.peso, previous.data, item.data) ?? 0;
                            return (
                                <tr key={item.data}>
                                    <td>{moment(
                                        item.data,
                                        formatDatabase
                                    ).format(formatDisplay)}</td>
                                    <td>{item.peso.toLocaleString('pt-BR', {
                                        maximumFractionDigits: 2
                                    })}</td>
                                    <td>{GPD.toLocaleString('pt-BR', {
                                        maximumFractionDigits: 2
                                    })}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.toggle}>
                    Fechar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default HistoryModal;