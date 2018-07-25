import assign from "object-assign";
import * as scrollActions from "./infinite_scroll";
import * as nearbyPlacesActions from "./nearbyPlaces";

const actions = assign({}, scrollActions, nearbyPlacesActions);

export default actions;
