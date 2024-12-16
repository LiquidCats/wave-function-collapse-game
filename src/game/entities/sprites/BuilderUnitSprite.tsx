import {forwardRef} from "react";
import {Sprite} from "@pixi/react";
//
import {ENTITY_TO_SPRITE} from "core/mappers/entity";
import {EntityTypeEnum} from "core/enums/entity";
//
import {SpriteProps} from "./types";

const image = ENTITY_TO_SPRITE.get(EntityTypeEnum.BUILDER_UNIT)

const BuilderUnitSprite = forwardRef<any, SpriteProps>((props, ref) => {
    return <Sprite {...props} image={image} ref={ref} />
})

BuilderUnitSprite.displayName = "BuilderUnitSprite"

export default BuilderUnitSprite