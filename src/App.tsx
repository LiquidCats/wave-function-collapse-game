// packages
import {ForwardedRef, forwardRef, memo, MutableRefObject, useCallback, useRef, useState} from "react";
import {Stage} from "@pixi/react";
// modules
import TerrainCompressor from "core/models/TerrainCompressor";
import Tile from "field/Tile";
import PixiViewport from "field/Viewport";
import useResize from "core/hooks/useResize";
import {TILE_SIZE, TileTypeEnum} from "core/enums/tile";
// static
import "App.scss"
import Selection from "./field/Selection";
import {FederatedPointerEvent} from "pixi.js";


const field = TerrainCompressor.decompress("2:1,1:4,2:1,1:1,2:2,0:2,3:1,0:1,3:1,0:3,3:1,0:1,2:1,1:1,2:1,0:2,3:2,4:6;1:4,2:2,1:1,2:1,0:3,3:2,4:1,3:2,0:2,2:3,0:1,3:3,0:1,3:1,4:1,3:2,4:2;1:6,2:1,1:1,2:1,0:1,3:1,4:1,3:1,4:2,3:1,0:1,2:1,1:2,2:1,0:1,3:4,0:1,3:1,0:2,3:1,4:1;1:2,2:1,1:4,2:1,0:1,3:1,4:1,3:1,0:1,3:1,4:1,3:1,0:1,2:1,1:1,2:1,0:1,2:1,0:3,3:3,0:1,2:1,0:1,3:1;1:1,2:3,1:1,2:1,1:1,2:1,0:1,3:1,4:1,3:2,4:1,3:1,0:1,2:1,1:1,2:1,0:1,2:2,0:1,2:1,0:8;2:2,1:1,2:2,1:2,2:2,0:1,3:2,4:1,3:1,0:1,2:3,0:1,2:1,1:2,2:1,0:1,3:1,0:1,2:5,0:1;1:2,2:1,0:1,2:1,1:1,2:2,0:4,3:1,0:1,2:1,1:2,2:1,0:1,2:1,1:1,2:3,0:1,2:2,1:1,2:2,0:1,3:1;2:2,0:1,3:1,0:1,2:1,0:1,2:3,0:1,2:1,0:1,2:4,0:1,2:1,1:2,2:1,1:2,2:1,1:2,2:2,0:1,3:2;0:2,2:1,0:1,3:1,0:5,2:1,1:1,2:2,1:1,2:3,1:1,2:2,1:1,2:1,1:3,2:1,0:2,3:1,0:2;0:1,2:1,0:1,3:1,4:1,3:1,0:1,3:2,0:1,2:3,0:1,2:2,1:2,2:1,0:2,2:1,1:3,2:1,0:1,2:1,0:3,2:1;0:1,2:1,0:2,3:1,0:4,2:1,1:1,2:1,1:1,2:1,1:1,2:1,1:2,2:1,0:3,2:5,0:2,3:1,0:2;2:1,0:1,3:1,0:1,3:1,0:1,2:1,0:1,2:1,0:1,2:1,0:1,2:1,0:1,2:1,1:2,2:1,0:1,3:2,0:7,3:1,0:1,3:1,0:1;0:1,3:1,0:3,2:1,1:1,2:3,1:1,2:2,0:1,2:3,1:1,2:1,0:2,2:2,0:1,3:1,0:1,2:1,0:3,3:1,0:1;3:1,0:1,2:2,0:1,2:3,1:3,2:1,0:1,2:1,0:2,2:1,1:1,2:4,0:3,2:1,1:1,2:2,0:1,3:1,0:1;3:2,0:2,2:1,1:1,2:2,1:2,2:1,0:2,2:1,0:1,2:1,1:1,2:1,1:1,2:2,1:1,2:1,0:1,2:3,1:1,2:1,0:2,2:1;3:1,0:2,2:1,1:1,2:1,1:2,2:1,1:1,2:3,1:1,2:5,1:3,2:1,0:4,2:3,0:2;4:1,3:2,0:1,2:4,1:6,2:1,0:1,2:1,0:1,2:1,1:2,2:2,0:1,3:3,0:1,2:1,1:1,2:1,0:1;3:2,0:1,2:1,0:2,2:2,1:1,2:3,1:1,2:2,0:1,2:2,1:2,2:1,1:2,2:1,0:1,3:1,0:1,2:1,1:1,2:2,0:1;0:2,2:1,1:1,2:2,1:2,2:1,0:1,2:1,1:1,2:1,1:2,2:1,1:1,2:3,0:1,2:1,1:1,2:2,0:1,2:1,1:1,2:1,0:2,3:1;0:2,2:1,1:3,2:2,0:1,2:1,1:1,2:2,1:2,2:1,1:3,2:2,0:1,2:1,1:2,2:1,1:1,2:1,1:1,2:2,0:1;0:1,2:1,1:1,2:4,1:1,2:3,0:2,2:3,1:2,2:1,0:1,2:1,0:2,2:2,1:1,2:1,0:1,2:1,0:2,2:1;0:2,2:1,1:4,2:2,0:3,3:1,0:2,2:1,1:1,2:1,0:1,3:1,0:1,2:3,1:1,2:1,0:1,3:1,0:1,3:2,0:1;3:1,0:1,2:6,0:1,2:1,0:1,2:1,0:1,2:2,1:2,2:1,0:2,2:2,0:2,2:1,0:1,3:1,4:1,3:1,4:2,3:1;3:1,0:1,2:2,0:3,2:2,0:1,3:1,0:3,2:3,0:1,2:2,0:2,3:2,0:2,3:4,4:2;0:2,2:1,0:1,3:2,0:2,2:2,0:1,2:1,0:2,2:1,0:1,2:1,0:3,3:1,0:1,3:1,0:1,3:2,0:2,3:1,4:1,3:1,4:1;0:1,3:1,0:1,3:1,4:1,3:1,0:4,2:1,1:1,2:4,0:2,3:1,0:2,2:1,0:1,3:3,0:2,3:2,0:1,3:1;3:1,4:1,3:2,4:1,3:1,0:2,2:3,1:1,2:1,0:1,2:3,0:3,2:1,1:1,2:1,0:1,3:6,0:1,3:1;4:4,3:4,0:2,2:2,0:1,3:1,0:2,2:2,0:1,3:1,0:1,2:1,0:1,3:1,0:1,3:1,4:2,3:4;4:7,3:1,0:1,3:1,0:3,3:3,0:1,2:1,0:4,3:1,4:1,3:2,4:6;4:2,3:1,4:5,3:1,0:2,3:4,4:1,3:1,0:1,3:3,0:2,3:1,4:2,3:1,4:5;4:1,3:1,4:1,3:1,4:2,3:1,4:2,3:2,4:1,3:1,4:3,3:2,0:1,3:1,0:2,3:1,4:1,3:2,4:2,3:1,4:3;3:3,0:1,3:2,0:1,3:1,4:2,3:1,4:1,3:3,4:2,3:1,0:2,3:2,4:4,3:2,0:1,3:3")

