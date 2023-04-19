import {Field} from "../types/models";
import TileModel from "./TileModel";
import {randomInt} from "../helpers/randomness";
import {TileTypeEnum} from "../enums/tile";

class TerrainModel {
    private field: Field = []
    private readonly size: number;

    constructor(size: number = 8) {
        this.size = size;
    }

    get terrain() {
        return this.field
    }

    public init(): TerrainModel {
        const field: Field = [];

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (!field[y]) {
                    field[y] = []
                }
                field[y][x] = new TileModel()
            }
        }

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
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

    public collapse(type?: TileTypeEnum): TerrainModel {
        const x = randomInt(this.size)
        const y = randomInt(this.size)

        const model = this.field[y][x]

        model.collapse()

        return this
    }
}

export default TerrainModel