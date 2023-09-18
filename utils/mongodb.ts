import mongoose from "mongoose"

const MONGODB_URL = "your_mongodb_url"

const databaseLinking = async () => {
    if (mongoose.connection.readyState >= 1) {
        return 
    }

    await mongoose.connect(MONGODB_URL)
}

export default databaseLinking