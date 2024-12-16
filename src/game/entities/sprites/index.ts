import {createElement, forwardRef, memo} from "react";
//
import {EntityTypeEnum} from "core/enums/entity";
//
import BaseStructureSprite from "game/entities/sprites/BaseStructureSprite";
import EnergyStationStructureSprite from "game/entities/sprites/EnergyStationStructureSprite";
import TurretStructureSprite from "game/entities/sprites/TurretStructureSprite";
import CommandUnitSprite from "game/entities/sprites/CommandUnitSprite";
import AttackUnitSprite from "game/entities/sprites/AttackUnitSprite";
import BuilderUnitSprite from "game/entities/sprites/BuilderUnitSprite";
import {SpriteProps} from "./types";

const Components: any = {
    [EntityTypeEnum.BASE_STRUCTURE]: BaseStructureSprite,
    [EntityTypeEnum.ENERGY_STATION_STRUCTURE]: EnergyStationStructureSprite,
    [EntityTypeEnum.TURRET_STRUCTURE]: TurretStructureSprite,
    [EntityTypeEnum.COMMAND_UNIT]: CommandUnitSprite,
    [EntityTypeEnum.ATTACK_UNIT]: AttackUnitSprite,
    [EntityTypeEnum.BUILDER_UNIT]: BuilderUnitSprite,
}

type Props = SpriteProps & {type: EntityTypeEnum|null}

const SpriteRenderer = ({type, ...rest}: Props, ref: any) => {
    if (type === null) {
        return null
    }
    return createElement<SpriteProps>(Components[type], {...rest, ref})
}

export default memo(forwardRef(SpriteRenderer))