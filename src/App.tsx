// packages
import React, {memo, useMemo,} from "react";
// core
import useResize from "core/hooks/useResize";
// modules
import GameScreen from "game/GameScreen";
import HUD from "hud/HUD";

type AppProps = {}

const App = memo<AppProps>(() => {
    const [width, height] = useResize();

    const GameScreenHeight= useMemo(() => height - (height * .2), [height])
    const HUDHeight= useMemo(() => height - GameScreenHeight, [height, GameScreenHeight])

    return <>
        <GameScreen width={width} height={GameScreenHeight}/>
        <HUD width={width} height={HUDHeight} y={GameScreenHeight}/>
    </>
})

App.displayName = 'App'

export default App