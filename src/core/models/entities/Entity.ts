import Position from "core/valueObjects/Position";
import {EntityTypeEnum} from "core/enums/entity";
import {TILE_SIZE} from "core/enums/tile";

export default abstract class Entity {
    protected _currentPosition: Position = new Position(0,0)
    protected _buildingEnergyCost: number = 0;
    protected _energyConsumption: number = 0;
    protected _energyProduction: number = 0;
    protected _sizeInPixels: number = 0;
    protected _sizeInTiles: number = 0;
    protected _initialHealth: number = 0
    protected _health: number = 0
    protected _dps: number = 0
    private _isUnique: boolean = false
    private _observationRadiusInTiles: number = 0
    private _observationRadiusInPixels: number = 0
    private _attackRadiusInTiles: number = 0
    private _attackRadiusInPixels: number = 0

    constructor(protected _type: EntityTypeEnum|null = null) {
    }

    get isUnique(): boolean {
        return this._isUnique;
    }

    get type(): EntityTypeEnum|null {
        return this._type;
    }

    get currentPosition(): Position {
        return this._currentPosition;
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

    get sizeInPixels() {
        return this._sizeInPixels
    }
    get sizeInTiles() {
        return this._sizeInTiles
    }

    get health() {
        return this._health
    }

    get initialHealth() {
        return this._initialHealth
    }

    get dps() {
        return this._dps
    }

    get isUniqable() {
        return this._isUnique
    }
    get observationRadiusInTiles() {
        return this._observationRadiusInTiles
    }
    get observationRadiusInPixels() {
        return this._observationRadiusInPixels
    }
    get attackRadiusInTiles() {
        return this._attackRadiusInTiles
    }
    get attackRadiusInPixels() {
        return this._attackRadiusInPixels
    }

    public receiveDamageFrom(e: Entity) {
        this._health = this._health - e.dps
    }

    public dealDamageTo(e: Entity) {
        e.receiveDamageFrom(this)
    }

    public setSizeInTiles(value: number) {
        this._sizeInTiles = value
        this._sizeInPixels = TILE_SIZE * value

        return this
    }

    public setObservationRadiusInTiles(value: number) {
        this._observationRadiusInTiles = value
        this._observationRadiusInPixels = TILE_SIZE * value

        return this
    }
    public setAttackRadiusInTiles(value: number) {
        this._attackRadiusInTiles = value
        this._attackRadiusInPixels = TILE_SIZE * value

        return this
    }

    public setBuildingEnergyCost(value: number) {
        this._buildingEnergyCost = value
        return this
    }

    public setEnergyConsumption(value: number) {
        this._energyConsumption = value
        return this
    }

    public setEnergyProduction(value: number) {
        this._energyProduction = value
        return this
    }

    public setHealth(value: number) {
        this._health = value
        this._initialHealth = value

        return this
    }

    public setDps(value: number) {
        this._dps = value

        return this
    }

    public unique() {
        this._isUnique = true

        return this
    }

    public abstract placeOnMap(position: Position): Entity
}