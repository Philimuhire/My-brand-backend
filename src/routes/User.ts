import express from "express"
import { register,login } from "../controllers/User"

const route = express.Router()


route.post("/register", register)
route.post("/login", login)

const UserRoute = module.exports = route
export default UserRoute