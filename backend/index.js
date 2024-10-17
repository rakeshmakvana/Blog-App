const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT;
const DB = process.env.DATABASE;
const app = express();
const userRouter = require('./routes/User.route')
const blogRouter = require('./routes/Blog.route')

app.use(cors())
app.use(express.json())

mongoose.connect(DB)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.json("Server Started")
})
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

app.listen(port, () => {
    console.log("Server Started On https://localhost:" + port)
})