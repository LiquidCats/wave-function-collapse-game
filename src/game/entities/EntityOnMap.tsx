import {memo, useCallback, useMemo, PropsWithChildren, useState} from "react";
//
import * as PIXI from "pixi.js";
import {Container, Graphics, useTick} from "@pixi/react";
import "@pixi/math-extras";
import {useRecoilValue} from "recoil";
// game
import Sprite from "game/entities/sprites";
// core
import Entity from "core/models/entities/Entity";
import UnitModel from "core/models/entities/UnitModel";
// state
import {mapCursorCoordinatesState} from "state/cursor";
import {showSelectionState, startSelectionCoordinatesState} from "state/selection";

type EntityOnMapProps = PropsWithChildren<{
    model: Entity
}>

const EntityOnMap = memo<EntityOnMapProps>(({model}) => {
    const [currentPosition, setCurrentPosition] = useState(model.currentPosition)
    const [currentRotation, setCurrentRotation] = useState<number>((model as UnitModel)?.currentRotation)

    useTick(() => {
        if (model instanceof UnitModel) {
            model.rotate()
            model.move()
            setCurrentPosition(model.currentPosition)
            setCurrentRotation((model as UnitModel)?.currentRotation)
        }
    })

    const [isSelected, setSelected] = useState(false)

    const showSelection = useRecoilValue(showSelectionState)
    const [cursorX, cursorY] = useRecoilValue(mapCursorCoordinatesState)
    const [startSelectionX, startSelectionY] = useRecoilValue(startSelectionCoordinatesState)

    useMemo<boolean>(() => {
        if (!showSelection) {
            return false
        }

        const minX = Math.min(cursorX, startSelectionX)
        const maxX = Math.max(cursorX, startSelectionX)
        const minY = Math.min(cursorY, startSelectionY)
        const maxY = Math.max(cursorY, startSelectionY)

        const result =  (model.currentPosition.x > minX && model.currentPosition.x < maxX)
            && (model.currentPosition.y > minY && model.currentPosition.y < maxY)

        setSelected(result)

        return result
    }, [showSelection, cursorX, cursorY, startSelectionX, startSelectionY, model])

    const clickHandler = useCallback(() => {
        if (!isSelected) {
            setSelected(true)
        }
    }, [isSelected])

    const draw = useCallback((g: PIXI.Graphics) => {
        g.clear()
        if (!isSelected) {
            return
        }

        // observation
        g.beginFill("#FFCB00FF", 0);
        g.lineStyle(1, "#ffcb00")
        g.drawCircle(model.sizeInPixels/2, model.sizeInPixels/2, model.observationRadiusInPixels);
        g.endFill();

        // attack
        g.beginFill("#f00", 0);
        g.lineStyle(1, "#f00")
        g.drawCircle(model.sizeInPixels/2, model.sizeInPixels/2, model.attackRadiusInPixels);
        g.endFill();

        // collider
        g.beginFill("#fff", 0);
        g.lineStyle(1, "#fff")
        g.drawRect(0, 0, model.sizeInPixels, model.sizeInPixels)
        g.endFill();

        // hitbox
        g.beginFill("#002aff", 0);
        g.lineStyle(1, "#002aff")
        g.drawRect(0, 0, model.sizeInPixels, model.sizeInPixels)
        g.endFill();

        //
        g.beginFill("#b700ff", 1);
        g.lineStyle(0, "#fff")
        g.drawRect((model.sizeInPixels/2)-2, model.sizeInPixels, 1, model.attackRadiusInPixels-(model.sizeInPixels/2))
        g.endFill();

    }, [model, isSelected])

    const drawHealthBar = useCallback((g: PIXI.Graphics) => {
        g.clear()
        if (!isSelected) {
            return
        }

        // bg
        g.beginFill("#000000", 1);
        g.drawRect(0, model.sizeInPixels+3, model.sizeInPixels, 5)
        g.endFill();

        // health
        g.beginFill("#14ff00", 1);
        g.drawRect(0, model.sizeInPixels+3, (model.health * model.sizeInPixels)/ model.initialHealth, 5)
        g.endFill();

    }, [model, isSelected])

    return (
        <Container x={currentPosition.x} y={currentPosition.y} eventMode="dynamic" onclick={clickHandler}>
            <Container angle={currentRotation} pivot={.5}>
                <Sprite type={model.type}
                        x={0}
                        y={0}
                        anchor={.5}
                        width={model.sizeInPixels}
                        height={model.sizeInPixels}/>
                <Graphics x={-model.sizeInPixels/2} y={-model.sizeInPixels/2} anchor={.5} draw={draw}/>
            </Container>

            <Graphics x={-model.sizeInPixels/2} y={-model.sizeInPixels/2} anchor={.5} draw={drawHealthBar}/>
        </Container>
    )
})

EntityOnMap.displayName = 'EntityOnMap'

export default EntityOnMap