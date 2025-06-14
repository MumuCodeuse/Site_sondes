// import

import Rover from "../bases/Rover.js";
import ElementRover from "../bases/ElementRover.js";
import RoverScientificTools from "../bases/RoverScientificTools.js";
import RoleRover from "../bases/RoleRover.js";
import TypeRover from "../bases/TypeRover.js";

export default function associateRoverModels() {

    // 1) liaison entre Rover et ElementRover. Cardinalités : Rover:N,N; ElementRover:1,N.
    // Accéder à tous les éléments d'un rover
    // Relation many-many
    Rover.belongsToMany(ElementRover, {
        through: "tl_element_rover",
        foreignKey: "rover_id",
        otherKey: "element_rover_id",
        as: "roverElements",
    });

    // La reciproque. Pour accéder à la liste des rovers qui utilisent un même type d'élément
    ElementRover.belongsToMany(Rover, {
        through: "tl_element_rover",
        foreignKey: "element_rover_id",
        otherKey: "rover_id",
        as: "roversWithThisElement",
    });

    //--------------------------------------------------------

    //2) liaison entre Rover et RoverScientificTools. Cardinalités : Rover: 1,N; RoverScientificTools: 1,N
    // Accéder à tous les outils scientifique d'un rover
    // Relation many-many

    Rover.belongsToMany(RoverScientificTools, {
        through: "tl_rover_scientific_tools",
        foreignKey: "rover_id",
        otherKey: "rover_scientific_tools_id",
        as: "scientificToolsRover",
    });

    // La réciproque, accéder aux Rovers possédant un même outil scientifique 
    // Accéder aux rovers qui ont un outils scientifique spécifique
    // Relation many-many

    RoverScientificTools.belongsToMany(Rover, {
        through: "tl_rover_scientific_tools",
        foreignKey: "rover_scientific_tools_id",
        otherKey: "rover_id",
        as: "roversWithThisScientificTool",
    });

    // -------------------------------------------------------------------------------

    // 3) Liaison entre rover et RoleRover. Cardinalités : Rover:1,N et RoleRover : 1,N
    // Accéder aux différents rôles d'un rover
    // Relation many-many

    Rover.belongsToMany(RoleRover, {
        through: "tl_role_rover",
        foreignKey: "rover_id",
        otherKey: "role_rover_id",
        as: "allRolesRover",
    });

    // la réciproque, accéder aux rovers qui ont le même rôle

    RoleRover.belongsToMany(Rover, {
        through: "tl_role_rover",
        foreignKey: "role_rover_id",
        otherKey: "rover_id",
        as: "allRoversForSameRole",
    });
    //----------------------------------------------------------------------------------------
    // 4) Liaison entre rover et type-rover. Cardinalités : Rover:1,N et TypeRover : 1,N
    // Accéder aux différents types d'un rover en partant du principe qu'un rover peut avoir plusieurs types (par exemple, exploration, transport, etc.)

    Rover.belongsToMany(TypeRover, {
        through: "tl_type_rover",
        foreignKey: "rover_id",
        otherKey: "type_rover_id",
        as: "typesRover",
    });

    // la réciproque, accéder aux rovers classés sous 1 même type

    TypeRover.belongsToMany(Rover, {
        through: "tl_type_rover",
        foreignKey: "type_rover_id",
        otherKey: "rover_id",
        as: "roversForSameType",
    });

}
