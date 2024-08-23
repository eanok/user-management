//importing express and assigning express() to app 
const express = require('express');
const app = express();


//congiguring .env 
require('dotenv').config();
const port = process.env.PORT || 5002;


//creating a server
app.listen(port, ()=>{
    console.log(`server connected to the port ${port}`)
})