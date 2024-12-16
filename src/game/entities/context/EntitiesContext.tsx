import {createContext} from "react";
import EntitiesContainer from "core/models/entities/EntitiesContainer";

export const entitiesContainer = new EntitiesContainer();

const EntitiesContext = createContext<EntitiesContainer>(entitiesContainer)

export default EntitiesContext