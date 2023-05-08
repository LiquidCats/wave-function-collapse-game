import {atom, selector} from "recoil";
import Entity from "core/models/entities/Entity";
import UnitModel from "core/models/entities/UnitModel";
import StructureModel from "core/models/entities/StructureModel";
import {ENTITY_TO_OBJECT} from "core/mappers/entity";
import {EntityTypeEnum} from "core/enums/entity";

export const entitiesOnMapState = atom<Entity[]>({
    key: "entitiesOnMapState",
    default: [
        ENTITY_TO_OBJECT.get(EntityTypeEnum.COMMAND_UNIT)
    ],
})

export const entitiesOnMapCountSelector = selector<number>({
    key: "entitiesOnMapCountSelector",
    get: ({get}) => {
        return get(entitiesOnMapState).length
    }
})

export const selectedEntitiesState = atom({
    key: "selectedEntitiesState",
    default: [],
})

export const hasUniqueUnitOnMapSelector = selector<boolean>({
    key: "hasUniqueUnitOnMapSelector",
    get: ({get}) => get(entitiesOnMapState)
        .filter(e => e instanceof UnitModel)
        .filter(e => e.isUnique)
        .length !== 0
})

export const hasUniqueStructureOnMapSelector = selector<boolean>({
    key: "hasUniqueUnitOnMapSelector",
    get: ({get}) => get(entitiesOnMapState)
        .filter(e => e instanceof StructureModel)
        .filter(e => e.isUnique)
        .length !== 0
})