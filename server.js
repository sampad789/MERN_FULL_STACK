const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');



const app = express();

// body parser middleware 

app.use(express.json());

// configuring database 

const db = config.get('mongoURI');

// connect to mongo 
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true
    })
    .then(() => console.log('mongoDb connected'))
    .catch(e => console.log(e));

// Use routes 

app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
//Serve static assests if in production mode 
if (process.env.NODE_ENV === 'production'){
//set static folder 
app.use(express.static('client/build'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
});
}

// Use environment port if available if not then run on port 5000

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));