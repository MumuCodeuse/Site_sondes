ElementRover
BEGIN;
--Sondes spatiales
  CREATE TABLE space_probe (
    space_probe_id SERIAL PRIMARY KEY,
    space_probe_name VARCHAR(100) NOT NULL,
    space_probe_year_launch SMALLINT,
    space_probe_launcher VARCHAR(100),
    space_probe_objective TEXT,
    space_probe_comment TEXT,
    space_probe_operating_state VARCHAR(100),
    space_probe_means_propulsion_energy TEXT,
    space_probe_image_url VARCHAR(2083)
);

CREATE TABLE element_probe (
    element_probe_id SERIAL PRIMARY KEY,
    element_probe_name VARCHAR(200),
    element_probe_characteristic TEXT,
    element_probe_comment TEXT,
    element_probe_image_url VARCHAR(2083)
);

CREATE TABLE tl_element_probe (
    element_probe_id INT NOT NULL,
    space_probe_id INT NOT NULL,
    FOREIGN KEY (element_probe_id) REFERENCES element_probe(element_probe_id) ON DELETE CASCADE,
    FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE,
    PRIMARY KEY (space_probe_id, element_probe_id) -- clé composite
);

CREATE TABLE probe_scientific_tool (
    probe_scientific_tool_id SERIAL PRIMARY KEY,
    probe_scientific_tool_name VARCHAR(200),
    probe_scientific_tool_characteristic TEXT,
    probe_scientific_tool_comment TEXT,
    probe_scientific_tool_image_url VARCHAR(2083)
);

CREATE TABLE tl_probe_scientific_tool (
    probe_scientific_tool_id INT NOT NULL,
    space_probe_id INT NOT NULL,
    FOREIGN KEY (probe_scientific_tool_id) REFERENCES probe_scientific_tool(probe_scientific_tool_id) ON DELETE CASCADE,
    FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE,
    PRIMARY KEY (space_probe_id, probe_scientific_tool_id) -- clé composite
);

CREATE TABLE role_probe (
    role_probe_id SERIAL PRIMARY KEY,
    role_probe_name VARCHAR(200),
    role_probe_accuracy TEXT,
    role_probe_image_url VARCHAR(2083)
);

CREATE TABLE tl_role_probe (
    role_probe_id INT NOT NULL,
    space_probe_id INT NOT NULL,
    FOREIGN KEY (role_probe_id) REFERENCES role_probe(role_probe_id) ON DELETE CASCADE,
    FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE,
    PRIMARY KEY (space_probe_id, role_probe_id) -- clé composite
);

CREATE TABLE type_probe (
    type_probe_id SERIAL PRIMARY KEY,
    type_probe_name VARCHAR(200),
    type_probe_accuracy TEXT,
    type_probe_image_url TEXT
);

CREATE TABLE tl_type_probe (
    type_probe_id INT NOT NULL,
    space_probe_id INT NOT NULL,
    FOREIGN KEY (type_probe_id) REFERENCES type_probe(type_probe_id) ON DELETE CASCADE,
    FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE,
    PRIMARY KEY (space_probe_id, type_probe_id) -- clé composite
);

