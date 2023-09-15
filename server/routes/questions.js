const express = require("express");
const router = express.Router();

const { addMCQ, getMCQ } = require("../controllers/questions");

router.post("/mcq", addMCQ);
router.get("/mcq", getMCQ);

module.exports = router;
