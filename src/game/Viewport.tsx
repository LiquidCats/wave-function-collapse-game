import React, {ForwardedRef, forwardRef, memo} from "react";
import { PixiComponent, useApp } from "@pixi/react";
import { Rectangle } from "@pixi/math";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
//
import {MAP_TILES, TILE_SIZE} from "core/enums/tile";

type Listener = (e: PIXI.FederatedPointerEvent) => void
export interface ViewportProps {
    width: number;
    height: number;
    children?: React.ReactNode;
    onMouseDown?: Listener
    onMouseMove?: Listener
    onMouseUp?: Listener
    onRightDown?: Listener
    onRightUp?: Listener
}

export interface PixiComponentViewportProps extends ViewportProps {
    app: PIXI.Application;
}

const boundBox = TILE_SIZE*2

const PixiViewportComponent = PixiComponent("Viewport", {
    create(props: PixiComponentViewportProps) {
        const {
            app,
            onMouseDown = () => {},
            onMouseMove = () => {},
            onMouseUp = () => {},
            onRightDown = () => {},
            onRightUp = () => {},
            ...viewportProps
        } = props;

        const viewport = new Viewport({
            screenWidth: props.width,
            screenHeight: props.height,
            worldWidth: TILE_SIZE * MAP_TILES,
            worldHeight: TILE_SIZE * MAP_TILES,
            //
            ticker: props.app?.ticker,
            events: props.app?.renderer?.events,
            //
            ...viewportProps
        });

        viewport.addEventListener('mousedown', onMouseDown)
        viewport.addEventListener('mousemove', onMouseMove)
        viewport.addEventListener('mouseup', onMouseUp)
        viewport.addEventListener('rightdown', onRightDown)
        viewport.addEventListener('rightup', onRightUp)

        viewport
            .drag({
                mouseButtons: "right",
            })
            .wheel()
            .clampZoom({
                minScale: .2,
                maxScale: 1
            })
            .bounce({
                bounceBox: new Rectangle(-boundBox, -boundBox, viewport.worldWidth+boundBox, viewport.worldHeight+boundBox),
            })
            .decelerate()

        return viewport;
    },
    applyProps(viewport: Viewport, oldProps: Readonly<PixiComponentViewportProps>, newProps: Readonly<PixiComponentViewportProps>) {
        if (oldProps.width !== newProps.width || oldProps.height !== newProps.height) {
            viewport.resize(
                newProps.width,
                newProps.height,
                viewport.worldWidth,
                viewport.worldHeight,
            )
        }

        const p: ['mousedown'|'mousemove'|'mouseup'|'rightdown'|'rightup', string][] = [
            ['mousedown', 'onMouseDown'],
            ['mousemove', 'onMouseMove'],
            ['mouseup', 'onMouseUp'],
            ['rightdown', 'onRightDown'],
            ['rightup', 'onRightUp'],
        ]

        for (const [eventName , propName] of p) {
            const oldProp = oldProps[propName as keyof Omit<PixiComponentViewportProps, 'width'|'height'|'children'|'app'>]
            const newProp = newProps[propName as keyof Omit<PixiComponentViewportProps, 'width'|'height'|'children'|'app'>]

            if (oldProp && oldProp !== newProp) {
                viewport.removeEventListener(eventName, oldProp)
            }

            if (newProp && oldProp !== newProp) {
                viewport.addEventListener(eventName, newProp)
            }
        }
    }
});

const PixiViewport = memo(
    forwardRef((props: ViewportProps, ref: ForwardedRef<any>) => {
        const app = useApp()
        return <PixiViewportComponent ref={ref} app={app} {...props} />
    })
);

PixiViewport.displayName = 'PixiViewport';

export default PixiViewport