const { Router } = require("express");
const router = Router();
// const movieRoutes = require("./movies.routes.js");
const userRoutes = require("./users.routes.js");
const moviesRoute = require("./movies.routes.js")
const studentRoute = require("./student.routes.js")
router.use("/user", userRoutes);
router.use("/movie", moviesRoute);
// router.use("/student", studentRoute);

module.exports = router;
