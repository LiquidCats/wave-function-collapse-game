import {Field} from "core/types/models";
import TileModel from "core/models/TileModel";
import {randomInt} from "core/helpers/randomness";
import {TileTypeEnum} from "core/enums/tile";

class TerrainModel {
    private field: Field
    private flatField: TileTypeEnum[][] = []

    constructor(field: TileTypeEnum[][] = []) {
        this.field = [];
        this.flatField = field
    }

    get terrain() {
        return this.flatField
    }

    public static restore(field: TileTypeEnum[][]): TerrainModel {
        return new TerrainModel(field)
    }

    public init(size: number = 8): TerrainModel {
        const field: Field = [];

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (!field[y]) {
                    field[y] = []
                }
                field[y][x] = new TileModel()
            }
        }

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const model = field[y][x]

                if (field[y-1] && field[y-1][x]) {
                    model.superposition.UP = field[y-1][x]
                }
                if (field[y] && field[y][x+1]) {
                    model.superposition.RIGHT = field[y][x+1]
                }
                if (field[y+1] && field[y+1][x]) {
                    model.superposition.DOWN = field[y+1][x]
                }
                if (field[y] && field[y][x-1]) {
                    model.superposition.LEFT = field[y][x-1]
                }
            }
        }

        this.field = field

        return this
    }

    public collapse(): TerrainModel {
        const x = randomInt(this.field.length)
        const y = randomInt(this.field.length)

        const model = this.field[y][x]

        model.collapse()

        this.flat()

        return this
    }

    public flat() {
        if (this.flatField.length === 0) {
            this.flatField = this.field.map(row => row.map(tile => tile.type))
            this.field = []
        }

        return this
    }
}

export default TerrainModel
