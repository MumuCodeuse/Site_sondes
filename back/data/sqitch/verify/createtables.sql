-- Verify site_sondes:create-tables on pg

BEGIN;

-- Vérifie que toutes les tables attendues existent
WITH expected_tables(name) AS (
    VALUES 
        ('space_probe'),
        ('element_probe'),
        ('tl_element_probe'),
        ('probe_scientific_tool'),
        ('tl_probe_scientific_tool'),
        ('role_probe'),
        ('tl_role_probe'),
        ('type_probe'),
        ('tl_type_probe'),
        ('rover'),
        ('element_rover'),
        ('tl_element_rover'),
        ('rover_scientific_tool'),
        ('tl_rover_scientific_tool'),
        ('role_rover'),
        ('tl_role_rover'),
        ('type_rover'),
        ('tl_type_rover'),
        ('mission'),
        ('tl_probe_mission'),
        ('event_mission'),
        ('tl_event_mission'),
        ('scientific_discovery'),
        ('agency_enterprise'),
        ('tl_agency_enterprise_mission'),
        ('country'),
        ('tl_agency_enterprise_country'),
        ('tested_technology'),
        ('tl_tested_tech_mission'),
        ('publication'),
        ('celestial_object'),
        ('tl_cel_obj_mission'),
        ('celestial_element'),
        ('celestial_element'),
        ('idx_space_probe_name'),
        ('idx_rover_name'),
        ('idx_space_probe_year_launch'),
        ('idx_cel_elemt_mission'),
        ('idx_probe_mission'),
        ('idx_probe_mission_rover')
)
SELECT name
FROM expected_tables
WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = name
);

ROLLBACK;

