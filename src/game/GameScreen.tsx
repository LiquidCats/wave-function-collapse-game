import {memo, MutableRefObject, useCallback, useRef} from "react";
//
import {FederatedPointerEvent} from "pixi.js";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
//
import PixiViewport from "game/Viewport";
import Tile from "game/tiles/Tile";
import Selection from "game/Selection";
import BuildingToBuild from "game/BuildingToBuild";
//
import {MAP_SIZE, TILE_SIZE, TileTypeEnum} from "core/enums/tile";
import {currentBuildingChosenToBuildCanPlaceSelector, currentBuildingChosenToBuildState} from "state/building";
import {mapCursorCoordinatesState} from "state/cursor";
import {showSelectionState, startSelectionCoordinatesState} from "state/selection";
import {mapState} from "state/map";

type GameScreenProps = {
    width: number,
    height: number
}

const GameScreen = memo((props: GameScreenProps) => {
    const {width, height} = props

    const containerRef: MutableRefObject<any> = useRef(null)

    const [currentBuildingChosenToBuild, setCurrentBuildingChosenToBuild] = useRecoilState(currentBuildingChosenToBuildState)
    const setStartSelectionCoordinates = useSetRecoilState(startSelectionCoordinatesState)
    const setMapCursorCoordinates = useSetRecoilState(mapCursorCoordinatesState)

    const map = useRecoilValue(mapState)
    const canPlaceBuilding = useRecoilValue(currentBuildingChosenToBuildCanPlaceSelector)
    const setShowSelection = useSetRecoilState(showSelectionState)

    console.log(canPlaceBuilding)
    const mouseDownHandler = useCallback((e: FederatedPointerEvent) => {
        const {x,y } = e.getLocalPosition(containerRef.current)

        if (null === currentBuildingChosenToBuild) {
            setStartSelectionCoordinates([x, y])
            setMapCursorCoordinates([x, y])
            setShowSelection(true)
        }

        console.log(canPlaceBuilding)
        if (canPlaceBuilding) {
            setCurrentBuildingChosenToBuild(null)
        }
    }, [currentBuildingChosenToBuild, canPlaceBuilding])
    const mouseMoveHandler = useCallback((e: FederatedPointerEvent) => {
        const {x, y} = e.getLocalPosition(containerRef.current)
        setMapCursorCoordinates([
            x < 0 ? 0 : x > MAP_SIZE ? MAP_SIZE : x,
            y < 0 ? 0 : y > MAP_SIZE ? MAP_SIZE : y,
        ])
    }, [canPlaceBuilding])
    const mouseUpHandler = useCallback(() => {
        setStartSelectionCoordinates([0, 0])
        setShowSelection(false)
    }, [])

    const rightDownHandler = useCallback(() => {
        setCurrentBuildingChosenToBuild(null)
    }, [])

    return <PixiViewport ref={containerRef}
                         height={height}
                         width={width}
                         onMouseUp={mouseUpHandler}
                         onMouseMove={mouseMoveHandler}
                         onMouseDown={mouseDownHandler}
                         onRightDown={rightDownHandler}>
        {
            map.map((row: TileTypeEnum[], i: number) => {
                const y = TILE_SIZE * i
                // const yCondition = (realStartY > y) && (realEndY < y)
                return row.map((tile: TileTypeEnum, j: number) => {
                    const x = TILE_SIZE * j
                    //
                    // const xCondition = (realStartX > x) && (realEndX < x)
                    //
                    // const isSelected = showSelection && xCondition && yCondition

                    return <Tile key={`${i}-${j}`} y={y} x={x} size={TILE_SIZE} type={tile}/>
                })
            })
        }
        <BuildingToBuild/>
        <Selection/>
    </PixiViewport>
})

GameScreen.displayName = "GameScreen"

export default GameScreen