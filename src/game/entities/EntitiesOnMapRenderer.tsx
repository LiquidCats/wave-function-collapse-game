import {memo} from "react";
import {useRecoilValue} from "recoil";
import {Container} from "@pixi/react";
//
import EntityOnMap from "game/entities/EntityOnMap";
//
import {entitiesOnMapState} from "state/entityOnMap";

const EntitiesOnMapRenderer = memo((props) => {
    const entitiesOnMap = useRecoilValue(entitiesOnMapState)
    return <Container>
        {
            entitiesOnMap.map((e, i) => <EntityOnMap key={`ent-${i}`} model={e}/>)
        }
    </Container>
})

EntitiesOnMapRenderer.displayName = 'EntitiesOnMapRenderer'

export default EntitiesOnMapRenderer