type AppProps = {
}

const stageOptions = {
    antialias: true,
    autoDensity: true,
    backgroundColor: 0x171717,
};

const App = memo(
    forwardRef((props: AppProps, ref: ForwardedRef<any>) => {
        const containerRef: MutableRefObject<any> = useRef(null)
        const stageRef: MutableRefObject<any> = useRef(null)

        const [width, height] = useResize();

        const [showSelection, setShowSelection] = useState(false)
        const [selectionStartX, setSelectionStartX] = useState<number>(0)
        const [selectionStartY, setSelectionStartY] = useState<number>(0)
        const [selectionEndX, setSelectionEndX] = useState<number>(0)
        const [selectionEndY, setSelectionEndY] = useState<number>(0)

        const realStartX = Math.max(selectionStartX, selectionEndX)
        const realEndX = Math.min(selectionStartX, selectionEndX)
        const realStartY = Math.max(selectionStartY, selectionEndY)
        const realEndY = Math.min(selectionStartY, selectionEndY)
        if (showSelection) {
            console.log('realStartX: ', realStartX)
            console.log('realEndX: ', realEndX)
            console.log('realStartY: ', realStartY)
            console.log('realEndY: ', realEndY)
        }

        const selectionStartHandler = useCallback((e: FederatedPointerEvent) => {
            // for debug
            // console.log('screenHeightInWorldPixels: ',containerRef.current.screenHeightInWorldPixels)
            // console.log('screenWidthInWorldPixels: ',containerRef.current.screenWidthInWorldPixels)
            // console.log('screenWorldHeight: ',containerRef.current.screenWorldHeight)
            // console.log('screenWorldWidth: ',containerRef.current.screenWorldWidth)
            // console.log('worldScreenHeight: ',containerRef.current.worldScreenHeight)
            // console.log('worldScreenWidth: ',containerRef.current.worldScreenWidth)
            //
            // console.log(containerRef.current.top)
            // console.log(containerRef.current.left)
            // console.log('e.clientX: ', e.globalX)
            // console.log('e.clientY: ', e.globalY)
            // //
            // console.log('e.clientX: ', e.clientX)
            // console.log('e.clientY: ', e.clientY)
            // //
            // console.log('e.layerX: ', e.layerX)
            // console.log('e.layerY: ', e.layerY)
            // //
            // console.log('e.x:', e.x)
            // console.log('e.y:', e.y)

            const localPosition = e.getLocalPosition(containerRef.current)

            setSelectionStartX(localPosition.x)
            setSelectionStartY(localPosition.y)
            setSelectionEndX(localPosition.x)
            setSelectionEndY(localPosition.y)
            setShowSelection(true)
        }, [])
        const selectionHandler = useCallback((e: FederatedPointerEvent) => {
            const localPosition = e.getLocalPosition(containerRef.current)

            setSelectionEndX(localPosition.x)
            setSelectionEndY(localPosition.y)
        }, [])
        const selectionStopHandler = useCallback(() => {
            setSelectionStartX(0)
            setSelectionStartY(0)
            setSelectionEndX(0)
            setSelectionEndY(0)
            setShowSelection(false)
        }, [])

        return (
            <div id="game" className="game">
                <div className="game-world-map" onContextMenu={() => {}}>
                    <Stage ref={stageRef} height={height} width={width} options={stageOptions}>
                        <PixiViewport ref={containerRef} height={height} width={width} onMouseUp={selectionStopHandler} onMouseMove={selectionHandler} onMouseDown={selectionStartHandler}>
                            {
                                field.map((row: TileTypeEnum[], i: number) => {
                                    const y = TILE_SIZE * i
                                    const yCondition = (realStartY > y-TILE_SIZE/2) && (realEndY < y+TILE_SIZE/2)
                                    return row.map((tile: TileTypeEnum, j: number) => {
                                        const x = TILE_SIZE * j

                                        const xCondition = (realStartX > x-TILE_SIZE/2) && (realEndX < x+TILE_SIZE/2)

                                        const isSelected = showSelection && xCondition && yCondition

                                        return <Tile key={`${y}-${x}`} y={y} x={x} size={TILE_SIZE} type={tile}/>
                                    })
                                })
                            }
                            {showSelection && <Selection startX={selectionStartX} startY={selectionStartY} endX={selectionEndX} endY={selectionEndY}/>}
                        </PixiViewport>
                    </Stage>
                </div>
                <div className="game-control-pane"></div>
            </div>
        )
    })
)

App.displayName = 'App'

export default App