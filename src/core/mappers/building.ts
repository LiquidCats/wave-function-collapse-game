import {TileTypeEnum} from "core/enums/tile";
import {Building1, BuildingBuilder} from "core/models/BuildingBuilder";


export const BUILDING_TO_OBJECT = (new Map<TileTypeEnum|null, BuildingBuilder>())
    .set(TileTypeEnum.BUILDING_1, Building1)