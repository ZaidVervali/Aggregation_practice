const Movie = require('./movie.model');

// Get all movies with basic projection
const getAllMovies = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          yearOfRelease: 1
        }
      }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get movies by year range with bucket aggregation
const getMoviesByRange = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $bucket: {
          groupBy: "$yearOfRelease",
          boundaries: [1990, 2010, 2050],
          default: "not in range",
          output: {
            countBy: { $sum: 1 },
            names: { $push: ["$name", "$year"] }
          }
        }
      }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get movies released after a specific year
const getMoviesAfterYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const data = await Movie.aggregate([
      { $match: { yearOfRelease: { $gt: parseInt(year) } } },
      { $project: { _id: 0, name: 1, yearOfRelease: 1 } }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get count of movies by year of release
const getMovieCountByYear = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $group: {
          _id: "$yearOfRelease",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $group: {
          _id: null,
          data: { $push: { yearOfRelease: "$_id", count: "$count" } },
          totalCount: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          data: 1,
          totalCount: 1
        }
      }
    ]);
    
    res.status(200).json({ message: "Success", data: data });
    
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get top N movies sorted by year of release
const getTopNMovies = async (req, res, next) => {
  try {
    const { limit } = req.params;
    const data = await Movie.aggregate([
      { $sort: { yearOfRelease: -1 } }, // Sort by year of release in descending order
      { $limit: parseInt(limit) },
      { $project: { _id: 0, name: 1, yearOfRelease: 1 } }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get movies with director details (using lookup)
const getMoviesWithDirectors = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $lookup: {
          from: 'directors', // Name of the directors collection
          localField: 'directorId',
          foreignField: '_id',
          as: 'directorDetails'
        }
      },
      { $unwind: "$directorDetails" },
      { $project: { _id: 0, name: 1, yearOfRelease: 1, directorDetails: 1 } }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get average movie release year
const getAverageReleaseYear = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $group: {
          _id: null,
          averageYear: { $avg: "$yearOfRelease" }
        }
      },
      { $project: { _id: 0, averageYear: 1 } }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

// Get movies grouped by decade
const getMoviesGroupedByDecade = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $group: {
          _id: { $subtract: [{ $year: "$yearOfRelease" }, { $mod: [{ $year: "$yearOfRelease" }, 10] }] },
          movies: { $push: "$name" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by decade
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

const getDetailedMoviesData = async (req, res, next) => {
  try {
    const data = await Movie.aggregate([
      {
        $facet: {
          byGenre: [
            { $group: { _id: "$genre", movies: { $push: { name: "$name", yearOfRelease: "$yearOfRelease" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
          ],
          byDirector: [
            { $lookup: { from: 'directors', localField: 'directorId', foreignField: '_id', as: 'directorDetails' } },
            { $unwind: "$directorDetails" },
            { $group: { _id: "$directorDetails.name", movies: { $push: { name: "$name", yearOfRelease: "$yearOfRelease" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
          ],
          byYear: [
            { $bucket: { groupBy: "$yearOfRelease", boundaries: [1990, 2000, 2010, 2020, 2030], default: "other", output: { movies: { $push: "$name" }, count: { $sum: 1 } } } }
          ]
        }
      },
      {
        //  used as a "As" alias 
        $set: {
          statistics: {
            totalMovies: { $size: "$byYear" },
            averageReleaseYear: { $avg: "$byYear._id" }
          }
        }
      },
      {
        $project: {
          byGenre: 1,
          byDirector: 1,
          byYear: 1,
          statistics: 1
        }
      }
    ]);

    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllMovies,
  getMoviesByRange,
  getMoviesAfterYear,
  getMovieCountByYear,
  getTopNMovies,
  getMoviesWithDirectors,
  getAverageReleaseYear,
  getMoviesGroupedByDecade,
  getDetailedMoviesData
};
