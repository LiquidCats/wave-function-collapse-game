import {memo, useMemo} from "react";
import {TILE_SIZE, TileTypeEnum} from "core/enums/tile";
import Tile from "game/tiles/Tile";

type TileRowProps = {
    row?: TileTypeEnum[]
    tileY?: number
}

const TileRow = memo<TileRowProps>((props) => {
    const {row = [], tileY = 0} = props

    const y = useMemo(() => TILE_SIZE * tileY, [tileY]);

    return <>
        {
            row.map((tile: TileTypeEnum, tileX: number) => {
                const x = TILE_SIZE * tileX
                return <Tile key={`${tileY}-${tileX}`} y={y} x={x} size={TILE_SIZE} type={tile}/>
            })
        }
    </>
})

TileRow.displayName = 'TileRow'

export default TileRow