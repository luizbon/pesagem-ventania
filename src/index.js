import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/print.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ServiceWorkerProvider } from "./useServiceWorker";
import AppUpdate from "./AppUpdate";
import "./apocalypseHandler";

if (
    process.env.NODE_ENV === "production" &&
    process.env.REACT_APP_SENTRY_RELEASE
) {
    Sentry.init({
        dsn: "https://b157cfbe30684d499e7caa33a61d9954@o1217558.ingest.sentry.io/4504625308434432",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
        release: process.env.REACT_APP_SENTRY_RELEASE
    });
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <ServiceWorkerProvider>
        <AppUpdate>
            <App />
        </AppUpdate>
    </ServiceWorkerProvider>
);