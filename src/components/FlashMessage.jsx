import React from "react";
import { Alert } from "reactstrap";
import { Consumer } from "./AppProvider";

const FlashMessage = () => (
  <Consumer>
    {({ state, ...context }) =>
      state.message && (
        <Alert color="warning" toggle={context.clearMessage}>
          {state.message}
        </Alert>
      )
    }
  </Consumer>
);

export default FlashMessage;
