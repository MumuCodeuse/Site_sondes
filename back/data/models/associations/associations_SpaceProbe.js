//ALTER TABLE rover ADD COLUMN space_probe_id INT;
//ALTER TABLE rover ADD CONSTRAINT fk_space_probe FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id);

import SpaceProbe from "../bases/SpaceProbe.js";
import ElementProbe from "../bases/ElementProbe.js";
import ProbeScientificTools from "../bases/ProbeScientificTools.js";
import RoleProbe from "../bases/RoleProbe.js";
import TypeProbe from "../bases/TypeProbe.js";
import Rover from "../bases/Rover.js";


export default function associateProbeModels() {

    // 1) Liaison entre space_probe et rover. Cardinalités : SP:1,N; Rover:1,1.
    // Pour accéder à la liste des rovers d'une sonde
    SpaceProbe.hasMany(Rover, {
        foreignKey: "space_probe_id",
        as: "RoversOfSpaceProbe",
    });
    // La reciproque de la relation. Pour accéder à la sonde d'un rover
    Rover.belongsTo(SpaceProbe, {
        foreignKey: "space_probe_id",
        as: "spaceProbeOfThisRover",
    });
    //----------------------------------

    // 2) Liaison entre space_probe et element_probe. Cardinalités : SP:N,N; ElementProbe:1,N.
    // Pour accéder à la liste des éléments d'une sonde
    // Relation many-many
    SpaceProbe.belongsToMany(ElementProbe, {
        through: "tl_element_probe", // Sequelize utilisera la table de liaison SQL existante et n'en recréera pas une nouvelle
        foreignKey: "space_probe_id",
        otherKey: "element_probe_id",
        as: "elementsProbe",
    });

    // La reciproque de la relation. Pour accéder à un type d'élément utilisé par plusieurs sondes
    ElementProbe.belongsToMany(SpaceProbe, {
        through: "tl_element_probe",
        foreignKey: "element_probe_id",
        otherKey: "space_probe_id",
        as: "elementProbes",
    });
    // -----------------------------------

    // 3) Liaison entre space_probe et probe_scientific_tools. Cardinalités : SP:1,N; ProbeScientificTool:1,N.
    // Pour accéder à la liste des outils scientifiques d'une sonde
    // Relation many-many
    SpaceProbe.belongsToMany(ProbeScientificTools, {
        through: "tl_probe_scientific_tools",
        foreignKey: "space_probe_id",
        otherKey: "probe_scientific_tool_id",
        as: "scientificToolsProbe",
    });

    // La reciproque de la relation. Pour accéder à la liste des sondes utilisant un même type d'outil scientifique
    ProbeScientificTools.belongsToMany(SpaceProbe, {
        through: "tl_probe_scientific_tools",
        foreignKey: "probe_scientific_tool_id",
        otherKey: "space_probe_id",
        as: "spaceProbes",
    });
    //-----------------------------------
    // 4) Liaison entre SpaceProbe et role_Probe. cardinalités : SP:1,N; RoleProbe:1,N.
    // Pour accéder à la liste des rôles d'une sonde
    // Relation many-many
    SpaceProbe.belongsToMany(RoleProbe, {
        through: "tl_role_probe",
        foreignKey: "space_probe_id",
        otherKey: "role_probe_id",
        as: "roleProbes",
    });

    // La reciproque de la relation. Pour accéder aux sondes qui partagent ou ont partagé un même rôle.
    RoleProbe.belongsToMany(SpaceProbe, {
        through: "tl_role_probe",
        foreignKey: "role_probe_id",
        otherKey: "space_probe_id",
        as: "spaceProbes",
    });
    //-----------------------------------

    // 5) Liaison entre SpaceProbe et TypeProbe. Cardinalités : SP:1,N; TypeProbe:1,N.
    // Pour accéder à la liste des types d'une sonde
    // Relation many-many
    SpaceProbe.belongsToMany(TypeProbe, {
        through: "tl_type_probe",
        foreignKey: "space_probe_id",
        otherKey: "type_probe_id",
        as: "typeProbes",
    });

    // La reciproque. Pour obtenir ttes les sondes classées sous un même type
    TypeProbe.belongsToMany(SpaceProbe, {
        through: "tl_type_probe",
        foreignKey: "type_probe_id",
        otherKey: "space_probe_id",
        as: "spaceProbes",
    });


}