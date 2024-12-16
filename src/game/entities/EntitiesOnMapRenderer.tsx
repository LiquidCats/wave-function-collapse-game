import {memo, useContext, useState} from "react";
import {Container, useTick} from "@pixi/react";
//
import EntityOnMap from "game/entities/EntityOnMap";
import entitiesContext from "game/entities/context/EntitiesContext";

const EntitiesOnMapRenderer = memo((props) => {
    const entitiesOnMap = useContext(entitiesContext)
    const [entities, setEntities] = useState(entitiesOnMap.all())
    useTick(() => {
        setEntities(entitiesOnMap.all())
    })

    return <Container>
        {
            entities.map((e, i) => <EntityOnMap key={`ent-${i}`} model={e}/>)
        }
    </Container>
})

EntitiesOnMapRenderer.displayName = 'EntitiesOnMapRenderer'

export default EntitiesOnMapRenderer