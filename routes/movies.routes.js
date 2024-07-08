const express = require("express");
const {
  getAllStudents,

} = require("../controller/movies.controller");
const router = express.Router();

router.get("/getAllStudents", getAllStudents);


module.exports = router;
