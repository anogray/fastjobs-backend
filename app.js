const express = require("express"),
app  = express(),
dotenv = require('dotenv').config(),
mongoose = require('mongoose'),
cors = require('cors'),
petRoutes = require("./routes/petRoutes");


mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useCreateIndex:true, useFindAndModify: false},()=>{
    console.log('MongoDB Connected');
});

app.use(express.json());


app.use('/api', petRoutes);
// app.use('/pet/:id',oauthRoutes);
app.listen(process.env.PORT,console.log('App is listening on port 4000'));