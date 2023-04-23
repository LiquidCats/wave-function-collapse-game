import {TileTypeEnum} from "core/enums/tile";
import {randomElement} from "core/helpers/randomness";
import {RULES} from "core/mappers/tile";
//
type superpositionKey = "UP"|"DOWN"|"LEFT"|"RIGHT"
type superpositionType = { [k in superpositionKey]?: TileModel }

const sorter = (a: TileModel, b: TileModel) => a.availableTypes.length - b.availableTypes.length

class TileModel {
    private static readonly overlapping: number = 3

    public availableTypes: TileTypeEnum[]
    public isCollapsed: boolean;

    public readonly superposition: superpositionType

    constructor(types?: TileTypeEnum[]) {
        this.availableTypes = types ?? Object.values(TileTypeEnum)
        this.superposition = {}

        this.isCollapsed = false;
    }

    get type(): TileTypeEnum {
        if (this.isCollapsed) {
            return this.availableTypes[0]
        }

        throw new Error('cant take type of non-collapsed tile')
    }

    public collapse(type?: TileTypeEnum) {
        if (!this.availableTypes?.length) {
            return
        }

        this.isCollapsed = true
        this.availableTypes = [type ?? randomElement(this.availableTypes)]

        this.propagate()

        let directions = Object.values(this.superposition)
            .sort(sorter).filter(d => !d.isCollapsed)

        if (!directions.length) {
            return
        }

        do {
            randomElement(directions).collapse()
            directions = directions.filter(d => !d.isCollapsed)

        } while (directions.length > 0)
    }

    public resolveConflicts() {
        const directions = Object.values(this.superposition)
            .sort(sorter).map(d => d.availableTypes)

        let result: TileTypeEnum[][][] = [];

        for (const types of directions) {
            const res = []
            for (const type of types) {
                res.push(
                    this.availableTypes.filter(t => RULES.get(t).includes(type))
                )
            }

            result.push(res)
        }

        const flat = result.map(r => new Set(r.flat()))

        this.availableTypes = Array.from(flat[0]).filter(t => flat.every(tt => tt.has(t)))
    }

    public propagate(level = 0) {
        if (level === TileModel.overlapping) {
            return
        }

        const directions = Object.values(this.superposition)

        for (const direction of directions) {
            const availableConnections: TileTypeEnum[][] = [];

            for (const availableType of this.availableTypes) {
                availableConnections.push(RULES.get(availableType))
            }

            const uniqueItems: Set<TileTypeEnum> = new Set();

            for (const array of availableConnections) {
                for (const item of array) {
                    uniqueItems.add(item);
                }
            }

            if (!direction.isCollapsed) {
                direction.availableTypes = Array.from(uniqueItems)
            }

            direction.resolveConflicts()
            direction.propagate(level + 1)
        }
    }
}

export default TileModel