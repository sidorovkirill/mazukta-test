import * as React from "react";
import {render} from "react-dom";
import { createGlobalStyle } from 'styled-components'
import App from "./components/app";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const rootEl = document.getElementById("root");
render(
    <React.Fragment>
        <GlobalStyle/>
        <App/>
    </React.Fragment>,
    rootEl,
);
