## Aggregation Pipeline 
Ref : https://docs.google.com/document/d/1RnxuGi6Zp67wpiXVTW5VR6sKFjovWqi1pNyLZOnQvlg/edit?usp=sharing

**{08/07/2024}**
##### Data Count 
- data can be counted either by using the **$sum** within in the pipeline or by using **$count** : "string" outside the pipeline or using the same pipeline

**$project**
- Passes along the documents with the requested fields to the next stage in the pipeline. The specified fields can be existing fields from the input documents or newly computed fields
- The $project takes a document that can specify the inclusion of fields, the suppression of the _id field (means replacing the existing field with some other key ), the addition of new fields, and resetting of the values of existing fields.

- Ref below the **$cond** working
![alt text](image.png) , ![alt text](image-1.png)

- Ref for inclusion and exclusion operations of $project stage: https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#std-label-remove-example

- **$unset*** cna also be used exclude fields.
it can exlude the single field or nested field from array using(country.England)
Ref : https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset

***$push*** 
can be used to add a single field , complete array , field inside the sisting array
ref:https://www.mongodb.com/docs/manual/reference/operator/update/push/



