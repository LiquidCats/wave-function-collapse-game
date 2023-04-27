import {atom, selector} from "recoil";
import {MAP_SIZE, TILE_SIZE} from "core/enums/tile";
import {ENTITY_TO_OBJECT} from "core/mappers/entity";
import {EntityBuilder} from "core/models/EntityBuilder";
import {mapCursorCoordinatesState, tileCursorCoordinatesSelector} from "state/cursor";
import {mapState} from "state/map";
import {EntityTypeEnum} from "core/enums/entity";

export const entityToPlaceState = atom<null|EntityTypeEnum>({
    key: "entityToPlaceState",
    default: null
})

export const entityToPlaceObjectSelector = selector<EntityBuilder>({
    key: "entityToPlaceObjectSelector",
    get: ({get}) => {
        const entityType = get(entityToPlaceState)
        if (entityType) {
            return ENTITY_TO_OBJECT.get(entityType)
                ?? EntityBuilder.dummy()
        }

        return EntityBuilder.dummy()
    }
})

export const entityToPlaceBottomRightCoordsSelector = selector({
    key: "entityToPlaceBottomRightCoordsSelector",
    get: ({get}) => {
        const [x, y] = get(mapCursorCoordinatesState)
        const buildingObject = get(entityToPlaceObjectSelector)


        const localX = (x+TILE_SIZE*buildingObject.size) - TILE_SIZE/2
        const localY = (y+TILE_SIZE*buildingObject.size) - TILE_SIZE/2

        return [localX, localY]
    }
})

export const entityToPlaceTopLeftCoordsSelector = selector({
    key: "entityToPlaceTopLeftCoordsSelector",
    get: ({get}) => {
        const [x, y] = get(mapCursorCoordinatesState)
        const localX = x - TILE_SIZE/2
        const localY = y - TILE_SIZE/2

        return [localX, localY]
    }
})

export const entityToPlaceCanPlaceSelector = selector<boolean>({
    key: "currentBuildingChosenToBuild/CanPlace",
    get: ({get}) => {
        const map = get(mapState)
        const buildingObject = get(entityToPlaceObjectSelector)
        const [tileX, tileY] = get(tileCursorCoordinatesSelector)
        const [bottomRightX, bottomRightY] = get(entityToPlaceBottomRightCoordsSelector)
        const [topLeftX,topLeftY] = get(entityToPlaceTopLeftCoordsSelector)

        if (topLeftX < 0 || topLeftY < 0 || bottomRightX > MAP_SIZE || bottomRightY > MAP_SIZE) {
            return false
        }

        for (let i = tileY; i < tileY+buildingObject.size; i++) {
            for (let j = tileX; j < tileX+buildingObject.size; j++) {
                const tile = map[i][j]

                if (!buildingObject.canBePlacedOn.includes(tile)) {
                    return false
                }
            }
        }

        return true
    }
})