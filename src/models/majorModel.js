import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const majors = require("../../mfu_majors.json");

export const getAllMajors = () => majors;

export const getMajorById = (id) => {
  return majors.find((major) => String(major._id) === String(id));
};

export const detectMajorFromStudentId = (studentId) => {
  if (!/^\d{10}$/.test(studentId)) {
    return { error: "Student ID must contain exactly 10 digits" };
  }

  const majorCode = studentId.substring(3, 7);
  const major = getMajorById(majorCode);

  if (!major) {
    return { error: "Major not found", majorCode };
  }

  return {
    studentId,
    majorCode,
    name: major.name,
    alias: major.alias,
  };
};
