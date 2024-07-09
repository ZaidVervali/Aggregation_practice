## Aggregation Practice
**{08/07/2024}**
```  
// {
  // if we want the separate name field from the data
  // $project: {
  //   name : 1 ,
  //   _id:0
  // },
  //  if we want the name ot be present inside the single array
//   $group: {
//     _id: null,
//     names: {
//      $push:"$name"
//     }
//   },
// }, { $project: {
//   _id:0 ,
//   userList : "$names"
// }
// }
```

```
[ 
{$unset: ['name' ]}	, // remote single field in the outut
{$unset: ['name' , 'age']}	// remove multiple field in the output
]
```
- unset and project both can be used to remove the field


```
[
   {
        $bucket: {
           groupBy: "$yearOfRelease", // Correct the field name
           boundaries: [1990, 2010,2050], // Define bucket boundaries
           default: "not in range", // Correct the typo in "not in range"
           output: {
             countBy: { $sum: 1 }, // Count the number of documents in each bucket
             names: { $push: "$name" } // Push the names into an array
           }
         }
      }
]
```