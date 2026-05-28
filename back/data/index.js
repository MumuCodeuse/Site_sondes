
import SpaceProbe from "./models/bases/SpaceProbe.js";
import ElementProbe from "./models/bases/ElementProbe.js";
import ProbeScientificTool from "./models/bases/ProbeScientificTool.js";
import RoleProbe from "./models/bases/RoleProbe.js";
import TypeProbe from "./models/bases/TypeProbe.js";
import Rover from "./models/bases/Rover.js";
import ElementRover from "./models/bases/ElementRover.js";
import RoverScientificTool from "./models/bases/RoverScientificTool.js";
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

const modelsBase = {
    SpaceProbe,
    ElementProbe,
    ProbeScientificTool,
    RoleProbe,
    TypeProbe,
    Rover,
    ElementRover,
    RoverScientificTool,
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

import associateProbeModels from './models/associations/associations_SpaceProbe.js';
import associateRoverModels from './models/associations/associations_Rover.js';
import associateMissionModels from './models/associations/associations_Mission.js'; 

const modelsAssociation = {
    associateProbeModels,
    associateRoverModels,
    associateMissionModels
};

export { modelsBase, modelsAssociation };
