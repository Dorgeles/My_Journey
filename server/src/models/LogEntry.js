const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
};

const logEntrySchema = new Schema({
    title: requiredString, 
    description: String,
    comments: String,
    rating: {
        type: Number, 
        min: 1,
        max: 10,
        default: 5
    }, 
    image: String, 
    latitude: {
        type: Number,
        required: true,
        min: -89.999999,
        max: 90,
    },
    longitude:{
        type: Number,
        required: true,
        min: -179.9999999,
        max: 180,
    },    
    visitDate : Date,
}, {
    timestamps: true,
});
const logEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = logEntry; 
