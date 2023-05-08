import * as PIXI from "pixi.js";
import Position from "core/valueObjects/Position";

export default class PositionModel {
    public rotationAngle(start: Position, end: Position, point: Position): number {
        start = start.gameToAxis()
        end = end.gameToAxis()
        point = point.gameToAxis()

        // Вычисление векторов между точками
        const vector1 = [point.x - start.x, point.y - start.y];
        const vector2 = [end.x - start.x, end.y - start.y];

        // Вычисление длин векторов
        const lengthVector1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
        const lengthVector2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);

        // Вычисление скалярного произведения векторов
        const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];

        // Вычисление угла между векторами
        const angleRad = Math.acos(dotProduct / (lengthVector1 * lengthVector2));

        return angleRad * PIXI.RAD_TO_DEG
    }

    public aimPosition(center: Position, radius: number, angleY: number): Position {
        center = center.gameToAxis()

        // Преобразуем угол из градусов в радианы
        const angleRad = (90 + angleY) * PIXI.DEG_TO_RAD

        // Вычисляем новые координаты на окружности
        const newX = center.x + radius * Math.cos(angleRad)
        const newY = center.y + radius * Math.sin(angleRad)

        // Возвращаем новые координаты
        return new Position(newX, newY)
    }

    public rotationDiction(start: Position, end: Position, point: Position) {
        start = start.gameToAxis()
        end = end.gameToAxis()
        point = point.gameToAxis()

        const D = (point.x - start.x)
            * (end.y - start.y)
            - (point.y - start.y)
            * (end.x - start.x)

        if (D > 0) {
            return -1; // точка находится справа от вектора => отнимаем от текущему угл
        } else if (D < 0) {
            return 1; // точка находится слева от вектора => прибавляем к текущему угл
        } else {
            return 0; // точка находится на векторе
        }
    }
}
