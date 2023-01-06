import { onValue, orderByChild, ref, query } from "firebase/database";
import { useEffect, useState } from "react";
import moment from "moment";
import { formatDisplay, formatDatabase } from "../../shared/constants";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { firebase } from "../../firebase";
import { calculaGPD } from "../../shared/utils";

const HistoryModal = (props) => {
    const [pesagens, setPesagens] = useState([]);
    useEffect(() => {
        if (!props.animalKey) {
            return;
        }
        const pesagemRef = query(ref(firebase.database, `pesagem/${props.animalKey}`), orderByChild("data"));
        onValue(pesagemRef, snapshot => {
            const data = [];
            snapshot.forEach((itemRef) => {
                data.push(itemRef.val());
            });
            setPesagens(data);
        },
            {
                onlyOnce: true
            }
        );
    }, [props.animalKey]);

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Pesagem {props.registro}</ModalHeader>
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
                            const GPD = calculaGPD(previous.peso, item.peso, previous.data, item.data);
                            return (
                                <tr key={item.data}>
                                    <td>{moment(
                                        item.data,
                                        formatDatabase
                                    ).format(formatDisplay)}</td>
                                    <td>{item.peso}</td>
                                    <td>{GPD}</td>
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