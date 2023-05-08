import Position from "core/valueObjects/Position";
import Entity from "core/models/entities/Entity";
import {Renderable} from "core/models/entities/types";
import {EntityTypeEnum} from "core/enums/entity";
import {ENTITY_TO_SPRITE} from "core/mappers/entity";

export default class UnitModel extends Entity implements Renderable {
    private readonly _texture: string;
    protected _startRotation: number = 0
    protected _currentRotation: number = 0
    protected _endRotation: number = 0
    protected _isMoving: boolean = false
    protected _startPosition: Position = new Position(0,0)
    protected _endPosition: Position = new Position(0,0)

    constructor(protected _type: EntityTypeEnum|null = null) {
        super(_type)

        this._texture = ""

        if (_type) {
            this._texture = ENTITY_TO_SPRITE.get(_type) ?? "unknown_texture.png"
        }
    }

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

    get texture(): string {
        return this._texture
    }

    public placeOnMap(position: Position): Entity {
        this._currentPosition = position
        this._startPosition = position

        this._currentRotation = 0
        this._startRotation = 0

        return this
    }
}