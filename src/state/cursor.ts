import {atom, selector} from "recoil";
import {TILE_SIZE} from "core/enums/tile";

export const mapCursorCoordinatesState = atom<[number, number]>({
    key: 'mapCursorCoordinatesState',
    default: [0,0]
})
export const tileCursorCoordinatesSelector = selector<[number, number]>({
    key: 'tileCursorCoordinatesSelector',
    get: ({get}) => {
        const [x, y] = get(mapCursorCoordinatesState)

        return [Math.floor(x/TILE_SIZE), Math.floor(y/TILE_SIZE)]
    }
})
