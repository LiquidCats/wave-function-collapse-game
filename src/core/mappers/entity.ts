import {
    commandUnitCreator,
    builderUnitCreator,
    attackUnitCreator,
    baseStructureCreator,
    turretStructureCreator,
    energyStationStructureCreator
} from "core/models/entities/creators";
import Entity from "core/models/entities/Entity";
import {EntityTypeEnum} from "core/enums/entity";
import building from "assets/images/sprites/tiles/building.png";
import UnitModel from "core/models/entities/UnitModel";
import StructureModel from "core/models/entities/StructureModel";

type EntityCreator<T extends Entity = Entity> = (() => Entity|T)|undefined

class EntityMap {
    private readonly _map: Map<EntityTypeEnum, EntityCreator>;

    constructor() {
        this._map = new Map<EntityTypeEnum, EntityCreator>()
    }

    public set<T extends Entity>(key: EntityTypeEnum, value: EntityCreator<T>) {
        this._map.set(key, value)

        return this
    }

    public has(key: EntityTypeEnum): boolean {
        return this._map.has(key)
    }

    public get<T extends Entity>(key: EntityTypeEnum): T|Entity|undefined {
        const creator: EntityCreator<T> = this._map.get(key)

        return creator ? creator() : undefined
    }
}
export const ENTITY_TO_SPRITE = (new Map<EntityTypeEnum, string>())
    .set(EntityTypeEnum.BASE_STRUCTURE, building)
    .set(EntityTypeEnum.ENERGY_STATION_STRUCTURE, building)
    .set(EntityTypeEnum.TURRET_STRUCTURE, building)
    .set(EntityTypeEnum.COMMAND_UNIT, building)
    .set(EntityTypeEnum.ATTACK_UNIT, building)
    .set(EntityTypeEnum.BUILDER_UNIT, building)

export const ENTITY_TO_OBJECT = (new EntityMap())
    .set<StructureModel>(EntityTypeEnum.BASE_STRUCTURE, baseStructureCreator)
    .set<StructureModel>(EntityTypeEnum.ENERGY_STATION_STRUCTURE, energyStationStructureCreator)
    .set<StructureModel>(EntityTypeEnum.TURRET_STRUCTURE, turretStructureCreator)
    .set<UnitModel>(EntityTypeEnum.COMMAND_UNIT, commandUnitCreator)
    .set<UnitModel>(EntityTypeEnum.ATTACK_UNIT, attackUnitCreator)
    .set<UnitModel>(EntityTypeEnum.BUILDER_UNIT, builderUnitCreator)
