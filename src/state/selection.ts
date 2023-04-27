import {atom, selector} from "recoil";
import {mapCursorCoordinatesState} from "state/cursor";
import {MAP_SIZE} from "core/enums/tile";

export const startSelectionCoordinatesState = atom<[number, number]>({
    key: 'startSelectionCoordinatesState',
    default: [0,0]
})
export const showSelectionState = atom<boolean>({
    key: 'showSelectionState',
    default: false
})
export const selectionCursorDeltaXSelector = selector({
    key: "cursorDeltaXSelector",
    get: ({get}) =>  {
        const [endX] = get(mapCursorCoordinatesState)
        const [startX] = get(startSelectionCoordinatesState)

        if (startX === endX) return 0
        if (startX > endX) return -1
        if (startX < endX) return 1
    }
})
export const selectionCursorDeltaYSelector = selector({
    key: "cursorDeltaYSelector",
    get: ({get}) =>  {
        const [,endY] = get(mapCursorCoordinatesState)
        const [,startY] = get(startSelectionCoordinatesState)

        if (startY === endY) return 0
        if (startY > endY) return -1
        if (startY < endY) return 1
    }
})
export const maxSelectionWidthSelector = selector({
    key: "maxSelectionWidth",
    get: ({get}) => {
        const deltaX = get(selectionCursorDeltaXSelector)
        const [startX] = get(startSelectionCoordinatesState)
        return deltaX === 1
            ? MAP_SIZE-startX
            : deltaX === -1
                ? startX
                : 0
    }
})
export const maxSelectionHeightSelector = selector({
    key: "maxSelectionHeight",
    get: ({get}) => {
        const deltaY = get(selectionCursorDeltaYSelector)
        const [,startY] = get(startSelectionCoordinatesState)
        return deltaY === 1
            ? MAP_SIZE-startY
            : deltaY === -1
                ? startY
                : 0
    }
})