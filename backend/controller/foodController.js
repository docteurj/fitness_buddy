const Food = require('../models/foodModel')
const mongoose = require('mongoose')

//get all foods
const getFoods = async (req, res) => {
    const user_id = req.user._id
    const foods = await Food.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(foods)
}
//get single food
const getFood = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "This food does not exist..."})
    }

    const food = await Food.findById(id)

    if (!food) {
        return res.status(404).json({error: "This food does not exist..."})
    }

    res.status(200).json(food)
}

//create new food
const createFood = async (req, res) => {
    const {title, calories, time, description} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!calories) {
        emptyFields.push('calories')
    }
    if (!time) {
        emptyFields.push('time')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    try {
        const user_id = req.user._id
        const food = await Food.create({title, calories, time, description, user_id})
        res.status(200).json(food)
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}

//delete a food
const deleteFood = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "This food does not exist..."})
    }

    const food = await Food.findOneAndDelete({_id: id})

    if (!food) {
        return res.status(404).json({error: "This food does not exist..."})
    }

    res.status(200).json(food)
}

//update a food
const updateFood = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "This food does not exist..."})
    }
    
    const food = await Food.findOneAndUpdate({_id: id}, { 
        ...req.body
    })
    
    if (!food) {
        return res.status(404).json({error: "This food does not exist..."})
    } 
    
    res.status(200).json(food)
    
}





module.exports = {
    createFood,
    getFoods,
    getFood,
    deleteFood,
    updateFood
}