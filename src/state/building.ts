import {atom, selector} from "recoil";
import {MAP_SIZE, TILE_SIZE, TileTypeEnum} from "core/enums/tile";
import {BUILDING_TO_OBJECT} from "../core/mappers/building";
import {BuildingBuilder} from "../core/models/BuildingBuilder";
import {mapCursorCoordinatesState, tileCursorCoordinatesSelector} from "./cursor";
import {mapState} from "./map";

export const currentBuildingChosenToBuildState = atom<null|TileTypeEnum>({
    key: "currentBuildingChosenToBuildState",
    default: null
})

export const currentBuildingChosenToBuildObjectSelector = selector<BuildingBuilder>({
    key: "currentBuildingChosenToBuildObjectSelector",
    get: ({get}) => {
        return BUILDING_TO_OBJECT.get(get(currentBuildingChosenToBuildState))
            ?? BuildingBuilder.dummy()
    }
})

export const currentBuildingChosenToBuildBottomRightCoordsSelector = selector({
    key: "currentBuildingChosenToBuildBottomRightCoordsSelector",
    get: ({get}) => {
        const [x, y] = get(mapCursorCoordinatesState)
        const buildingObject = get(currentBuildingChosenToBuildObjectSelector)


        const localX = (x+TILE_SIZE*buildingObject.size) - TILE_SIZE/2
        const localY = (y+TILE_SIZE*buildingObject.size) - TILE_SIZE/2

        return [localX, localY]
    }
})

export const currentBuildingChosenToBuildTopLeftCoordsSelector = selector({
    key: "currentBuildingChosenToBuildTopLeftCoordsSelector",
    get: ({get}) => {
        const [x, y] = get(mapCursorCoordinatesState)
        const localX = x - TILE_SIZE/2
        const localY = y - TILE_SIZE/2

        return [localX, localY]
    }
})

export const currentBuildingChosenToBuildCanPlaceSelector = selector<boolean>({
    key: "currentBuildingChosenToBuild/CanPlace",
    get: ({get}) => {
        const map = get(mapState)
        const buildingObject = get(currentBuildingChosenToBuildObjectSelector)
        const [tileX, tileY] = get(tileCursorCoordinatesSelector)
        const [bottomRightX, bottomRightY] = get(currentBuildingChosenToBuildBottomRightCoordsSelector)
        const [topLeftX,topLeftY] = get(currentBuildingChosenToBuildTopLeftCoordsSelector)

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