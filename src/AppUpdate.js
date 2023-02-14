import { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useServiceWorker } from "./useServiceWorker";

const AppUpdate = ({ children }) => {
    const { isUpdateAvailable, updateAssets } = useServiceWorker();
    const { modal, setModal } = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (setModal) {
            setModal(isUpdateAvailable);
        }
    }, [isUpdateAvailable, setModal]);

    return (
        <Fragment>
            {children}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    ATENÇÃO!!
                </ModalHeader>
                <ModalBody>
                    Existe uma nova versão disponível
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateAssets}>
                        Atualiza
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancela
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default AppUpdate;