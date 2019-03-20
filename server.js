const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');


const app = express();

// body parser middleware 

app.use(bodyParser.json());

// configuring database 

const db = require('./config/keys').mongoURI;

// connect to mongo 
mongoose.connect(db)
    .then(() => console.log('mongoDb connected'))
    .catch(e => console.log(e));

// Use routes 

app.use('/api/items', items)

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