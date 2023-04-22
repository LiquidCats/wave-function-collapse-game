import React from 'react';
import ReactDOM from "react-dom/client";
import * as PIXI from "pixi.js";
//
import App from "App";
import {AppProvider} from "@pixi/react";
//
import "assets/styles/main.scss"
//
import reportWebVitals from './reportWebVitals';

window.oncontextmenu = (e) => {
    e.preventDefault()
    return false
}
const app = new PIXI.Application({
    backgroundColor: "#000",
    antialias: true,
    backgroundAlpha: 1,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <App/>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
