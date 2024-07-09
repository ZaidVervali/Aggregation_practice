const express = require("express");
const {
  getAllMovies,
  getMoviesByRange,
  getMoviesAfterYear,
  getMovieCountByYear,
  getTopNMovies,
  getMoviesWithDirectors,
  getAverageReleaseYear,
  getMoviesGroupedByDecade,
  getDetailedMoviesData
} = require("../controller/movies.controller");

const router = express.Router();

// Define the routes and map them to the corresponding controller functions
router.get("/getAllMovies", getAllMovies);
router.get("/getMoviesByRange", getMoviesByRange);
router.get("/getMoviesAfterYear/:year", getMoviesAfterYear); // Example: /getMoviesAfterYear/2000
router.get("/getMovieCountByYear", getMovieCountByYear);
router.get("/getTopNMovies/:limit", getTopNMovies); // Example: /getTopNMovies/5
router.get("/getMoviesWithDirectors", getMoviesWithDirectors);
router.get("/getAverageReleaseYear", getAverageReleaseYear);
router.get("/getMoviesGroupedByDecade", getMoviesGroupedByDecade);
router.get("/getDetailedMoviesData", getDetailedMoviesData);

module.exports = router;
