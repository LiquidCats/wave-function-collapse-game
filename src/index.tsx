import React from 'react';
import * as PIXI from "pixi.js";
import {AppProvider, createRoot} from "@pixi/react";
import {RecoilRoot} from 'recoil';
//
import App from "App";
//
import "assets/styles/main.scss"
import EntitiesContainer from "core/models/entities/EntitiesContainer";
import EntitiesContext from "game/entities/context/EntitiesContext";
//
import reportWebVitals from './reportWebVitals';
import {commandUnitCreator, attackUnitCreator} from "./core/models/entities/creators";
import Position from "./core/valueObjects/Position";
import UnitModel from "./core/models/entities/UnitModel";

window.oncontextmenu = (e) => {
    e.preventDefault()
    return false
}
const app = new PIXI.Application({
    backgroundColor: 0x171717,
    antialias: false,
    autoDensity: true,
    backgroundAlpha: 1,
    width: window.innerWidth,
    height: window.outerHeight,
    view: document.getElementById('root') as HTMLCanvasElement,
})
const entities = new EntitiesContainer()
entities.add(
    commandUnitCreator().placeOnMap(new Position(100, 100))
)
entities.add(
    (attackUnitCreator().placeOnMap(new Position(300, 300)) as UnitModel)
)

const root = createRoot(app.stage)

root.render(
    <AppProvider value={app}>
        <RecoilRoot>
            <EntitiesContext.Provider value={entities}>
                <App/>
            </EntitiesContext.Provider>
        </RecoilRoot>
    </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
