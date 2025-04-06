import db from "../models/index.js"

async function syncDatabase() {
    try {
        // Sync all models, create if not exist
        await db.sequelize.sync({ force: false }) // Use { force: true } only in development to drop and recreate tables
        console.log("Database synced successfully")
    } catch (error) {
        console.error("Error syncing database:", error)
    }
}
syncDatabase()