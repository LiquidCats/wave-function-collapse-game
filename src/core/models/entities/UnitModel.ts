import Position from "core/valueObjects/Position";
import Entity from "core/models/entities/Entity";
import {Rotatable, RotationDirection} from "core/models/entities/types";
import {EntityTypeEnum} from "core/enums/entity";
import PositionModel from "../PositionModel";


enum UnitStates {
    standing,
    moving,
    rotating,
    attacking,
}

export default class UnitModel extends Entity implements Rotatable {
    protected _startRotation: number = 0
    protected _currentRotation: number = 0
    protected _endRotation?: number
    protected _startPosition: Position = new Position(0,0)
    protected _endPosition?: Position
    protected _movementSpeed: number = 1
    protected _rotationSpeed: number = 0.5
    protected readonly _positionModel: PositionModel
    protected _currentState: UnitStates = UnitStates.standing

    constructor(protected _type: EntityTypeEnum|null = null) {
        super(_type)

        this._positionModel = new PositionModel()
    }

    get currentRotation() {
        return this._currentRotation
    }

    get startRotation(): number {
        return this._startRotation;
    }

    get endRotation(): number|undefined {
        return this._endRotation;
    }

    get startPosition(): Position {
        return this._startPosition;
    }

    get endPosition(): Position|undefined {
        return this._endPosition;
    }

    public setMovementSpeed(value: number): Entity {
        this._movementSpeed = value

        return this
    }

    public placeOnMap(position: Position): Entity {
        this._currentPosition = position
        this._startPosition = position

        this._currentRotation = 0
        this._startRotation = 0

        return this
    }

    public setDestinationPosition(position: Position): Entity {
        this._endPosition = position

        const aimPoint = this._positionModel.aimPosition(this.startPosition, this.attackRadiusInPixels, this.startRotation)

        const rotationAngle = this._positionModel.rotationAngle(this.startPosition, position, aimPoint)
        const rotationDirection = this._positionModel.rotationDiction(this.startPosition, position, aimPoint)

        const endAngle = this.startRotation + (rotationDirection * rotationAngle)
        this._endRotation = Math.round((endAngle + Number.EPSILON) * 1000) / 1000

        return this
    }

    public rotate() {
        if (!(this._currentState === UnitStates.standing || this._currentState === UnitStates.rotating)) {
            return
        }
        if (!this.endPosition) {
            return
        }

        if (!this.endRotation) {
            return
        }

        const aimPoint = this._positionModel.aimPosition(this.startPosition, this.attackRadiusInPixels, this.startRotation)
        const rotationDirection = this._positionModel.rotationDiction(this.startPosition, this.endPosition, aimPoint)

        if (this.shouldStopRotation(rotationDirection)) {
            this.stopRotation()
            return;
        }

        const endAngle = this._currentRotation + (rotationDirection * this._rotationSpeed)
        this._currentRotation = Math.round((endAngle + Number.EPSILON) * 1000) / 1000
        this._currentState = UnitStates.rotating
    }

    protected shouldStopRotation(rotationDirection: RotationDirection): boolean {
        if (!this.endRotation) {
            return true
        }

        if (0 === rotationDirection) {
            return true
        }

        if (1 === rotationDirection) {
            return this.currentRotation >= this.endRotation
        }

        if (-1 === rotationDirection) {
            return this.currentRotation <= this.endRotation
        }

        return true
    }

    protected stopRotation() {
        this._endRotation = undefined
        this._startRotation = this._currentRotation
        this._currentState = UnitStates.standing

        return
    }

    public move() {
        if (!(this._currentState === UnitStates.standing || this._currentState === UnitStates.moving)) {
            return
        }
        if (!this.endPosition) {
            return
        }

        const distanceX = this.endPosition.x - this.currentPosition.x;
        const distanceY = this.endPosition.y - this.currentPosition.y;
        const angle = Math.atan2(distanceY, distanceX);

        const velocityX = Math.cos(angle) * this._movementSpeed;
        const velocityY = Math.sin(angle) * this._movementSpeed;

        this._currentPosition = new Position(
            this.currentPosition.x + velocityX,
            this.currentPosition.y + velocityY,
        )

        if (this.shouldStopMovement(velocityX, velocityY)) {
            this.stopMovement()
        }
    }

    protected shouldStopMovement(velocityX: number, velocityY: number): boolean {
        if (!this.endPosition) {
            return false
        }
        // Check if the object has reached (or passed) the target coordinates
        const shouldStopX = (velocityX > 0 && this.currentPosition.x >= this.endPosition?.x) || (velocityX < 0 && this.currentPosition.x <= this.endPosition?.x)
        const shouldStopY = (velocityY > 0 && this.currentPosition.y >= this.endPosition?.y) || (velocityY < 0 && this.currentPosition.y <= this.endPosition?.y)

        return shouldStopX || shouldStopY
    }

    protected stopMovement() {
        if (!this.endPosition) {
            return
        }

        this._currentPosition = new Position(this.endPosition.x, this.endPosition.y)
        this._startPosition = new Position(this.endPosition.x, this.endPosition.y)
        this._endPosition = undefined

        this._currentState = UnitStates.standing
    }
}