import Entity from "core/models/entities/Entity";

export type Entities = Entity[]
export type MovementDelta = 0|1|-1
export type RotationDirection = 0|1|-1

export interface Renderable {
    get texture(): string
}

export interface Rotatable {
    get currentRotation(): number
}