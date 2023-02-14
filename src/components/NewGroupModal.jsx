import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { isEmpty } from "validator";
import { Groups } from "../shared/database";
import { AppContext } from "./AppProvider";

const NewGroupModal = (props) => {
    const [grupo, setGrupo] = useState("");
    const [grupoError, setGrupoError] = useState("");
    const groupInput = useRef(null);
    const { state } = useContext(AppContext);

    const handleGrupo = (event) => {
        setGrupo(event.target.value);
        setGrupoError("");
    };

    useEffect(() => {
        if (groupInput.current && props.isOpen) {
            groupInput.current.focus();
        }
    }, [props.isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEmpty(grupo)) {
            setGrupoError("Grupo não pode ser vazio");
            return;
        }
        const groups = new Groups(state.currentUser);
        return groups.exists(grupo).then((snapshot) => {
            if (snapshot) {
                setGrupoError("Grupo já existe");
                return;
            }
            return groups.add(grupo).then(() => props.toggle());
        });
    };

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Novo Grupo</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="groupName">
                            Grupo
                        </Label>
                        <Input id="groupName" name="groupName" placeholder="Grupo" invalid={!isEmpty(grupoError)} onChange={handleGrupo} ref={groupInput} />
                        {!isEmpty(grupoError) && <FormFeedback>{grupoError}</FormFeedback>}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Confirma
                </Button>
                <Button color="secondary" onClick={props.toggle}>
                    Cancela
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default NewGroupModal;