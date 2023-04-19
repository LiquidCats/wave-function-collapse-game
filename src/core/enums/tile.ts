export enum TileTypeEnum {
    GRASS = 'GRASS',
    TREES = 'TREES',
    BUSHES = 'BUSHES',
    SAND = 'SAND',
    WATER = 'WATER',
}

export const RULES = {
    [TileTypeEnum.TREES]: [TileTypeEnum.TREES, TileTypeEnum.BUSHES],
    [TileTypeEnum.BUSHES]: [TileTypeEnum.TREES, TileTypeEnum.BUSHES ,TileTypeEnum.GRASS],
    [TileTypeEnum.GRASS]: [TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND],
    [TileTypeEnum.SAND]: [TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER],
    [TileTypeEnum.WATER]: [TileTypeEnum.SAND, TileTypeEnum.WATER],
}