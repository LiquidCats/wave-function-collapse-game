import {memo, useCallback, useState} from "react";
import * as PIXI from "pixi.js";
import "@pixi/math-extras";
import {Container, Graphics, Sprite, useTick} from "@pixi/react";
import {TILE_SIZE} from "core/enums/tile";
import {ENTITY_TO_OBJECT} from "core/mappers/entity";
import {EntityTypeEnum} from "core/enums/entity";

const unitSize = TILE_SIZE / 2

const entityObject = ENTITY_TO_OBJECT.get(EntityTypeEnum.BASE_STRUCTURE)

const toX: number = 500
const toY: number = 100
const initialHealth: number = 1000
// Пример использования функции
const centerX = 300;
const centerY = 300;
const pointX = 300;
const pointY = centerY - unitSize*3;

function findPointOnCircle(centerX: number, centerY: number, pointX: number, pointY: number, angleY: number) {
    // Вычисляем расстояние от центра окружности до точки на окружности
    const radius = unitSize*4

    // Преобразуем угол из градусов в радианы
    const angleRad = (90 + angleY) * PIXI.DEG_TO_RAD

    // Вычисляем новые координаты на окружности
    const newX = centerX + radius * Math.cos(angleRad)
    const newY = centerY + radius * Math.sin(angleRad)

    // Возвращаем новые координаты
    return { x: newX, y: newY };
}

function calculateAngle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
    // Вычисление векторов между точками
    const vector1 = [x1 - x2, y1 - y2];
    const vector2 = [x3 - x2, y3 - y2];

    // Вычисление длин векторов
    const lengthVector1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
    const lengthVector2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);

    // Вычисление скалярного произведения векторов
    const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];

    // Вычисление угла между векторами
    const angleRad = Math.acos(dotProduct / (lengthVector1 * lengthVector2));

    return angleRad * PIXI.RAD_TO_DEG
    // return (angleRad * 180) / Math.PI;
}

function determinePointSide(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    const D = (x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)

    // const crossProduct = (vectorX * pointY) - (vectorY * pointX);
    if (D > 0) {
        return -1; // точка находится справа от вектора => отнимаем от текущему угл
    } else if (D < 0) {
        return 1; // точка находится слева от вектора => прибавляем к текущему угл
    } else {
        return 0; // точка находится на векторе
    }
}

const initialAngle = 0

const result = findPointOnCircle(centerX, centerY, pointX, pointY, initialAngle);
const angle = calculateAngle(result.x, result.y,300, 300, toX, toY)

console.log(angle, determinePointSide(centerX, centerY, toX, toY, result.x, result.y))

const EntityOnMap = memo(() => {
    const [x, setX] = useState(300)
    const [y, setY] = useState(300)
    const [initialRotation, setInitialRotation] = useState(initialAngle)
    const [health, setHealth] = useState(initialHealth)

    useTick(() => {
        // if (health !== 0) {
        //     setHealth(health-1)
        // }
        // if (degsLeft > 0) {
        //     setRotationTo(rotationTo+0.1)
        //     degsLeft = degsLeft-0.1
        //     console.log(degsLeft)
        //     console.log(initialRotation)
        //     return
        // }
        //
        // if (x !== toY) {
        //     if (toX > x) setX(x + .3)
        //     if (toX < x) setX(x - .3)
        // }
        //
        // if (y !== toY) {
        //     if (toY > y) setY(y + .3)
        //     if (toY < y) setY(y - .3)
        // }
    })

    const draw = useCallback((g: PIXI.Graphics) => {
        g.clear()

        // observation
        g.beginFill("#FFCB00FF", 0);
        g.lineStyle(2, "#ffcb00")
        g.drawCircle(unitSize/2, unitSize/2, unitSize*6);
        g.endFill();

        // attack
        g.beginFill("#f00", 0);
        g.lineStyle(2, "#f00")
        g.drawCircle(unitSize/2, unitSize/2, unitSize*4);
        g.endFill();

        // collider
        g.beginFill("#fff", 0);
        g.lineStyle(2, "#fff")
        g.drawRect(0, 0, unitSize, unitSize)
        g.endFill();

        // hitbox
        g.beginFill("#002aff", 0);
        g.lineStyle(2, "#002aff")
        g.drawRect(0, 0, unitSize, unitSize)
        g.endFill();


        g.beginFill("#fff", 0.25);
        g.drawRect((unitSize/2)-2, unitSize, 2, unitSize * 3.5)
        g.endFill();

    }, [])

    const drawHealthBar = useCallback((g: PIXI.Graphics) => {
        g.clear()

        // bg
        g.beginFill("#000000", 1);
        g.drawRect(0, unitSize+3, 32, 5)
        g.endFill();

        // health
        g.beginFill("#14ff00", 1);
        g.drawRect(0, unitSize+3, (health * 32)/ initialHealth, 5)
        g.endFill();

    }, [health])

    return (
        <Container x={x} y={y}>
            <Container angle={initialRotation} pivot={.5}>
                <Sprite x={0}
                        y={0}
                        anchor={.5}
                        image={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"}
                        width={unitSize}
                        height={unitSize}/>
                <Graphics x={-unitSize/2} y={-unitSize/2} anchor={.5} draw={draw}/>
            </Container>

            <Graphics x={-unitSize/2} y={-unitSize/2} anchor={.5} draw={drawHealthBar}/>
        </Container>
    )
})

EntityOnMap.displayName = 'EntityOnMap'

export default EntityOnMap