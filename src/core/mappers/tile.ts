import {TileTypeEnum} from "core/enums/tile";
import grass from "assets/images/sprites/tiles/grass.png";
import trees from "assets/images/sprites/tiles/trees.png";
import bushes from "assets/images/sprites/tiles/bushes.png";
import sand from "assets/images/sprites/tiles/sand.png";
import water from "assets/images/sprites/tiles/water.png";
import building from "assets/images/sprites/tiles/building.png";

export const TILE_TO_SPRITE = (new Map<TileTypeEnum, string>())
    .set(TileTypeEnum.GRASS, grass)
    .set(TileTypeEnum.TREES, trees)
    .set(TileTypeEnum.BUSHES, bushes)
    .set(TileTypeEnum.SAND, sand)
    .set(TileTypeEnum.WATER, water)
    .set(TileTypeEnum.BUILDING_1, building)

export const INTERACTIVE_TILES = (new Set<TileTypeEnum>())
    .add(TileTypeEnum.BUILDING_1)

export const RULES = (new Map())
    .set(TileTypeEnum.TREES, [TileTypeEnum.TREES, TileTypeEnum.BUSHES])
    .set(TileTypeEnum.BUSHES, [TileTypeEnum.TREES, TileTypeEnum.BUSHES ,TileTypeEnum.GRASS])
    .set(TileTypeEnum.GRASS, [TileTypeEnum.BUSHES, TileTypeEnum.GRASS, TileTypeEnum.SAND])
    .set(TileTypeEnum.SAND, [TileTypeEnum.GRASS, TileTypeEnum.SAND, TileTypeEnum.WATER])
    .set(TileTypeEnum.WATER, [TileTypeEnum.SAND, TileTypeEnum.WATER])