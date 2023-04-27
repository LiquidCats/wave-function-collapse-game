import Entity from "core/models/entities/Entity";
import UnitModel from "core/models/entities/UnitModel";
import StructureModel from "core/models/entities/StructureModel";
import {TileTypeEnum} from "core/enums/tile";
import {EntityTypeEnum} from "core/enums/entity";

export const commandUnitCreator = (): Entity => {
    return (new UnitModel(EntityTypeEnum.COMMAND_UNIT))
        .setBuildingEnergyCost(100)
        .setEnergyProduction(15)
        .setHealth(500)
        .setDps(25)
        .unique()
}
export const builderUnitCreator = (): Entity => {
    return (new UnitModel(EntityTypeEnum.BUILDER_UNIT))
        .setBuildingEnergyCost(100)
        .setEnergyProduction(5)
        .setHealth(100)
}
export const attackUnitCreator = (): Entity => {
    return (new UnitModel(EntityTypeEnum.ATTACK_UNIT))
        .setBuildingEnergyCost(100)
        .setEnergyConsumption(5)
        .setHealth(200)
        .setDps(10)
}

export const baseStructureCreator = (): Entity => {
    return (new StructureModel(EntityTypeEnum.BASE_STRUCTURE))
        .addCanBePlacedOn(TileTypeEnum.GRASS)
        .addCanBePlacedOn(TileTypeEnum.TREES)
        .addCanBePlacedOn(TileTypeEnum.BUSHES)
        .setBuildingEnergyCost(150)
        .setEnergyConsumption(5)
        .setHealth(1000)
        .setSizeInTiles(2)
        .unique()
}
export const turretStructureCreator = (): Entity => {
    return (new StructureModel(EntityTypeEnum.TURRET_STRUCTURE))
        .addCanBePlacedOn(TileTypeEnum.GRASS)
        .addCanBePlacedOn(TileTypeEnum.TREES)
        .addCanBePlacedOn(TileTypeEnum.BUSHES)
        .setBuildingEnergyCost(50)
        .setEnergyConsumption(20)
        .setHealth(200)
        .setDps(10)
        .setSizeInTiles(1)
}
export const energyStationStructureCreator = (): Entity => {
    return (new StructureModel(EntityTypeEnum.ENERGY_STATION_STRUCTURE))
        .addCanBePlacedOn(TileTypeEnum.GRASS)
        .addCanBePlacedOn(TileTypeEnum.TREES)
        .addCanBePlacedOn(TileTypeEnum.BUSHES)
        .setBuildingEnergyCost(30)
        .setBuildingEnergyCost(60)
        .setHealth(120)
        .setSizeInTiles(1)
}