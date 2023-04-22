import React, {ForwardedRef, forwardRef, memo, MouseEvent} from "react";
import { PixiComponent, useApp } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import {TILE_SIZE} from "../core/enums/tile";
import {FederatedPointerEvent} from "pixi.js";

export interface ViewportProps {
    width: number;
    height: number;
    children?: React.ReactNode;
    onMouseDown?: (e: FederatedPointerEvent) => void
    onMouseMove?: (e: FederatedPointerEvent) => void
    onMouseUp?: (e: FederatedPointerEvent) => void
}

export interface PixiComponentViewportProps extends ViewportProps {
    app: PIXI.Application;
}

const PixiViewportComponent = PixiComponent("Viewport", {
    create(props: PixiComponentViewportProps) {
        const {
            app,
            onMouseDown = () => {},
            onMouseMove = () => {},
            onMouseUp = () => {},
            ...viewportProps
        } = props;

        const viewport = new Viewport({
            screenWidth: props.width,
            screenHeight: props.height,
            worldWidth: TILE_SIZE * 32,
            worldHeight: TILE_SIZE * 32,
            //
            ticker: props.app?.ticker,
            events: props.app?.renderer?.events,
            //
            ...viewportProps
        });

        viewport.addEventListener('mousedown', onMouseDown)
        viewport.addEventListener('mousemove', onMouseMove)
        viewport.addEventListener('mouseup', onMouseUp)

        viewport
            .drag({
                mouseButtons: "right",
            })
            .wheel()
            .clampZoom({
                minScale: .5,
                maxScale: 1
            })
            .decelerate()

        return viewport;
    },
    applyProps(viewport: Viewport, oldProps: Readonly<PixiComponentViewportProps>, newProps: Readonly<PixiComponentViewportProps>) {
        if (oldProps.width !== newProps.width || oldProps.height !== newProps.height) {
            newProps.app.renderer.resize(newProps.width, newProps.height)
            //
            viewport.resize(
                newProps.width,
                newProps.height,
                TILE_SIZE * 32,
                TILE_SIZE * 32,
            )
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