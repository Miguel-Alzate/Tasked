-- Elimina y crea la base de datos (esto se hace fuera del script si usas psql)
-- DROP DATABASE IF EXISTS tasked;
-- CREATE DATABASE tasked;
-- \c tasked  -- Conectarse a la base de datos

-- Extensión para usar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE modules (
    module_id UUID PRIMARY KEY,
    module_name VARCHAR(50) NOT NULL,
    module_description TEXT NOT NULL
);

CREATE TABLE roles (
    role_id UUID PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_description TEXT NOT NULL
);

CREATE TABLE permissions (
    module_id UUID NOT NULL,
    role_id UUID NOT NULL,
    p_insert BOOLEAN NOT NULL DEFAULT FALSE,
    p_view BOOLEAN NOT NULL DEFAULT FALSE,
    p_update BOOLEAN NOT NULL DEFAULT FALSE,
    p_delete BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (module_id, role_id),
    FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tasks (
    task_id UUID PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    task_description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    priority VARCHAR(10) NOT NULL DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'high')),
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE task_assignments (
    assignment_id UUID PRIMARY KEY,
    task_id UUID NOT NULL,
    assigned_to UUID NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE groups (
    group_id UUID PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL UNIQUE,
    group_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
    group_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserciones
INSERT INTO modules (module_id, module_name, module_description) VALUES
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', 'User Management', 'Manage users and their roles'),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', 'Task Management', 'Manage tasks and their assignments'),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', 'Role Management', 'Manage roles and permissions'),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', 'Permission Management', 'Manage permissions for each role');

INSERT INTO roles (role_id, role_name, role_description) VALUES
('5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', 'Admin', 'Administrator with full access'),
('d2a39a1d-5244-4e8d-bc92-26fd13d59235', 'Manager', 'Manager with limited access'),
('11f94b9b-54e6-4269-b3b0-7270f2783a8f', 'Employee', 'Employee with basic access');

INSERT INTO permissions (module_id, role_id, p_insert, p_view, p_update, p_delete) VALUES
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', TRUE, TRUE, TRUE, TRUE),
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', FALSE, TRUE, FALSE, FALSE),
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', FALSE, FALSE, FALSE, FALSE),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', TRUE, TRUE, TRUE, TRUE),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', TRUE, TRUE, TRUE, TRUE),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', FALSE, TRUE, TRUE, FALSE),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', TRUE, TRUE, TRUE, TRUE),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', FALSE, FALSE, FALSE, FALSE),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', FALSE, FALSE, FALSE, FALSE),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', TRUE, TRUE, TRUE, TRUE),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', FALSE, FALSE, FALSE, FALSE),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', FALSE, FALSE, FALSE, FALSE);
