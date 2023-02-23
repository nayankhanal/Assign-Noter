import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./componentsTwo/Login"
import {BrowserRouter} from "react-router-dom";
import Logs from "./componentsTwo/Logs"

ReactDOM.render(
    <BrowserRouter>
        <Logs />
    </BrowserRouter>,
    document.getElementById("root")
    );
