const mongoose = require('mongoose');
const express=require('express');
const dotenv=require('dotenv')
const MOVIE=require('./modules/moviesschema')
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("database conected")});
const server=express();
server.use(express.json())
server.use('/api',require('./routes/Admin')  )
const port = 5000;
server.listen(port, (err) => (err)? console.log(err): console.log(`Server is running on http://localhost:${port}`));



