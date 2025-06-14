
import Mission from "../bases/Mission.js";
import ScientificDiscovery from "../bases/ScientificDiscovery.js";
import EventMission from "../bases/EventMission.js";
import AgencyEnterprise from "../bases/AgencyEnterprise.js";
import TestedTechnology from "../bases/TestedTechnology.js";
import CelestialObject from "../bases/CelestialObject.js";
import CelestialElement from "../bases/CelestialElement.js";
import Publication from "../bases/Publication.js";
import Country from "../bases/Country.js";


export default function associateMissionModels() {

    // 1) liaison entre Mission et EventMission. Cardinalités, Mission: 0,N et EventMission: 0,N. Une mission qui a avorté n' pas d'événement,
    // obtenir tous les événements d'une mission
    Mission.belongsToMany(EventMission, {
        through: "tl_event_mission",
        foreignKey:"mission_id",
        otherKey: "event_mission_id",
        as: "eventsMission"
    });

    // La réciproque : accéder à un événement qui peut concerner plusieurs missions.

    EventMission.belongsToMany(Mission, {
        through: "tl_event_mission",
        foreignKey: "event_mission_id",
        otherKey: "mission_id",
        as: "eventConcernMissions"
    });
    // ----------------------------------------------------------------------------------------
    // 2) Liaison entre Mission et ScientificDiscovery. Cardinalités, Mission: 0,N et ScientificDiscovery: 1,1
    // Pour accéder à la liste des découvertes scientifiques d'une mission
    // Relation many-one
    Mission.hasMany(ScientificDiscovery, {
        foreignKey: "mission_id",
        as: "scientificDiscoveriesMission"
    });

    // La réciproque : une découverte scientifique appartient à une seule mission.
    ScientificDiscovery.belongsTo(Mission, {
        foreignKey: "mission_id",
        as: "missionAboutScientificDiscovery"
    });
    // ------------------------------------------------------------------------------------------
    // 3) Liaison entre Mission et Publication. Cardinalités, Mission: 0,N et Publication: 1,1
    // Un mission peut ne faire l'objet d'aucune publication ou alors plusieurs
    Mission.hasMany(Publication, {
        foreignKey: "mission_id",
        as: "publicationsAboutMission"
    });

    // La réciproque : mais une publication concerne toujours une mission.
    Publication.belongsTo(Mission, {
        foreignKey: "mission_id",
        as: "missionPublication"
    });

    // ------------------------------------------------------------------------------------------
    // 4) Liaison entre Mission et une organisation  :  AgencyEnterprise. Cardinalité, Mission: 1,N et AgencyEnterprise: 1,N
    // Une mission peut être menée par une organisation rassemblant plusieurs agences voir aussi des entreprises privées. 

    Mission.belongsToMany(AgencyEnterprise, {
        through: "tl_agency_enterprise_mission",
        foreignKey: "mission_id",
        otherKey: "agency_id",
        as: "agenciesMission"
    });

    // La réciproque : une organisation peut mener plusieurs missions.
    AgencyEnterprise.belongsToMany(Mission, {
        through: "tl_agency_enterprise_mission",
        foreignKey:"agency_id",
        otherKey: "mission_id",
        as: "missionsForAgency"
    });

    // -------------------------------------------------------------------------------

    //5) Liaison entre AgencyEnterprise et Country. Une organisation peut appartenir a un seul pays vois plusieurs
    AgencyEnterprise.belongsToMany(Country, {
        through: "tl_ag_enterp_country",
        foreignKey: "agency_id",
        otherKey: "country_id",
        as: "countriesForAgency"
    });

    // La réciproque un pays peut avoir 1 seul organisation voir plusieurs
    Country.belongsToMany(AgencyEnterprise, {
        through: "tl_ag_enterp_country",
        foreignKey: "country_id",
        otherKey: "agency_id",
        as: "agenciesForCountry"
    });
    // ------------------------------------------------------------------------------------------
    // 6) Liaison entre Mission et TestedTechnology. Cardinalité, Mission: 0,N et TestedTechnology: 1,N
    // Une mission peut ne pas tester de technologie ou alors plusieurs.
    // Pour accéder à la liste des technologies testées lors d'une mission
    Mission.belongsToMany(TestedTechnology, {
        through: "tl_tested_tech_mission",
        foreignKey: "mission_id",
        otherKey: "tested_tech_id",
        as: "testedTechnologiesMission"
    });

    // La réciproque : une techno peut être testée au moins lors d'une mission voir sur plusieurs missions.
    TestedTechnology.belongsToMany(Mission, {
        through: "tl_tested_tech_mission",
        foreignKey: "tested_tech_id",
        otherKey: "mission_id",
        as: "missionsForTestedTechnology"
    });

    // ------------------------------------------------------------------------------------------
    // 7) Liaison entre Mission et CelestialObject. Cardinalité, Mission: 0,N et CelestialObject: 0,N
    // Une mission peut ne pas concerner d'objet céleste ou alors plusieurs.
    // Pour accéder à la liste des objets célestes concernés par une mission
    Mission.belongsToMany(CelestialObject, {
        through: "tl_cel_obj_mission",
        foreignKey: "mission_id",
        otherKey: "cel_obj_id",
        as: "celestialObjectsMission"
    });

    // La réciproque un objet celeste ne peut n'être concerné par aucune mission ou alors plusieurs
    // Pour accéder à la liste des missions qui concernent un objet céleste
    CelestialObject.belongsToMany(Mission, {
        through:"tl_cel_obj_mission",
        foreignKey:"cel_obj_id",
        otherKey:"mission_id",
        as:"missionsForCelestialObject"
    });

    // ------------------------------------------------------------------------------------------
    // 8) Liaison entre Mission et CelestialElement. Cardinalité, Mission: 0,N et CelestialElement: 0,N
    // Une mission peut ne pas concerner d'élément céleste ou alors plusieurs.
    // Pour accéder à la liste des éléments célestes concernés par une mission    
    Mission.belongsToMany(CelestialElement, {
        through:"tl_cel_elemt_mission",
        foreignKey:"mission_id",
        otherKey:"cel_elemt_id",
        as:"celestialElementsMission"
    });

    // La réciproque un élément céleste ne peut n'être concerné par aucune mission ou alors plusieurs
    // Pour accéder à la liste des missions qui concernent un élément céleste
    CelestialElement.belongsToMany(Mission, {
        through:"tl_cel_elemt_mission",
        foreignKey:"cel_elemt_id",
        otherKey:"mission_id",
        as:"missionsForCelestialElement"
    });

};




