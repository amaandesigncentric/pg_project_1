import { connectToDatabase } from "./utils/database.js";
import BottleItems from "./data/bottledata.js";
import { bottleModel } from "./models/bottleModel.js";
connectToDatabase().then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.error("Failed to start server due to DB error:", err);
});

const uploadData = async () => {
    try {
        await bottleModel.insertMany(BottleItems);
        console.log('✅ Data uploaded successfully');

        process.exit();
    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
};

uploadData();