import React, {ForwardedRef, forwardRef, memo, useCallback, useState} from "react";
import {Sprite} from "@pixi/react";
//
import {TileTypeEnum} from "core/enums/tile";
//
import grass from "assets/images/sprites/tiles/grass.png";
import trees from "assets/images/sprites/tiles/trees.png";
import bushes from "assets/images/sprites/tiles/bushes.png";
import sand from "assets/images/sprites/tiles/sand.png";
import water from "assets/images/sprites/tiles/water.png";

type TileProps = {
    type: TileTypeEnum
    size: number
    x: number
    y: number
    selected?: boolean
}

const TILE_TO_SPRITE = (new Map())
    .set(TileTypeEnum.GRASS, grass)
    .set(TileTypeEnum.TREES, trees)
    .set(TileTypeEnum.BUSHES, bushes)
    .set(TileTypeEnum.SAND, sand)
    .set(TileTypeEnum.WATER, water)

const Tile = memo(
    forwardRef((props: TileProps, ref: ForwardedRef<any>) => {
        const {
            x,
            y,
            size,
            type,
            selected = false
        } = props

        // const [hovered, setHovered] = useState(false)

        // const mouseoverHandler = useCallback((e: any) => {
        //     setHovered(true)
        // }, [])
        // const mouseleaveHandler = useCallback((e: any) => {
        //     setHovered(false)
        // }, [])

        return <Sprite
            ref={ref}
            image={TILE_TO_SPRITE.get(type)}
            x={x}
            y={y}
            anchor={0.5}
            width={size}
            height={size}
        />
    })
)

Tile.displayName = 'Tile'

export default Tile