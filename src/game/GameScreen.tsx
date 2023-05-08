import {memo, MutableRefObject, useCallback, useRef} from "react";
//
import {FederatedPointerEvent} from "pixi.js";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
//
import Selection from "game/Selection";
import PixiViewport from "game/Viewport";
import TileRow from "game/tiles/TileRow";
import EntityToPlace from "game/entities/EntityToPlace";
import EntitiesOnMap from "game/entities/EntitiesOnMapRenderer";
//
import {MAP_SIZE, TileTypeEnum} from "core/enums/tile";
//
import {entityToPlaceCanPlaceSelector, entityToPlaceState} from "state/entityToPlace";
import {showSelectionState, startSelectionCoordinatesState} from "state/selection";
import {mapCursorCoordinatesState} from "state/cursor";
import {mapState} from "state/map";

type GameScreenProps = {
    width: number,
    height: number
}

const GameScreen = memo((props: GameScreenProps) => {
    const {width, height} = props

    const containerRef: MutableRefObject<any> = useRef(null)

    const [currentBuildingChosenToBuild, setCurrentBuildingChosenToBuild] = useRecoilState(entityToPlaceState)
    const setStartSelectionCoordinates = useSetRecoilState(startSelectionCoordinatesState)
    const setMapCursorCoordinates = useSetRecoilState(mapCursorCoordinatesState)

    const map = useRecoilValue(mapState)
    const canPlaceBuilding = useRecoilValue(entityToPlaceCanPlaceSelector)
    const setShowSelection = useSetRecoilState(showSelectionState)

    const mouseDownHandler = useCallback((e: FederatedPointerEvent) => {
        const {x,y } = e.getLocalPosition(containerRef.current)

        if (null === currentBuildingChosenToBuild) {
            setStartSelectionCoordinates([x, y])
            setMapCursorCoordinates([x, y])
            setShowSelection(true)
        }

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
            map.map((row: TileTypeEnum[], i: number) => <TileRow row={row} tileY={i} key={`row-${i}`}/>)
        }
        <EntitiesOnMap/>
        <EntityToPlace/>
        <Selection/>
    </PixiViewport>
})

GameScreen.displayName = "GameScreen"

export default GameScreen