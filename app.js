
const express = require('express'); 
const exphbs = require('express-handlebars');
const app = express();

//congiguring .env 
require('dotenv').config();
const port = process.env.PORT || 5002;


//bodyparser middleware
const bodyparser = require('body-parser');

//bodyparser urlencoded
app.use(bodyparser.urlencoded({extended:false}));


//bodyparser json
app.use(bodyparser.json());


//static file
app.use(express.static('public'));


//templating engine
// app.engine('hbs', exphbs( {extname:'.hbs'}));
const hbs = exphbs.create({ extname: '.hbs' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



//Connection Pool
const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME

});


//connect DB
pool.getConnection((err,connection)=>{
    if(err) throw err; //not connected
    console.log('connected as ID'+ connection.threadId);
});


//routs linking
const userRouts = require('./server/routes/user.js');
app.use('/', userRouts);



//creating a server
app.listen(port, ()=>{
    console.log(`server connected to the port ${port}`)
})