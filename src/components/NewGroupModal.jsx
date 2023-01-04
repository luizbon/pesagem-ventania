import { equalTo, onValue, orderByChild, orderByValue, push, query, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { isEmpty } from "validator";
import { firebase } from "../firebase";
import { AppContext } from "./AppProvider";

const NewGroupModal = (props) => {
    const [grupo, setGrupo] = useState("");
    const [grupoError, setGrupoError] = useState("");
    const { state } = useContext(AppContext);

    const handleGrupo = (event) => {
        setGrupo(event.target.value);
        setGrupoError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEmpty(grupo)) {
            setGrupoError("Grupo não pode ser vazio");
            return;
        }
        const groupsRef = ref(firebase.database, `groups/${state.currentUser.uid}`);
        const existingGroup = query(groupsRef, orderByChild("name"), equalTo(grupo));
        return onValue(existingGroup, snapshot => {
            if (snapshot.exists()) {
                setGrupoError("Grupo já existe");
                return;
            }
            const newGroupRef = push(groupsRef);
            set(newGroupRef, {
                name: grupo
            }).then(() => {
                props.toggle();
            });
        }, {
            onlyOnce: true
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
                        <Input id="groupName" name="groupName" placeholder="Grupo" invalid={!isEmpty(grupoError)} onChange={handleGrupo} />
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