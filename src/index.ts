import express from "express"
import mongoose from "mongoose"
import UserRoute from "./routes/User"
import BlogRoute from "./routes/Blog"
import ContactQueryRoute from "./routes/ContactQuery";

const app = express()

mongoose.connect("mongodb+srv://Philimuhire:Phili123@philbertapi.ue2svev.mongodb.net/?retryWrites=true&w=majority&appName=PhilbertAPI").then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error.message)
})


app.use(express.json())
app.use("/auth", UserRoute)
app.use("/blog", BlogRoute)
app.use("/contact", ContactQueryRoute);


app.listen(5000,()=>{
    console.log("server running on port 5000")
})