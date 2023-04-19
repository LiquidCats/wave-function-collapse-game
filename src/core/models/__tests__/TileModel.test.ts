import TileModel from "core/models/TileModel";
import {TileTypeEnum} from "../../enums/tile";

describe("TileModel", () => {
    it('should solve conflicts: set #1', () => {
        const tile = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES])

        const TileUp = new TileModel([TileTypeEnum.TREES])
        const TileRight = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES ,TileTypeEnum.GRASS])
        const TileDown = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS])
        const TileLeft = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS])

        tile.superposition.UP = TileUp
        tile.superposition.RIGHT = TileRight
        tile.superposition.DOWN = TileDown
        tile.superposition.LEFT = TileLeft

        tile.resolveConflicts()

        expect(tile.availableTypes).toEqual([TileTypeEnum.TREES, TileTypeEnum.BUSHES])
    })

    it('should solve conflicts: set #2', () => {
        const tile = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS])

        tile.superposition.UP = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES])
        tile.superposition.RIGHT = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS])
        tile.superposition.DOWN = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])
        tile.superposition.LEFT = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])

        tile.resolveConflicts()

        expect(tile.availableTypes).toEqual([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS])
    })

    it('should solve conflicts: set #3', () => {
        const tile = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND])

        tile.superposition.UP = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES ,TileTypeEnum.GRASS])
        tile.superposition.RIGHT = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])
        tile.superposition.DOWN = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])
        tile.superposition.LEFT = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])

        tile.resolveConflicts()

        expect(tile.availableTypes).toEqual([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND])
    })

    it('should solve conflicts: set #4', () => {
        const tile = new TileModel()

        tile.availableTypes = [TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS]

        tile.superposition.UP = new TileModel([TileTypeEnum.TREES])
        tile.superposition.RIGHT = new TileModel([TileTypeEnum.BUSHES])
        tile.superposition.DOWN = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND])
        tile.superposition.LEFT = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND])

        tile.resolveConflicts()

        expect(tile.availableTypes).toEqual([TileTypeEnum.TREES, TileTypeEnum.BUSHES])
    })

    it('should solve conflicts: set #5', () => {
        const tile = new TileModel([TileTypeEnum.SAND, TileTypeEnum.WATER])

        tile.superposition.UP = new TileModel([TileTypeEnum.WATER])
        tile.superposition.RIGHT = new TileModel([TileTypeEnum.WATER])
        tile.superposition.DOWN = new TileModel([TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])
        tile.superposition.LEFT = new TileModel([TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])

        tile.resolveConflicts()

        expect(tile.availableTypes).toEqual([TileTypeEnum.SAND, TileTypeEnum.WATER])
    })

    it('should solve conflicts: set #6', () => {
        const tile = new TileModel([TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND])

        tile.superposition.UP = new TileModel([TileTypeEnum.SAND])
        tile.superposition.RIGHT = new TileModel([TileTypeEnum.WATER])
        tile.superposition.DOWN = new TileModel([TileTypeEnum.GRASS])
        tile.superposition.LEFT = new TileModel([TileTypeEnum.TREES, TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])

        tile.resolveConflicts()

        expect(tile.availableTypes).toEqual([TileTypeEnum.SAND])
    })
})