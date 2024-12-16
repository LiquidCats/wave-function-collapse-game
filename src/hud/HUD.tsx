import {memo, useCallback} from 'react'
import {useSetRecoilState} from "recoil";
import {Graphics as IGraphics} from "pixi.js";
import {Container, Graphics, Sprite} from "@pixi/react";
// core
import {EntityTypeEnum} from "core/enums/entity";
import {ENTITY_TO_SPRITE} from "core/mappers/entity";
import {TILE_SIZE} from "core/enums/tile";
//state
import {entityToPlaceState} from "state/entityToPlace";

type HUDProps = {
    width: number
    height: number
    y: number
}

const HUD = memo<HUDProps>((props) => {
    const {height, width, y} = props

    const setCurrentBuildingChosenToBuild = useSetRecoilState(entityToPlaceState)
    const buildingCreationHandler = useCallback((type: EntityTypeEnum) => () => {
        setCurrentBuildingChosenToBuild(type)
    }, [])

    const drawHUDBackground = useCallback((g: IGraphics) => {
        g.clear()
        g.beginFill("#fff")
        g.drawRect(0, 0, width, height);
        g.endFill()
    }, [width, height])

    return <>
        <Container width={width} height={height} y={y}>
            <Graphics draw={drawHUDBackground}/>
            <Sprite x={10}
                    y={10}
                    eventMode="dynamic"
                    onmouseup={buildingCreationHandler(EntityTypeEnum.BASE_STRUCTURE)}
                    image={ENTITY_TO_SPRITE.get(EntityTypeEnum.BASE_STRUCTURE)}
                    height={TILE_SIZE}
                    width={TILE_SIZE}/>
        </Container>
    </>
})

HUD.displayName = "HUD"

export default HUD