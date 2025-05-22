require('dotenv').config();

// Role configuration
const ROLE_IDS = {
    ADMIN: process.env.ADMIN_ROLE_ID,
    MANAGER: process.env.MANAGER_ROLE_ID,
    EMPLOYEE: process.env.EMPLOYEE_ROLE_ID
};

// Function to get the default role ID
const getDefaultRoleId = () => {
    return ROLE_IDS.EMPLOYEE;
};

// Function to check if a role ID is valid
const isValidRoleId = (roleId) => {
    return Object.values(ROLE_IDS).includes(roleId);
};

// Function to get the role name by ID
const getRoleNameById = (roleId) => {
    const roleMap = {
        [ROLE_IDS.ADMIN]: 'Admin',
        [ROLE_IDS.MANAGER]: 'Manager',
        [ROLE_IDS.EMPLOYEE]: 'Employee'
    };
    return roleMap[roleId];
};

module.exports = {
    ROLE_IDS,
    getDefaultRoleId,
    isValidRoleId,
    getRoleNameById
};