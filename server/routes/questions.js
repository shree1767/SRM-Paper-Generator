const express = require("express");
const router = express.Router();

const {
  addObjective,
  getObjective,
  addSubjective,
  getSubjective,
} = require("../controllers/questions");

router.get("/objective", getObjective);
router.post("/objective", addObjective);
router.get("/subjective", getSubjective);
router.post("/subjective", addSubjective);

module.exports = router;
