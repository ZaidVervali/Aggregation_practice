const User = require("../models/student.model.js");

const insertMany = async (req, res, next) => {
  try {
    const users = req.body;
    const result = await User.insertMany(users);
    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    res.status(400).send(error);
  }
};

const groupByGender = async (req, res, next) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: "$gender",
          countData: { $sum: 1 }, 
          names:{$push : "$name"}
        }
      } ,{
        $project :{
          gender : "$_id",
          countData :1 ,
          names: 1
        }
      }
    ]);
    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

const getTotalCount = async (req, res, next) => {
  try {
    // not a major difference
    // const totalCount = await User.countDocuments();
    const totalCount = await User.aggregate([
      {
        $count: "totalCount"
      }
    ]);
    res.status(200).json({ message: "Success", totalCount: totalCount });
  } catch (error) {
    next(error);
  }
};
const getTotalData = async (req, res, next) => {
  try {
    const totalData = await User.aggregate([
       {
        $group: {
          _id: null,
          totalData: { $push: "$$ROOT" },
          sumOfData: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          totalData: 1,
          totalCount: "$sumOfData"
        }
      },
      
    ]);

    res.status(200).json({ message: "Success", data: totalData});
  } catch (error) {
    next(error);
  }
};
const getAgeRange = async (req, res, next) => {
  try {
    const totalData = await User.aggregate([
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [ 0,30,40 ],
          default: "Greater then 40",
          output: {
            count:{$sum:1},
            names:{$push:"$name"}
          }
        }
        
      },
      {$project: {
        AgeRange : "$_id",
        names:1
      }}
    ]);

    res.status(200).json({ message: "Success", data: totalData});
  } catch (error) {
    next(error);
  }
};


// Export all functions as an object
module.exports = {
  insertMany,
  groupByGender,
  getTotalCount,getTotalData,getAgeRange,groupByGender
};
