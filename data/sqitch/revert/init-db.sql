-- Revert site_sondes:init-db from pg

BEGIN;

-- Suppression des index en premier
DROP INDEX IF EXISTS idx_probe_mission_rover;
DROP INDEX IF EXISTS idx_probe_mission;
DROP INDEX IF EXISTS idx_cel_elemt_mission;
DROP INDEX IF EXISTS idx_year_launch_space_probe;
DROP INDEX IF EXISTS idx_name_rover;
DROP INDEX IF EXISTS idx_name_space_probe;

-- Suppression des tables dépendantes (celles qui contiennent des clés étrangères)
DROP TABLE IF EXISTS tl_cel_elemt_mission CASCADE;
DROP TABLE IF EXISTS celestial_element CASCADE;
DROP TABLE IF EXISTS tl_cel_obj_mission CASCADE;
DROP TABLE IF EXISTS celestial_object CASCADE;
DROP TABLE IF EXISTS publication CASCADE;
DROP TABLE IF EXISTS tl_tested_tech_mission CASCADE;
DROP TABLE IF EXISTS tested_technology CASCADE;
DROP TABLE IF EXISTS tl_ag_enterp_country CASCADE;
DROP TABLE IF EXISTS country CASCADE;
DROP TABLE IF EXISTS tl_agency_enterprise_mission CASCADE;
DROP TABLE IF EXISTS agency_enterprise CASCADE;
DROP TABLE IF EXISTS scientific_discovery CASCADE;
DROP TABLE IF EXISTS tl_event_mission CASCADE;
DROP TABLE IF EXISTS event_mission CASCADE;
DROP TABLE IF EXISTS tl_probe_mission CASCADE;
DROP TABLE IF EXISTS mission CASCADE;

-- Suppression des tables liées aux rovers
DROP TABLE IF EXISTS tl_type_rover CASCADE;
DROP TABLE IF EXISTS type_rover CASCADE;
DROP TABLE IF EXISTS tl_role_rover CASCADE;
DROP TABLE IF EXISTS role_rover CASCADE;
DROP TABLE IF EXISTS tl_rover_scientific_tools CASCADE;
DROP TABLE IF EXISTS rover_scientific_tools CASCADE;
DROP TABLE IF EXISTS tl_element_rover CASCADE;
DROP TABLE IF EXISTS element_rover CASCADE;
DROP TABLE IF EXISTS tl_sonde_rover CASCADE;
DROP TABLE IF EXISTS rover CASCADE;

-- Suppression des tables liées aux sondes spatiales
DROP TABLE IF EXISTS tl_type_probe CASCADE;
DROP TABLE IF EXISTS type_probe CASCADE;
DROP TABLE IF EXISTS tl_role_probe CASCADE;
DROP TABLE IF EXISTS role_probe CASCADE;
DROP TABLE IF EXISTS tl_probe_scientific_tools CASCADE;
DROP TABLE IF EXISTS probe_scientific_tools CASCADE;
DROP TABLE IF EXISTS tl_element_probe CASCADE;
DROP TABLE IF EXISTS element_probe CASCADE;
DROP TABLE IF EXISTS space_probe CASCADE;

COMMIT;
