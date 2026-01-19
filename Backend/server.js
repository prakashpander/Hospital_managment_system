import app from "./app.js";
import cloudinary from "cloudinary";
import { dbConnection } from "./database/dbconnection.js"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

(async () => {
    try {
        await dbConnection;

    } catch (error) {
        console.log("error is = ", error);

    }
})()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`port run on http://localhost:${PORT}`);
});


