const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }, 
    time: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, user_id: {
        type: String,
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('Food', foodSchema)
