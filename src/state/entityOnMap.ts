import {atom, selector} from "recoil";
import Entity from "core/models/entities/Entity";
import UnitModel from "core/models/entities/UnitModel";
import StructureModel from "core/models/entities/StructureModel";

const entitiesOnMap = atom<Entity[]>({
    key: "entitiesOnMap",
    default: [],
})

const entitiesOnMapCountSelector = selector<number>({
    key: "entitiesOnMapCountSelector",
    get: ({get}) => {
        return get(entitiesOnMap).length
    }
})

const selectedEntities = atom({
    key: "selectedEntities",
    default: [],
})

const hasUniqueUnitOnMapSelector = selector<boolean>({
    key: "hasUniqueUnitOnMapSelector",
    get: ({get}) => get(entitiesOnMap)
        .filter(e => e instanceof UnitModel)
        .filter(e => e.isUnique)
        .length !== 0
})

const hasUniqueStructureOnMapSelector = selector<boolean>({
    key: "hasUniqueUnitOnMapSelector",
    get: ({get}) => get(entitiesOnMap)
        .filter(e => e instanceof StructureModel)
        .filter(e => e.isUnique)
        .length !== 0
})