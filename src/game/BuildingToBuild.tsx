import React, {ForwardedRef, forwardRef, memo, useMemo} from "react";
import {useRecoilValue} from "recoil";
import {Sprite} from "@pixi/react";
//
import {TILE_SIZE} from "core/enums/tile";
import {TILE_TO_SPRITE} from "core/mappers/tile";
//
import {mapCursorCoordinatesState} from "state/cursor";
import {
    currentBuildingChosenToBuildCanPlaceSelector, currentBuildingChosenToBuildObjectSelector,
    currentBuildingChosenToBuildState
} from "state/building";

type BuildingToBuildProps = {
}

const TINT_RED = "#ffc8c8"
const TINT_GREEN = "#80ff80"

/* eslint-disable */
const BuildingToBuild = memo(
    forwardRef((props: BuildingToBuildProps, ref: ForwardedRef<any>) => {
        const buildingObject = useRecoilValue(currentBuildingChosenToBuildObjectSelector)
        const canPlace = useRecoilValue(currentBuildingChosenToBuildCanPlaceSelector)
        const currentBuildingChosenToBuild = useRecoilValue(currentBuildingChosenToBuildState)

        const [x,y] = useRecoilValue(mapCursorCoordinatesState)
        const anchor = useMemo(() => 1/(buildingObject.size*buildingObject.size), [buildingObject.size])

        if (null === currentBuildingChosenToBuild) {
            return null
        }

        return <Sprite ref={ref}
                       eventMode="dynamic"
                       image={TILE_TO_SPRITE.get(currentBuildingChosenToBuild)}
                       x={x}
                       y={y}
                       tint={canPlace ? TINT_GREEN : TINT_RED}
                       anchor={anchor}
                       alpha={.8}
                       cullable={true}
                       width={buildingObject.size * TILE_SIZE}
                       height={buildingObject.size * TILE_SIZE}/>
    })
)

BuildingToBuild.displayName = 'BuildingToBuild'

export default BuildingToBuild