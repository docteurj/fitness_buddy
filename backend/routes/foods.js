const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {
    createFood,
    getFoods,
    getFood,
    deleteFood,
    updateFood,
} = require('../controller/foodController')



const router = express.Router()

//auth for all foods
router.use(requireAuth)

//get all food
router.get('/', getFoods)

//get single food
router.get('/:id', getFood)

//post new food
router.post('/', createFood)

//delete food
router.delete('/:id', deleteFood)

//update food
router.patch('/:id', updateFood)



module.exports = router