const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controller/workoutController')



const router = express.Router()
//auth for all workouts
router.use(requireAuth)

//get all workouts
router.get('/', getWorkouts)

//get single workout
router.get('/:id', getWorkout)

//post new workout
router.post('/', createWorkout)

//delete workout
router.delete('/:id', deleteWorkout)

//update new workout
router.patch('/:id', updateWorkout)



module.exports = router
