import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import bodyParser from "body-parser"
import { rateLimiterUsingThirdParty } from "./utils/rateLimiter.js"
import { connect } from "./database/schema/connection.js"
import authRoute from "./routes/authRoutes.js"




dotenv.config()
const app = express()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT ||  5000
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimiterUsingThirdParty)
app.use(bodyParser.urlencoded({extended: false}))
app.use("/", authRoute)


//catch other routes
app.all("*", (req, res )=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})


//connect to DB
connect(MONGODB_URI)
.then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("E-Commerce API is running on PORT", PORT)
        })
    })



export default app  