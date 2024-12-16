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
import UnitModel from "core/models/entities/UnitModel";
import StructureModel from "core/models/entities/StructureModel";
// assets
import attack_unit from "assets/images/sprites/entities/attack_unit.png";
import base_structure from "assets/images/sprites/entities/base_structure.png";
import builder_unit from "assets/images/sprites/entities/builder_unit.png";
import command_unit from "assets/images/sprites/entities/command_unit.png";
import energy_station_structure from "assets/images/sprites/entities/energy_station_structure.png";
import turret_structure from "assets/images/sprites/entities/turret_structure.png";

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

    public get<T extends Entity>(key: EntityTypeEnum): T|Entity {
        const creator: EntityCreator<T> = this._map.get(key)
        if (!creator) {
            throw new Error(`no creator define for entity type: ${key}`)
        }

        return creator()
    }
}
export const ENTITY_TO_SPRITE = (new Map<EntityTypeEnum, string>())
    .set(EntityTypeEnum.BASE_STRUCTURE, base_structure)
    .set(EntityTypeEnum.ENERGY_STATION_STRUCTURE, energy_station_structure)
    .set(EntityTypeEnum.TURRET_STRUCTURE, turret_structure)
    .set(EntityTypeEnum.COMMAND_UNIT, command_unit)
    .set(EntityTypeEnum.ATTACK_UNIT, attack_unit)
    .set(EntityTypeEnum.BUILDER_UNIT, builder_unit)

export const ENTITY_TO_OBJECT = (new EntityMap())
    .set<StructureModel>(EntityTypeEnum.BASE_STRUCTURE, baseStructureCreator)
    .set<StructureModel>(EntityTypeEnum.ENERGY_STATION_STRUCTURE, energyStationStructureCreator)
    .set<StructureModel>(EntityTypeEnum.TURRET_STRUCTURE, turretStructureCreator)
    .set<UnitModel>(EntityTypeEnum.COMMAND_UNIT, commandUnitCreator)
    .set<UnitModel>(EntityTypeEnum.ATTACK_UNIT, attackUnitCreator)
    .set<UnitModel>(EntityTypeEnum.BUILDER_UNIT, builderUnitCreator)
