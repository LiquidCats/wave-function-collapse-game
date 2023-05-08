import {memo, useCallback, useMemo} from "react";
import * as PIXI from "pixi.js";
import "@pixi/math-extras";
import {Container, Graphics, Sprite, useTick} from "@pixi/react";
import Entity from "core/models/entities/Entity";
import UnitModel from "core/models/entities/UnitModel";
import {Renderable} from "core/models/entities/types";

type EntityOnMapProps = {
    model: Entity & Renderable
}

const EntityOnMap = memo<EntityOnMapProps>(({model}) => {
    useTick(() => {
    })

    const draw = useCallback((g: PIXI.Graphics) => {
        g.clear()

        // observation
        g.beginFill("#FFCB00FF", 0);
        g.lineStyle(2, "#ffcb00")
        g.drawCircle(model.sizeInPixels/2, model.sizeInPixels/2, model.observationRadiusInPixels);
        g.endFill();

        // attack
        g.beginFill("#f00", 0);
        g.lineStyle(2, "#f00")
        g.drawCircle(model.sizeInPixels/2, model.sizeInPixels/2, model.attackRadiusInPixels);
        g.endFill();

        // collider
        g.beginFill("#fff", 0);
        g.lineStyle(2, "#fff")
        g.drawRect(0, 0, model.sizeInPixels, model.sizeInPixels)
        g.endFill();

        // hitbox
        g.beginFill("#002aff", 0);
        g.lineStyle(2, "#002aff")
        g.drawRect(0, 0, model.sizeInPixels, model.sizeInPixels)
        g.endFill();

        //
        g.beginFill("#fff", 0.25);
        g.drawRect((model.sizeInPixels/2)-2, model.sizeInPixels, 2, model.attackRadiusInPixels)
        g.endFill();

    }, [model])

    const drawHealthBar = useCallback((g: PIXI.Graphics) => {
        g.clear()

        // bg
        g.beginFill("#000000", 1);
        g.drawRect(0, model.sizeInPixels+3, 32, 5)
        g.endFill();

        // health
        g.beginFill("#14ff00", 1);
        g.drawRect(0, model.sizeInPixels+3, (model.health * 32)/ model.initialHealth, 5)
        g.endFill();

    }, [model])

    const currentRotation = useMemo<number>(() => {
        if (!(model instanceof UnitModel)) {
            return 0
        }

        return model.currentRotation
    }, [model])

    return (
        <Container x={model.currentPosition.x} y={model.currentPosition.y}>
            <Container angle={currentRotation} pivot={.5}>
                <Sprite x={0}
                        y={0}
                        anchor={.5}
                        image={model.texture}
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