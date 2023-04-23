import {TileTypeEnum} from "../enums/tile";


const TYPE_TO_NUMBER = (new Map())
    .set(TileTypeEnum.GRASS, 0)
    .set(TileTypeEnum.TREES, 1)
    .set(TileTypeEnum.BUSHES, 2)
    .set(TileTypeEnum.SAND, 3)
    .set(TileTypeEnum.WATER, 4)

const NUMBER_TO_TYPE = (new Map())
    .set(0, TileTypeEnum.GRASS)
    .set(1, TileTypeEnum.TREES)
    .set(2, TileTypeEnum.BUSHES)
    .set(3, TileTypeEnum.SAND)
    .set(4, TileTypeEnum.WATER)

class TerrainCompressor {
    public static decompress(compressed: string): TileTypeEnum[][] {
        const decompressed: TileTypeEnum[][] = []
        const compressedRows = compressed.split(';')

        for (let i = 0; i < compressedRows.length; i++) {
            const compressedRow = compressedRows[i]
            const compressedTiles = compressedRow.split(',')

            decompressed[i] = []

            for (const compressedTile of compressedTiles) {
                const [numericTile, repeats] = compressedTile.split(':')
                const tile: TileTypeEnum = NUMBER_TO_TYPE.get(Number(numericTile))


                let restored: TileTypeEnum[] = []
                for (let j = 0; j < Number(repeats); j++) {
                    restored.push(tile)
                }

                decompressed[i].push(...restored)
            }
        }

        return decompressed
    }

    public static compress(flatField: TileTypeEnum[][]): string {
        // compressed <type>:<repeats>,...;<type>:<repeats>,...;...
        let compressed = '';

        for (let i = 0; i < flatField.length; i++) {
            const row = flatField[i]

            const compressedArray: number[][] = [];
            let currentTile = row[0];
            let count = 1;

            for (let i = 1; i < row.length; i++) {
                if (row[i] === currentTile) {
                    count++;
                } else {
                    compressedArray.push([TYPE_TO_NUMBER.get(currentTile), count]);
                    currentTile = row[i];
                    count = 1;
                }
            }

            compressedArray.push([TYPE_TO_NUMBER.get(currentTile), count]);
            if (compressed.length > 0) {
                compressed += ';'
            }
            compressed += compressedArray.map(r => r.join(':')).join(',')
        }

        return compressed
    }
}

export default TerrainCompressor