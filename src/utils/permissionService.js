// src/utils/permissionService.js
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "./storage";

// Default all permissions to FALSE
export const DEFAULT_EA_PERMISSIONS = {
  subjectApproval: false,
  preferenceApproval: false,
  courseApproval: false,
  timetableGeneration: false,
  viewReports: false,
  manageFaculty: false,
  viewAllData: false
};

// Get EA permissions
export const getEAPermissions = () => {
  try {
    const permissions = loadFromStorage(STORAGE_KEYS.EA_PERMISSIONS, DEFAULT_EA_PERMISSIONS);
    console.log("getEAPermissions - loaded:", permissions);
    return permissions;
  } catch (error) {
    console.error("Error loading EA permissions:", error);
    return DEFAULT_EA_PERMISSIONS;
  }
};

// Save EA permissions
export const saveEAPermissions = (permissions) => {
  try {
    saveToStorage(STORAGE_KEYS.EA_PERMISSIONS, permissions);
    console.log("saveEAPermissions - saved:", permissions);
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (error) {
    console.error("Error saving EA permissions:", error);
    return false;
  }
};

// Update a single permission
export const updateEAPermission = (key, value) => {
  const permissions = getEAPermissions();
  const updatedPermissions = { ...permissions, [key]: value };
  saveEAPermissions(updatedPermissions);
  return updatedPermissions;
};

// Check if EA has a specific permission
export const hasEAPermission = (permissionKey) => {
  const permissions = getEAPermissions();
  return permissions[permissionKey] === true;
};