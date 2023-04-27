import React, {ForwardedRef, forwardRef, memo} from "react";
import {Sprite} from "@pixi/react";
//
import {TileTypeEnum} from "core/enums/tile";
import {TILE_TO_SPRITE} from "core/mappers/tile";

type TileProps = {
    type: TileTypeEnum
    size: number
    x: number
    y: number
}

const Tile = memo(
    forwardRef((props: TileProps, ref: ForwardedRef<any>) => {
        const {
            x,
            y,
            size,
            type,
        } = props

        return <Sprite ref={ref}
                       image={TILE_TO_SPRITE.get(type)}
                       x={x}
                       y={y}
                       anchor={0}
                       cullable={true}
                       width={size}
                       height={size}/>
    })
)

Tile.displayName = 'Tile'

export default Tile