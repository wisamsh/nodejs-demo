const http = require('http');
const fs = require('fs');
const blogRoutes = require('./routes/blogRoutes');
const express = require('express');
const mongoose = require('mongoose');

let app = express();
//DB CONNECTION
const dbURI = 'mongodb+srv://wisamfoody:nRnUKA0iKZB0aV7x@cluster0.gsoumzm.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err)=>console.log(err));

const morgan = require('morgan');
app.set('view engine', 'ejs');

//middleware : 
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'))
app.use(morgan('dev'));
app.use( blogRoutes);


app.use((req, res) => {
    res.status(404).render('404');
});
