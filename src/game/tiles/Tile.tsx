import React, {ForwardedRef, forwardRef, memo, useCallback, useMemo, useState} from "react";
import {Sprite} from "@pixi/react";
//
import {TileTypeEnum} from "core/enums/tile";
import {INTERACTIVE_TILES, TILE_TO_SPRITE} from "core/mappers/tile";

type TileProps = {
    type: TileTypeEnum
    size: number
    x: number
    y: number
    anchor?: number
    alpha?: number
    selected?: boolean
}

const Tile = memo(
    forwardRef((props: TileProps, ref: ForwardedRef<any>) => {
        const {
            x,
            y,
            size,
            type,
            selected = false,
            anchor = 0,
            alpha = 1,
        } = props

        const [isSelected, setSelected] = useState(selected)

        const isInteractive = useMemo(() => INTERACTIVE_TILES.has(type), [type])
        const mousedownHandler = useCallback(() => {
            setSelected(!isSelected)

        }, [isSelected])

        return <Sprite ref={ref}
                       onmousedown={mousedownHandler}
                       image={TILE_TO_SPRITE.get(type)}
                       tint={isSelected ? "#cecece" : "#fff"}
                       x={x}
                       y={y}
                       eventMode={isInteractive ? "dynamic" : "none"}
                       anchor={anchor}
                       alpha={alpha}
                       cullable={true}
                       width={size}
                       height={size}/>
    })
)

Tile.displayName = 'Tile'

export default Tile