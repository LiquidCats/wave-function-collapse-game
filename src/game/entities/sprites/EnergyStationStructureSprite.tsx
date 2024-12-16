import {forwardRef} from "react";
import {Sprite} from "@pixi/react";
//
import {ENTITY_TO_SPRITE} from "core/mappers/entity";
import {EntityTypeEnum} from "core/enums/entity";
//
import {SpriteProps} from "./types";

const image = ENTITY_TO_SPRITE.get(EntityTypeEnum.ENERGY_STATION_STRUCTURE)

const EnergyStationStructureSprite = forwardRef<any, SpriteProps>((props, ref) => {
    return <Sprite {...props} image={image} ref={ref}/>
})

export default EnergyStationStructureSprite