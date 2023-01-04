import React from "react";
import { Alert } from "reactstrap";
import { AppContext } from "./AppProvider";

const FlashMessage = () => (
  <AppContext.Consumer>
    {({ state, ...context }) =>
      state.message && (
        <Alert color="warning" toggle={context.clearMessage}>
          {state.message}
        </Alert>
      )
    }
  </AppContext.Consumer>
);

export default FlashMessage;
