
import SpaceProbe from "./models/bases/SpaceProbe.js";
import ElementProbe from "./models/bases/ElementProbe.js";
import ProbeScientificTools from "./models/bases/ProbeScientificTools.js";
import RoleProbe from "./models/bases/RoleProbe.js";
import TypeProbe from "./models/bases/TypeProbe.js";
import Rover from "./models/bases/Rover.js";
import ElementRover from "./models/bases/ElementRover.js";
import RoverScientificTools from "./models/bases/RoverScientificTools.js";
import RoleRover from "./models/bases/RoleRover.js";
import TypeRover from "./models/bases/TypeRover.js";
import Mission from "./models/bases/Mission.js";
import EventMission from "./models/bases/EventMission.js";
import ScientificDiscovery from "./models/bases/ScientificDiscovery.js";
import AgencyEnterprise from "./models/bases/AgencyEnterprise.js";
import Country from "./models/bases/Country.js";
import TestedTechnology from "./models/bases/TestedTechnology.js";
import Publication from "./models/bases/Publication.js";
import CelestialObject from "./models/bases/CelestialObject.js";
import CelestialElement from "./models/bases/CelestialElement.js";


const models = {
    SpaceProbe,
    ElementProbe,
    ProbeScientificTools,
    RoleProbe,
    TypeProbe,
    Rover,
    ElementRover,
    RoverScientificTools,
    RoleRover,
    TypeRover,
    Mission,
    EventMission,
    ScientificDiscovery,
    AgencyEnterprise,
    Country,
    TestedTechnology,  
    Publication,
    CelestialObject,
    CelestialElement,
};

// Importation des associations de modèles
import associateSpaceProbeModels from './models/associations/associations_SpaceProbe.js';
import associateRoverModels from './models/associations/associations_Rover.js';
import associateMissionModels from './models/associations/associations_Mission.js'; 

associateMissionModels();
associateRoverModels();
associateSpaceProbeModels();

export default models;
