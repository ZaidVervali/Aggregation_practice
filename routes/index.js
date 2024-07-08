const { Router } = require("express");
const router = Router();
// const movieRoutes = require("./movies.routes.js");
const userRoutes = require("./users.routes.js");
router.use("/user", userRoutes);

module.exports = router;