-- rover
CREATE TABLE rover (
    rover_id SERIAL PRIMARY KEY,
    space_probe_id INT,
    rover_name VARCHAR(200),
    rover_objective TEXT,
    rover_year_exploration SMALLINT,
    rover_comment TEXT,
    rover_means_propulsion_energy TEXT,
    rover_operating_state TEXT,
    rover_image_url VARCHAR(2083),
    FOREIGN KEY(space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE
);

CREATE TABLE element_rover (
    element_rover_id SERIAL PRIMARY KEY,
    element_rover_name VARCHAR(200),
    element_rover_characteristic TEXT,
    element_rover_comment TEXT,
    element_rover_image_url VARCHAR(2083)
);

CREATE TABLE tl_element_rover (
    element_rover_id INT NOT NULL,
    rover_id INT NOT NULL,
    FOREIGN KEY (element_rover_id) REFERENCES element_rover(element_rover_id) ON DELETE CASCADE,
    FOREIGN KEY (rover_id) REFERENCES rover(rover_id) ON DELETE CASCADE,
    PRIMARY KEY (rover_id, element_rover_id) -- clé composite
);

CREATE TABLE rover_scientific_tool (
    rover_scientific_tool_id SERIAL PRIMARY KEY,
    rover_scientific_tool_name VARCHAR(200),
    rover_scientific_tool_characteristic TEXT,
    rover_scientific_tool_comment TEXT,
    rover_scientific_tool_image_url VARCHAR(2083)
);

CREATE TABLE tl_rover_scientific_tool (
    rover_scientific_tool_id INT NOT NULL,
    rover_id INT NOT NULL,
    FOREIGN KEY (rover_scientific_tool_id) REFERENCES rover_scientific_tool(rover_scientific_tool_id) ON DELETE CASCADE,
    FOREIGN KEY (rover_id) REFERENCES rover(rover_id) ON DELETE CASCADE,
    PRIMARY KEY (rover_id, rover_scientific_tools_id) -- clé composite
);

CREATE TABLE role_rover (
    role_rover_id SERIAL PRIMARY KEY,
    role_rover_name VARCHAR(200),
    role_rover_accuracy TEXT,
    role_rover_image_url VARCHAR(2083)
);

CREATE TABLE tl_role_rover (
    role_rover_id INT NOT NULL,
    rover_id INT NOT NULL,
    FOREIGN KEY (role_rover_id) REFERENCES role_rover(role_rover_id) ON DELETE CASCADE,
    FOREIGN KEY (rover_id) REFERENCES rover(rover_id) ON DELETE CASCADE,
    PRIMARY KEY (rover_id, role_rover_id) -- clé composite
);

CREATE TABLE type_rover (
    type_rover_id SERIAL PRIMARY KEY,
    type_rover_name VARCHAR(200),
    type_rover_accuracy TEXT,
    type_rover_image_url TEXT
);

CREATE TABLE tl_type_rover (
    type_rover_id INT NOT NULL,
    rover_id INT NOT NULL,
    FOREIGN KEY (type_rover_id) REFERENCES type_rover(type_rover_id) ON DELETE CASCADE,
    FOREIGN KEY (rover_id) REFERENCES rover(rover_id) ON DELETE CASCADE,
    PRIMARY KEY (rover_id, type_rover_id) -- clé composite
);

-- Missions
CREATE TABLE mission (
    mission_id SERIAL PRIMARY KEY,
    mission_name VARCHAR(200),
    start_year SMALLINT,
    end_year SMALLINT,
    objective TEXT,
    mission_image_url VARCHAR(2083)
);

CREATE TABLE tl_probe_mission (
    mission_id INT NOT NULL,
    space_probe_id INT NOT NULL,
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE,
    FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE,
    PRIMARY KEY (space_probe_id, mission_id) -- clé composite
);

CREATE TABLE event_mission (
    event_mission_id SERIAL PRIMARY KEY,
    event_name VARCHAR(200),
    event_year SMALLINT,
    event_description TEXT,
    event_image_url VARCHAR(2083)
);
CREATE TABLE tl_event_mission (
    event_mission_id INT NOT NULL,
    mission_id INT NOT NULL,
    FOREIGN KEY (event_mission_id) REFERENCES event_mission(event_mission_id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE,
    PRIMARY KEY (event_mission_id, mission_id) -- clé composite
);

CREATE TABLE scientific_discovery (
    scientific_discovery_id SERIAL PRIMARY KEY,
    mission_id INT NOT NULL,
    discovery_year SMALLINT,
    discovery_expected TEXT,
    discovery_category TEXT,
    discovery_result TEXT,
    discovery_evolution_following TEXT,
    discovery_image_url VARCHAR(2083),
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE
    );

CREATE TABLE agency_enterprise (
    agency_id SERIAL PRIMARY KEY,
    agency_name VARCHAR(200),
    agency_description TEXT,
    agency_image_url VARCHAR(2083)
);

CREATE TABLE tl_agency_enterprise_mission (
    agency_id INT NOT NULL,
    space_probe_id INT NOT NULL,
    FOREIGN KEY (agency_id) REFERENCES agency_enterprise(agency_id) ON DELETE CASCADE,
    FOREIGN KEY (space_probe_id) REFERENCES space_probe(space_probe_id) ON DELETE CASCADE,
    PRIMARY KEY (space_probe_id, agency_id) -- clé composite
);

CREATE TABLE country (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(200)
);

CREATE TABLE tl_ag_enterp_country (
    agency_id INT NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (agency_id) REFERENCES agency_enterprise(agency_id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES country(country_id) ON DELETE CASCADE,
    PRIMARY KEY (agency_id, country_id) -- clé composite
);

CREATE TABLE tested_technology (
    tested_tech_id SERIAL PRIMARY KEY,
    tested_tech_name VARCHAR(200),
    tested_tech_description TEXT,
    tested_tech_accuracy TEXT,
    tested_tech_image_url VARCHAR(2083)
);

CREATE TABLE tl_tested_tech_mission (
    tested_tech_id INT NOT NULL,
    mission_id INT NOT NULL,
    FOREIGN KEY (tested_tech_id) REFERENCES tested_technology(tested_tech_id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE,
    PRIMARY KEY (mission_id, tested_tech_id) -- clé composite
);

CREATE TABLE publication (
    publication_id SERIAL PRIMARY KEY,
    mission_id INT NOT NULL,
    publication_subject TEXT,
    publication_date DATE,
    publication_authors_name VARCHAR(200),
    publication_journal TEXT,
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE
);

CREATE TABLE celestial_object (
    cel_obj_id SERIAL PRIMARY KEY,
    cel_obj_name VARCHAR(200),
    cel_obj_accuracy TEXT,
    cel_obj_comment TEXT,
    cel_obj_image_url VARCHAR(2083)
);

CREATE TABLE tl_cel_obj_mission (
    cel_obj_id INT NOT NULL,
    mission_id INT NOT NULL,
    FOREIGN KEY (cel_obj_id) REFERENCES celestial_object(cel_obj_id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE,
    PRIMARY KEY (mission_id, cel_obj_id) -- clé composite
);

CREATE TABLE celestial_element (
    cel_elemt_id SERIAL PRIMARY KEY,
    cel_elemt_name VARCHAR(200),
    cel_elemt_comment TEXT,
    cel_elemt_accuracy TEXT,
    cel_elemt_image_url VARCHAR(2083)
);


CREATE TABLE tl_cel_elemt_mission (
    cel_elemt_id INT NOT NULL,
    mission_id INT NOT NULL,
    FOREIGN KEY (cel_elemt_id) REFERENCES celestial_element(cel_elemt_id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES mission(mission_id) ON DELETE CASCADE,
    PRIMARY KEY (mission_id, cel_elemt_id) -- clé composite
);

CREATE INDEX idx_name_space_probe ON space_probe(name_space_probe); -- Recherche par nom de sonde
CREATE INDEX idx_name_rover ON rover(name_rover); -- Recherche par nom de rover
CREATE INDEX idx_year_launch_space_probe ON space_probe(year_launch_space_probe); -- Recherche par année de lancement de sonde
CREATE INDEX idx_cel_elemt_mission ON tl_cel_elemt_mission(cel_elemt_id, mission_id); --missions associées à un élément céleste donné
CREATE INDEX idx_probe_mission ON tl_probe_mission(mission_id, space_probe_id);--sonde associée à une mission spécifique
CREATE INDEX idx_probe_mission_rover ON tl_probe_mission(mission_id, rover_id);--rover associées à une mission spécifique

COMMIT;