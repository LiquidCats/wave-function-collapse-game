// packages
import {memo, useCallback, useMemo} from "react";
import {Container, Graphics, Sprite} from "@pixi/react";
import {Graphics as IGraphics} from "@pixi/graphics";
import {useSetRecoilState} from "recoil";
// modules
import GameScreen from "game/GameScreen";
import {currentBuildingChosenToBuildState} from "state/building";
import {TILE_SIZE, TileTypeEnum} from "core/enums/tile";
import useResize from "core/hooks/useResize";
import {TILE_TO_SPRITE} from "./core/mappers/tile";

type AppProps = {}

const App = memo((props: AppProps) => {
    const [width, height] = useResize();

    const GameScreenHeight= useMemo(() => height - (height * .2), [height])
    const HUDHeight= useMemo(() => height - GameScreenHeight, [height, GameScreenHeight])

    const setCurrentBuildingChosenToBuild = useSetRecoilState(currentBuildingChosenToBuildState)
    const buildingCreationHandler = useCallback(() => {
        setCurrentBuildingChosenToBuild(TileTypeEnum.BUILDING_1)
    }, [])

    const drawHUDBackground = useCallback((g: IGraphics) => {
        g.clear()
        g.beginFill("#fff")
        g.drawRect(0, 0, width, HUDHeight);
        g.endFill()
    }, [width, HUDHeight])

    return <>
        <GameScreen width={width} height={GameScreenHeight}/>
        <Container width={width} height={HUDHeight} y={GameScreenHeight}>
            <Graphics draw={drawHUDBackground}/>
            <Sprite x={10}
                    y={10}
                    eventMode="dynamic"
                    onmouseup={buildingCreationHandler}
                    image={TILE_TO_SPRITE.get(TileTypeEnum.BUILDING_1)}
                    height={TILE_SIZE}
                    width={TILE_SIZE}/>
        </Container>
    </>
})

App.displayName = 'App'

export default App