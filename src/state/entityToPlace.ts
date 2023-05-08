import {atom, selector} from "recoil";
import {MAP_SIZE, TILE_SIZE} from "core/enums/tile";
import {ENTITY_TO_OBJECT} from "core/mappers/entity";
import {mapCursorCoordinatesState, tileCursorCoordinatesSelector} from "state/cursor";
import {mapState} from "state/map";
import {EntityTypeEnum} from "core/enums/entity";
import Entity from "core/models/entities/Entity";
import StructureModel from "core/models/entities/StructureModel";

export const entityToPlaceState = atom<null|EntityTypeEnum>({
    key: "entityToPlaceState",
    default: null
})

export const entityToPlaceObjectSelector = selector<Entity|null>({
    key: "entityToPlaceObjectSelector",
    get: ({get}) => {
        const entityType = get(entityToPlaceState)
        if (!entityType) {
            return null
        }

        return ENTITY_TO_OBJECT.get(entityType)
            ?? null
    }
})

export const entityToPlaceBottomRightCoordsSelector = selector<[number, number]>({
    key: "entityToPlaceBottomRightCoordsSelector",
    get: ({get}) => {
        const [x, y] = get(mapCursorCoordinatesState)
        const buildingObject = get(entityToPlaceObjectSelector)
        if (!buildingObject) {
            return [0, 0]
        }

        const localX = (x + buildingObject.sizeInPixels) - TILE_SIZE/2
        const localY = (y + buildingObject.sizeInPixels) - TILE_SIZE/2

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
        if (!buildingObject) {
            return false
        }


        const [tileX, tileY] = get(tileCursorCoordinatesSelector)
        const [bottomRightX, bottomRightY] = get(entityToPlaceBottomRightCoordsSelector)
        const [topLeftX,topLeftY] = get(entityToPlaceTopLeftCoordsSelector)

        if (topLeftX < 0 || topLeftY < 0 || bottomRightX > MAP_SIZE || bottomRightY > MAP_SIZE) {
            return false
        }

        for (let i = tileY; i < tileY+ buildingObject.sizeInTiles; i++) {
            for (let j = tileX; j < tileX+ buildingObject.sizeInTiles; j++) {
                const tile = map[i][j]

                if (buildingObject instanceof StructureModel) {
                    if (!buildingObject?.canBePlacedOn?.includes(tile)) {
                        return false
                    }
                }

            }
        }

        return true
    }
})

// @TODO add checks and calculation not to place entities on entities
// @TODO add checks and calculation not to place structures close to structures