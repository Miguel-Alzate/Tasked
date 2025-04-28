DROP DATABASE IF EXISTS tasked;
CREATE DATABASE tasked DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE tasked;

CREATE TABLE modules (
    module_id VARCHAR(36) NOT NULL,
    module_name VARCHAR(50) NOT NULL,
    module_description TEXT NOT NULL,
    PRIMARY KEY (module_id)
);

CREATE TABLE roles (
    role_id VARCHAR(36) NOT NULL,
    role_name VARCHAR(50) NOT NULL,
    role_description TEXT NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE permissions (
    module_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    p_insert TINYINT(1) NOT NULL DEFAULT 0,
    p_view TINYINT(1) NOT NULL DEFAULT 0,
    p_update TINYINT(1) NOT NULL DEFAULT 0,
    p_delete TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (module_id, role_id),
    FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users (
    user_id VARCHAR(36) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE INDEX username_UNIQUE (user_name ASC),
    UNIQUE INDEX email_UNIQUE (email ASC) 
);

CREATE TABLE tasks (
    task_id VARCHAR(36) NOT NULL,
    task_name VARCHAR(100) NOT NULL,
    task_description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low',
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id),
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE task_assignments (
    assignment_id VARCHAR(36) NOT NULL,
    task_id VARCHAR(36) NOT NULL,
    assigned_to VARCHAR(36) NOT NULL,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (task_id) REFERENCES tasks (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE groups (
    group_id VARCHAR(36) NOT NULL,
    group_name VARCHAR(100) NOT NULL,
    group_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id),
    UNIQUE INDEX group_name_UNIQUE (group_name ASC)
);

CREATE TABLE group_members (
    group_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO modules (module_id, module_name, module_description) VALUES
("1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a", 'User Management', 'Manage users and their roles'),
("7bdb9c6e-2e5b-4fa9-a663-837f7d69db28", 'Task Management', 'Manage tasks and their assignments'),
("c234f105-fbfa-489e-9f43-1fd8cf2ea5f3", 'Role Management', 'Manage roles and permissions'),
("f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3", 'Permission Management', 'Manage permissions for each role');

INSERT INTO roles (role_id, role_name, role_description) VALUES
("5f09c5ea-b4c4-45ed-8f4a-5901d99be72e", 'Admin', 'Administrator with full access'),
("d2a39a1d-5244-4e8d-bc92-26fd13d59235", 'Manager', 'Manager with limited access'),
("11f94b9b-54e6-4269-b3b0-7270f2783a8f", 'Employee', 'Employee with basic access');

INSERT INTO permissions (module_id, role_id, p_insert, p_view, p_update, p_delete) VALUES
("1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a", "5f09c5ea-b4c4-45ed-8f4a-5901d99be72e", 1, 1, 1, 1),
("1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a", "d2a39a1d-5244-4e8d-bc92-26fd13d59235", 0, 1, 0, 0),
("1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a", "11f94b9b-54e6-4269-b3b0-7270f2783a8f", 0, 0, 0, 0),
("7bdb9c6e-2e5b-4fa9-a663-837f7d69db28", "5f09c5ea-b4c4-45ed-8f4a-5901d99be72e", 1, 1, 1, 1),
("7bdb9c6e-2e5b-4fa9-a663-837f7d69db28", "d2a39a1d-5244-4e8d-bc92-26fd13d59235", 1, 1, 1, 1),
("7bdb9c6e-2e5b-4fa9-a663-837f7d69db28", "11f94b9b-54e6-4269-b3b0-7270f2783a8f", 0, 1, 1, 0),
("c234f105-fbfa-489e-9f43-1fd8cf2ea5f3", "5f09c5ea-b4c4-45ed-8f4a-5901d99be72e", 1, 1, 1, 1),
("c234f105-fbfa-489e-9f43-1fd8cf2ea5f3", "d2a39a1d-5244-4e8d-bc92-26fd13d59235", 0, 0, 0, 0),
("c234f105-fbfa-489e-9f43-1fd8cf2ea5f3", "11f94b9b-54e6-4269-b3b0-7270f2783a8f", 0, 0, 0, 0),
("f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3", "5f09c5ea-b4c4-45ed-8f4a-5901d99be72e", 1, 1, 1, 1),
("f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3", "d2a39a1d-5244-4e8d-bc92-26fd13d59235", 0, 0, 0, 0),
("f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3", "11f94b9b-54e6-4269-b3b0-7270f2783a8f", 0, 0, 0 ,0);