import {TileTypeEnum} from "../enums/tile";

export class BuildingBuilder {
    private _buildingEnergyCost: number = 0;
    private _energyConsumption: number = 0;
    private _energyProduction: number = 0;
    private _size: number = 1;
    private _canBePlacedOn: TileTypeEnum[] = [];

    constructor(public readonly type: TileTypeEnum|null) {
    }

    get buildingEnergyCost() {
        return this._buildingEnergyCost
    }

    get energyConsumption() {
        return this._energyConsumption
    }
    get energyProduction() {
        return this._energyProduction
    }
    get size() {
        return this._size
    }
    get canBePlacedOn() {
        return this._canBePlacedOn
    }

    public setBuildingEnergyCost(value: number): BuildingBuilder {
        this._buildingEnergyCost = value
        return this
    }

    public setEnergyConsumption(value: number): BuildingBuilder {
        this._energyConsumption = value
        return this
    }
    public setEnergyProduction(value: number): BuildingBuilder {
        this._energyProduction = value
        return this
    }
    public setSizeInTiles(value: number): BuildingBuilder {
        this._size = value
        return this
    }

    public addCanBePlacedOn(value: TileTypeEnum) {
        if (!this._canBePlacedOn.includes(value)) {
            this._canBePlacedOn.push(value)
        }

        return this
    }

    public static dummy() {
        return new BuildingBuilder(null)
    }
}

export const Building1 = (new BuildingBuilder(TileTypeEnum.BUILDING_1))
    .setBuildingEnergyCost(20)
    .setEnergyConsumption(5)
    .setEnergyProduction(0)
    .setSizeInTiles(2)
    .addCanBePlacedOn(TileTypeEnum.GRASS)
    .addCanBePlacedOn(TileTypeEnum.TREES)
    .addCanBePlacedOn(TileTypeEnum.BUSHES)
