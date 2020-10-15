const express = require("express");
const router = express.Router();
const LogEntry = require("../models/LogEntry"); 


router.get('/', async (req, res, next)=>{
    try {
        const entries = await LogEntry.find();
        res.json(entries);        
    } catch (error) {
        console.log(error); o
        
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body); 
        createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        next(error);
    }
})

module.exports = router 