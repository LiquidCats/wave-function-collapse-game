import {ForwardedRef, forwardRef, memo, useCallback, useMemo} from "react";
import {Graphics} from "@pixi/react";
import {useRecoilValue} from "recoil";
//
import {mapCursorCoordinatesState} from "state/cursor";
import {
    maxSelectionHeightSelector,
    maxSelectionWidthSelector,
    selectionCursorDeltaXSelector,
    selectionCursorDeltaYSelector,
    showSelectionState,
    startSelectionCoordinatesState
} from "state/selection";

type SelectionProps = {
}

const Selection = memo(
    forwardRef((props: SelectionProps, ref: ForwardedRef<any>) => {
        const showSelection = useRecoilValue(showSelectionState)
        const [startX, startY] = useRecoilValue(startSelectionCoordinatesState)
        const [endX, endY] = useRecoilValue(mapCursorCoordinatesState)
        const deltaX = useRecoilValue(selectionCursorDeltaXSelector)
        const deltaY = useRecoilValue(selectionCursorDeltaYSelector)
        const maxWidth = useRecoilValue(maxSelectionWidthSelector)
        const maxHeight = useRecoilValue(maxSelectionHeightSelector)

        const minX = useMemo(() => {
            const value = Math.min(startX, endX)
            return value > 0 ? value : 0
        }, [startX, endX])

        const minY = useMemo(() => {
            const value = Math.min(startY, endY)
            return value > 0 ? value : 0
        }, [startY, endY])

        const selectWidth = useMemo(() => {
            const selectWidth =  Math.abs(startX - endX)

            return selectWidth >= maxWidth ? maxWidth : selectWidth;
        }, [startX, endX, maxWidth]);

        const selectHeight = useMemo(() => {
            const selectHeight =  Math.abs(startY - endY)

            return selectHeight >= maxHeight ? maxHeight : selectHeight;
        }, [startY, endY, maxHeight]);

        const draw = useCallback((g: any) => {
            g.clear();
            if (deltaX === 0 && deltaY === 0) {
                return
            }
            g.lineStyle(2, "#215891", .3);
            g.beginFill("#3a98fa", .3);
            g.drawRect(0, 0, selectWidth, selectHeight);
            g.endFill()
        }, [selectWidth, selectHeight, deltaX, deltaY]);

        if (showSelection) {
            return <Graphics x={minX} y={minY} draw={draw} ref={ref}/>
        }

        return null
    })
)

Selection.displayName = 'Selection'

export default Selection