const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const midlewares = require(".//midlewares");
const { notFound, errorMessage } = require("./midlewares");

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', 
})); 

app.get('/', (req, res)=>{
    res.json({
        message:'hello to you'
    });
}); 

app.use(midlewares.notFound);

app.use(midlewares.errorMessage);
const port = process.env.PORT || 1996 ;

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`);
}); 
