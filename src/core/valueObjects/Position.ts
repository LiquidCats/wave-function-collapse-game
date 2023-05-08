import {MAP_SIZE} from "core/enums/tile";

export default class Position {
    constructor(public readonly x: number, public readonly y: number) {
    }

    gameToAxis(): Position {
        return new Position(this.x, MAP_SIZE - this.y)
    }
    axisToGame(): Position {
        return new Position(this.x,  Math.abs(this.y - MAP_SIZE))
    }
}