import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const majors = require("../mfu_majors.json");
// Adjust the path if your JSON file is in a different folder.

export const detectMajorFromStudentId = (studentIdOrEmail) => {
  if (!studentIdOrEmail || typeof studentIdOrEmail !== "string") {
    return { error: "Student ID or email is required" };
  }

  const input = studentIdOrEmail.trim();

  // Extract student ID from an MFU email if provided
  let studentId = input;

  if (input.includes("@")) {
    const emailMatch = input.match(
      /^(\d{10})@lamduan\.mfu\.ac\.th$/i
    );

    if (!emailMatch) {
      return { error: "Invalid MFU email format" };
    }

    studentId = emailMatch[1];
  }

  // Validate student ID
  if (!/^\d{10}$/.test(studentId)) {
    return {
      error: "Student ID must contain exactly 10 digits",
    };
  }

  // Example: 6831503026 -> 1503 (student ID positions 4-7, 1-based)
  const majorCode = studentId.substring(3, 7);

  const major = majors.find(
    (item) => String(item._id) === majorCode
  );

  if (!major) {
    return {
      error: "Major not found",
      majorCode,
    };
  }

  return {
    studentId,
    majorCode,
    name: major.name,
    alias: major.alias,
  };
};