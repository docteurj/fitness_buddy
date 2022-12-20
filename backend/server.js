require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const foodRoutes = require('./routes/foods')
const app = express()
const userRoutes = require('./routes/user')


//middle ware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/workouts', workoutRoutes)
app.use('/api/foods', foodRoutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
            console.log("db connected...listening in port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })



process.env