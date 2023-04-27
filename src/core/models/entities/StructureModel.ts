import {TileTypeEnum} from "core/enums/tile";
import Entity from "core/models/entities/Entity";
import {Position} from "core/models/entities/types";
import UnitModel from "./UnitModel";

export default class StructureModel extends Entity {
    protected _canBePlacedOn: TileTypeEnum[] = [];
    protected _canBuildUnits: TileTypeEnum[] = [];

    get canBePlacedOn() {
        return this._canBePlacedOn
    }

    get canBuildUnits() {
        return this._canBuildUnits
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