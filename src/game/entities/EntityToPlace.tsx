import React, {ForwardedRef, forwardRef, memo, useMemo} from "react";
import {useRecoilValue} from "recoil";
import {Sprite} from "@pixi/react";
//
import {TILE_SIZE} from "core/enums/tile";
//
import {tileCursorCoordinatesSelector} from "state/cursor";
import {
    entityToPlaceCanPlaceSelector, entityToPlaceObjectSelector,
    entityToPlaceState
} from "state/entityToPlace";
import {ENTITY_TO_SPRITE} from "core/mappers/entity";

type BuildingToBuildProps = {
}

const TINT_RED = "#ffc8c8"
const TINT_GREEN = "#80ff80"

const EntityToPlace = memo(
    forwardRef((props: BuildingToBuildProps, ref: ForwardedRef<any>) => {
        const buildingObject = useRecoilValue(entityToPlaceObjectSelector)
        const canPlace = useRecoilValue(entityToPlaceCanPlaceSelector)
        const currentBuildingChosenToBuild = useRecoilValue(entityToPlaceState)

        const [tileX,tileY] = useRecoilValue(tileCursorCoordinatesSelector)

        const x = useMemo(() => tileX * TILE_SIZE, [tileX])
        const y = useMemo(() => tileY * TILE_SIZE, [tileY])

        if (null === currentBuildingChosenToBuild) {
            return null
        }

        return <Sprite ref={ref}
                       eventMode="dynamic"
                       image={ENTITY_TO_SPRITE.get(currentBuildingChosenToBuild)}
                       x={x}
                       y={y}
                       tint={canPlace ? TINT_GREEN : TINT_RED}
                       anchor={0}
                       alpha={.8}
                       cullable={true}
                       width={buildingObject.size * TILE_SIZE}
                       height={buildingObject.size * TILE_SIZE}/>
    })
)

EntityToPlace.displayName = 'BuildingToBuild'

export default EntityToPlace