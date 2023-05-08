import {TileTypeEnum} from "core/enums/tile";
import Entity from "core/models/entities/Entity";
import Position from "core/valueObjects/Position";
import {Renderable} from "core/models/entities/types";
import {EntityTypeEnum} from "core/enums/entity";
import {ENTITY_TO_SPRITE} from "core/mappers/entity";

export default class StructureModel extends Entity implements Renderable {
    private readonly _texture: string;
    protected _canBePlacedOn: TileTypeEnum[] = [];
    protected _canBuildUnits: TileTypeEnum[] = [];

    constructor(protected _type: EntityTypeEnum|null = null) {
        super(_type)

        this._texture = ""

        if (_type) {
            this._texture = ENTITY_TO_SPRITE.get(_type) ?? "unknown_texture.png"
        }
    }
    get canBePlacedOn() {
        return this._canBePlacedOn
    }

    get canBuildUnits() {
        return this._canBuildUnits
    }

    get texture(): string {
        return this._texture
    }

    public addCanBePlacedOn(value: TileTypeEnum) {
        if (!this._canBePlacedOn.includes(value)) {
            this._canBePlacedOn.push(value)
        }

        return this
    }

    public addCanBuildUnits(value: TileTypeEnum) {
        if (!this._canBuildUnits.includes(value)) {
            this._canBuildUnits.push(value)
        }
        return this
    }

    public placeOnMap(position: Position): Entity {
        this._currentPosition = position

        return this
    }
}