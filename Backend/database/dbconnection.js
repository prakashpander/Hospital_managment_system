import mongoose from "mongoose";

export const dbConnection = mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
.then(()=>{
    console.log("data base connection is successfully");
})
.catch((error)=>{
    console.log("database connection failed !!",error);
});

