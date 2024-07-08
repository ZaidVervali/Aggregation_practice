const { Router } = require("express");
const router = Router();
// const movieRoutes = require("./movies.routes.js");
const userRoutes = require("./users.routes.js");
const moviesRoute = require("./movies.routes.js")
router.use("/user", userRoutes);
router.use("/movie", moviesRoute);

module.exports = router;
