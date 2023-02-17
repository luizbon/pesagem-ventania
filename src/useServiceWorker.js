import React, { useContext, useEffect, useMemo, useState, createContext } from "react";
import * as serviceWorker from './serviceWorkerRegistration';

const ServiceWorkerContext = createContext();

export const ServiceWorkerProvider = ({ children }) => {
    const [waitingServiceWorker, setWaitingServiceWorker] = useState(null);
    const [isUpdateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        serviceWorker.register({
            onUpdate: registration => {
                setWaitingServiceWorker(registration.waiting);
                setUpdateAvailable(true);
            },
            onWaiting: waiting => {
                setWaitingServiceWorker(waiting);
                setUpdateAvailable(true)
            }
        });
    }, []);

    useEffect(() => {
        waitingServiceWorker && waitingServiceWorker.addEventListener('statechange', event => {
            if (event.target.state == 'activated') {
                window.location.reload();
            }
        });
    }, [waitingServiceWorker]);

    const value = useMemo(() => ({
        isUpdateAvailable,
        updateAssets: () => {
            if (waitingServiceWorker) {
                waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
            }
        }
    }), [isUpdateAvailable, waitingServiceWorker]);

    return (
        <ServiceWorkerContext.Provider value={value}>
            {children}
        </ServiceWorkerContext.Provider>
    );
}

export const useServiceWorker = () => {
    return useContext(ServiceWorkerContext);
}