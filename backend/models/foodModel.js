// models/foodModel.js
import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ratings: [{ userId: String, rating: Number }]
});

const foodModel = mongoose.model('Food', foodSchema);
export default foodModel; // Ensure this line is present
