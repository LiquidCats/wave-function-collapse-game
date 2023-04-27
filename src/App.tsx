// packages
import {memo, useCallback, useMemo} from "react";
import {Container, Graphics, Sprite} from "@pixi/react";
import {Graphics as IGraphics} from "@pixi/graphics";
import {useSetRecoilState} from "recoil";
// modules
import GameScreen from "game/GameScreen";
import {entityToPlaceState} from "state/entityToPlace";
import {TILE_SIZE} from "core/enums/tile";
import useResize from "core/hooks/useResize";
import {EntityTypeEnum} from "core/enums/entity";
import {ENTITY_TO_SPRITE} from "core/mappers/entity";

type AppProps = {}

const App = memo<AppProps>(() => {
    const [width, height] = useResize();

    const GameScreenHeight= useMemo(() => height - (height * .2), [height])
    const HUDHeight= useMemo(() => height - GameScreenHeight, [height, GameScreenHeight])

    const setCurrentBuildingChosenToBuild = useSetRecoilState(entityToPlaceState)
    const buildingCreationHandler = useCallback((type: EntityTypeEnum) => () => {
        setCurrentBuildingChosenToBuild(EntityTypeEnum.BASE_BUILDING)
    }, [])

    const drawHUDBackground = useCallback((g: IGraphics) => {
        g.clear()
        g.beginFill("#fff")
        g.drawRect(0, 0, width, HUDHeight);
        g.endFill()
    }, [width, HUDHeight])

    return <>
        <GameScreen width={width} height={GameScreenHeight}/>
        <Container width={width} height={HUDHeight} y={GameScreenHeight+TILE_SIZE}>
            <Graphics draw={drawHUDBackground}/>
            <Sprite x={10}
                    y={10}
                    eventMode="dynamic"
                    onmouseup={buildingCreationHandler(EntityTypeEnum.BASE_BUILDING)}
                    image={ENTITY_TO_SPRITE.get(EntityTypeEnum.BASE_BUILDING)}
                    height={TILE_SIZE}
                    width={TILE_SIZE}/>
        </Container>
    </>
})

App.displayName = 'App'

export default App