const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const midlewares = require(".//midlewares");
const { notFound, errorMessage } = require("./midlewares");

const logs = require(".//APIs//logs")



const app = express();
mongoose.connect("mongodb://localhost/history",
     {useUnifiedTopology: true,
        useNewUrlParser: true}, 
        console.log("database connected")  
);

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000", 
})); 
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message:'hello to you'
    });
}); 

app.use("/api/logs", logs); 

app.use(midlewares.notFound);

app.use(midlewares.errorMessage);
const port = process.env.PORT || 1996 ;

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`);
}); 
