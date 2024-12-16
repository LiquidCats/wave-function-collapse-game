import {Entities} from "core/models/entities/types";
import Entity from "core/models/entities/Entity";
import StructureModel from "./StructureModel";
import UnitModel from "./UnitModel";

export default class EntitiesContainer {
    constructor(private readonly _entities: Entities = []) {
    }

    public add(entity: Entity) {
        this._entities.push(entity)
    }

    public all(): Entities {
        return this._entities
    }

    public structures(): StructureModel[] {
        return this.all().filter(e => e instanceof StructureModel) as StructureModel[]
    }

    public units(): UnitModel[] {
        return this.all().filter(e => e instanceof UnitModel) as UnitModel[]
    }

    public hasStructures(): boolean {
        return this.structures().some(e => e.isUnique)
    }
    public hasUnits(): boolean {
        return this.units().some(e => e.isUnique)
    }
}