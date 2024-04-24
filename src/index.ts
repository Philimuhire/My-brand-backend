import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import UserRoute from "./routes/User"
import BlogRoute from "./routes/Blog"
import ContactQueryRoute from "./routes/ContactQuery"
import BlogModel from "./models/BlogModel";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; 
import path from 'path';
import upload from "./cloudinary/multer";


const app = express()

mongoose.connect("mongodb+srv://Philimuhire:Phili123@philbertapi.ue2svev.mongodb.net/?retryWrites=true&w=majority&appName=PhilbertAPI").then(()=>{
    console.log("MongoDB connected")
}).catch((error)=>{
    console.log(error.message)
})

//app.use(express.static(path.join(__dirname, 'uploads/')))
app.use(express.json())
app.use(upload.single("image"));
app.use(cors())
app.use("/auth", UserRoute)
app.use("/blog", BlogRoute)
app.use("/contact", ContactQueryRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/blogs", async (req, res) => {
    try {
      const blogs = await BlogModel.find(); 
      res.json(blogs); 
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(5000,()=>{
    console.log("server running on port 5000")
})