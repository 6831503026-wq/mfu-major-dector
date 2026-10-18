import express from "express";
import {
  home,
  getMajors,
  getMajorByCode,
  detectMajor,
} from "../controllers/majorController.js";
import { detectMajorFromStudentId } from "../../services/majorDetector.js";

const router = express.Router();

router.get("/api", home);
router.get("/api/majors", getMajors);
router.get("/api/majors/:id", getMajorByCode);
router.get("/api/detect-major/:studentId", detectMajor);

router.post("/detect-major", (req, res) => {
  const { studentId } = req.body;
  const result = detectMajorFromStudentId(studentId);

  if (result.error) {
    return res.render("index", {
      result: null,
      error: result.error,
      input: studentId || "",
    });
  }

  return res.render("index", {
    result,
    error: null,
    input: studentId || "",
  });
});

export default router;
