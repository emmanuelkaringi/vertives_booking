import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import restaurantsRoute from "./routes/restaurants.js"
import tablesRoute from "./routes/tables.js"

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})

//Middlewares
app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/hotels", hotelsRoute)
app.use("/rooms", roomsRoute)
app.use("/restaurants", restaurantsRoute)
app.use("/tables", tablesRoute)

app.listen(8080, ()=>{
    connect()
    console.log("Test Done! Test Done!")
})