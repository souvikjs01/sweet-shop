import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/routes"
dotenv.config()


const app = express()
app.use(cors())
const port = process.env.PORT || 8080
app.use(express.json())
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on the port ${port}...`);
})