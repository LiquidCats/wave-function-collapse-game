import {Position} from "core/models/entities/types";
import Entity from "core/models/entities/Entity";
import {EntityTypeEnum} from "../../enums/entity";

export default class UnitModel extends Entity {
    protected _startRotation: number = 0
    protected _currentRotation: number = 0
    protected _endRotation: number = 0
    protected _isMoving: boolean = false
    protected _startPosition: Position = {x: 0, y: 0}
    protected _endPosition: Position = {x: 0, y: 0}

    get currentRotation() {
        return this._currentRotation
    }

    get startRotation(): number {
        return this._startRotation;
    }

    get endRotation(): number {
        return this._endRotation;
    }

    get startPosition(): Position {
        return this._startPosition;
    }

    get endPosition(): Position {
        return this._endPosition;
    }

    get isMoving(): boolean {
        return this._isMoving;
    }

    public placeOnMap(position: Position): Entity {
        this._currentPosition = position
        this._startPosition = position

        this._currentRotation = 0
        this._startRotation = 0

        return this
    }
}