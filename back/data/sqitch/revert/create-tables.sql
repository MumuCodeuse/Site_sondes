-- Suppression des tables enfants
DROP TABLE IF EXISTS tl_element_rover CASCADE;
DROP TABLE IF EXISTS tl_probe_mission CASCADE;
DROP TABLE IF EXISTS tl_sonde_rover CASCADE;
DROP TABLE IF EXISTS tl_element_probe CASCADE;
DROP TABLE IF EXISTS tl_probe_scientific_tools CASCADE;
DROP TABLE IF EXISTS tl_role_probe CASCADE;
DROP TABLE IF EXISTS tl_type_probe CASCADE;
DROP TABLE IF EXISTS tl_agency_enterprise_mission CASCADE;

-- Suppression des tables parentes
DROP TABLE IF EXISTS rover CASCADE;
DROP TABLE IF EXISTS space_probe CASCADE;
DROP TABLE IF EXISTS element_probe CASCADE;
DROP TABLE IF EXISTS mission CASCADE;
DROP TABLE IF EXISTS agency_enterprise CASCADE;
DROP TABLE IF EXISTS country CASCADE;

-- Suppression des index
DROP INDEX IF EXISTS idx_space_probe_name;
DROP INDEX IF EXISTS idx_rover_name;
DROP INDEX IF EXISTS idx_space_probe_year_launch;
DROP INDEX IF EXISTS idx_probe_mission;
DROP INDEX IF EXISTS idx_probe_mission_rover;
