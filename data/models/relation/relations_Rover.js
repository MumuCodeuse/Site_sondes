// import

import Rover from "../base/Rover";
import ElementRover from "../base/ElementRover.js";

// liaison entre Rover et ElementRover. Cardinalités : Rover:N,N; ElementRover:1,N.
// Accéder à tous les éléments d'un rover
Rover.belongsToMany(ElementRover, {
    through: "tl_element_rover",
    foreignKey: "rover_id",
    otherKey: "element_rover_id",
    as: "elements_rover",
});

// La reciproque. Pour accéder à la liste des rovers contenant un même élément
ElementRover.belongsToMany(Rover, {
    through: "tl_element_rover",
    foreignKey: "element_rover_id",
    otherKey: "rover_id",
    as: "rovers",
});
