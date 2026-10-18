import { getAllMajors, getMajorById } from "../models/majorModel.js";
import { detectMajorFromStudentId } from "../../services/majorDetector.js";

export const getMajors = (req, res) => {
  const majors = getAllMajors();

  return res.json({
    success: true,
    count: majors.length,
    data: majors,
  });
};

export const getMajorByCode = (req, res) => {
  const major = getMajorById(req.params.id);

  if (!major) {
    return res.status(404).json({
      success: false,
      message: "Major not found",
    });
  }

  return res.json({
    success: true,
    data: major,
  });
};

export const detectMajor = (req, res) => {
  const result = detectMajorFromStudentId(req.params.studentId);

  if (result.error) {
    const status = result.error === "Major not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: result.error,
      ...(result.majorCode ? { majorCode: result.majorCode } : {}),
    });
  }

  return res.json({
    success: true,
    ...result,
  });
};

export const home = (req, res) => {
  return res.json({
    success: true,
    message: "MFU Major Detector API is running",
  });
};
