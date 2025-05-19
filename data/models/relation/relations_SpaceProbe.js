//ALTER TABLE rover ADD COLUMN space_probe_id INT;
//ALTER TABLE rover ADD CONSTRAINT fk_space_probe FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id);


import SpaceProbe from "../base/SpaceProbe.js";
import ElementProbe from "../base/ElementProbe.js";
import ProbeScientificTools from "../base/ProbeScientificTools.js";
import RoleProbe from "../base/RoleProbe.js";
import TypeProbe from "../base/TypeProbe.js";
import Rover from "../base/Rover.js";

// 1) Liaison entre space_probe et rover. Cardinalités : SP:1,N; Rover:1,1.
// Pour accéder à la liste des rovers d'une sonde 
SpaceProbe.hasMany(Rover, {
    foreignKey: 'space_probe_id',
    as: 'rovers'
});
// La reciproque de la relation. Pour accéder à la sonde d'un rover 
Rover.belongsTo(SpaceProbe, {
    foreignKey: 'space_probe_id',
    as: 'space_probe'
});
//----------------------------------

// 2) Liaison entre space_probe et element_probe. Cardinalités : SP:N,N; ElementProbe:1,N.
// Pour accéder à la liste des éléments d'une sonde 
// Relation many-many
SpaceProbe.belongsToMany(ElementProbe, {
    through: 'tl_element_probe', // Sequelize utilisera la table de liaison SQL existante et n'en recréera pas une nouvelle
    foreignKey: 'space_probe_id',
    otherKey: 'element_probe_id',
    as: 'element_probes'
});

// La reciproque de la relation. Pour accéder à la sonde d'un élément
ElementProbe.belongsToMany(SpaceProbe, {
    through: 'tl_element_probe', 
    foreignKey: 'element_probe_id',
    otherKey: 'space_probe_id',
    as: 'space_probes'
});
// -----------------------------------

// 3) Liaison entre space_probe et probe_scientific_tools. Cardinalités : SP:1,N; ProbeScientificTool:1,N. 
// Pour accéder à la liste des outils scientifiques d'une sonde
// Relation many-many
SpaceProbe.belongsToMany(ProbeScientificTools, {
    through: 'tl_probe_scientific_tools', 
    foreignKey: 'space_probe_id',
    otherKey: 'probe_scientific_tool_id',
    as: 'scientific_tools'
});


// La reciproque de la relation. Pour accéder à la sonde d'un outil scientifique
ProbeScientificTools.belongsToMany(SpaceProbe, {
    through: 'tl_probe_scientific_tools', 
    foreignKey: 'probe_scientific_tool_id',
    otherKey: 'space_probe_id',
    as: 'space_probes'
});
//-----------------------------------
// 4) Liaison entreSpaceProbe et role_Probe. cardinalités : SP:1,N; RoleProbe:1,N.
// Pour accéder à la liste des rôles d'une sonde
// Relation many-many
SpaceProbe.belongsToMany(RoleProbe, {
    through: 'tl_role_probe',
    foreignKey: 'space_probe_id',
    otherKey: 'role_probe_id',
    as: 'role_probes'
});

// La reciproque de la relation. Pour accéder aux sondes ayant un même rôle.
RoleProbe.belongsToMany(SpaceProbe, {
    through: 'tl_role_probe',
    foreignKey: 'role_probe_id',
    otherKey: 'space_probe_id',
    as: 'space_probes'
});
//-----------------------------------

// 5) Liaison entre SpaceProbe et TypeProbe. Cardinalités : SP:1,N; TypeProbe:1,N.
// Pour accéder à la liste des types d'une sonde
// Relation many-many
SpaceProbe.belongsToMany(TypeProbe, {
    through: 'tl_type_probe',
    foreignKey: 'space_probe_id',
    otherKey: 'type_probe_id',
    as: 'type_probes'

});

// La reciproque. Pour acceder à la liste des sondes d'un même type
TypeProbe.belongsToMany(SpaceProbe, {
    through: 'tl_type_probe',
    foreignKey: 'type_probe_id',
    otherKey: 'space_probe_id',
    as: 'space_probes'
});
//-----------------------------------

