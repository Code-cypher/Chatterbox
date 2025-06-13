import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import express from "express"
import compression from "compression"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactsRoutes.js"
import setupSocket from "./socket.js"
import messagesRoutes from "./routes/MessagesRoutes.js"
import channelRoutes from "./routes/ChannelRoutes.js"


dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const databseURL = process.env.DATABASE_URL

// Enable gzip compression
app.use(compression())

app.use(cors(
    {
        origin: [process.env.ORIGIN],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))

app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use("/uploads/files",express.static("uploads/files"))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use("/api/contacts", contactsRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/channels", channelRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

setupSocket(server)

mongoose.connect(databseURL).then(() => { console.log("Database connected") }).catch(err => console.log(err.message))