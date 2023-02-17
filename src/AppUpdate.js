import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useServiceWorker } from "./useServiceWorker";

const AppUpdate = ({ children }) => {
    const { isUpdateAvailable, updateAssets } = useServiceWorker();
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        setModal(isUpdateAvailable);
    }, [isUpdateAvailable]);

    return (
        <Fragment>
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
            {children}
        </Fragment>
    );
}

export default AppUpdate;