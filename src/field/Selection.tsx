import {ForwardedRef, forwardRef, memo, useCallback} from "react";
import {Graphics} from "@pixi/react";

type SelectionProps = {
    startX?: number
    startY?: number
    endX?: number
    endY?: number
    onSelection?: () => void
}

const Selection = memo(
    forwardRef((props: SelectionProps, ref: ForwardedRef<any>) => {
        const {
            startX = 0,
            startY = 0,
            endX = 0,
            endY = 0,
        } = props

        const realStartX = Math.min(startX, endX)
        const realStartY = Math.min(startY, endY)

        const selectWidth = Math.abs(startX - endX);
        const selectHeight = Math.abs(startY - endY);

        const draw = useCallback((g: any) => {
            g.clear();
            g.lineStyle(2, "#215891", .3);
            g.beginFill("#3a98fa", .3);
            g.drawRect(0, 0, selectWidth, selectHeight);
            g.endFill()
        }, [selectWidth, selectHeight]);

        return <Graphics x={realStartX} y={realStartY} draw={draw}/>
    })
)

Selection.displayName = 'Selection'

export default Selection