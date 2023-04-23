import {atom} from "recoil";

export const energyStorageCapacityState = atom({
    key: "energyStorageCapacityState",
    default: 1000
})

export const energyInStorageState = atom({
    key: "energyInStorageState",
    default: 0
})

export const energyProductionState = atom({
    key: "energyStorageCapacityState",
    default: 0
})

export const energyConsumptionState = atom({
    key: "energyStorageCapacityState",
    default: 0
})