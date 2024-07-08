const express = require("express");
const {
  groupByGender ,getTotalCount,getAgeRange,getTotalData
} = require("../controller/user.controller.js");
const router = express.Router();

// router.get("/getAllStudents", getAllUsers);
// router.get("/getAllUser", getAllUsers);
router.get("/groupByGender", groupByGender);
router.get("/getTotalCount", getTotalCount);
router.get("/getTotalData", getTotalData);
router.get("/getAgeRange", getAgeRange);


module.exports = router;
