const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
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

app.get('/', (req, res)=>{
   // res.sendFile('./views/index.html', {root: __dirname});
  // res.render('index', {title : 'Blogs' , blogs});
 res.redirect('/all-blogs');
});



app.get('/blogs/:id', (req, res)=>{
   const id = req.params.id ; 
   Blog.findById(id)
   .then ((result)=>{
     res.render('details', {title : '', blog : result});
   })
   .catch((err)=>{
       console.log(err);
   })

 });

 app.delete('/all-blogs/:id', (req, res)=>{
    const id = req.params.id ; 
    Blog.deleteOne(id)
    .then ((result)=>{
     res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    })
 
  });


 

app.get('/about', (req, res)=>{
    res.render('about' , {title : "About Wisam Shomar"});
});

app.get('/about-us', (req, res)=>{
   res.render('about');
});

app.get('/new-blog', (req, res)=>{
    
    res.render('creat-form', {title : 'New Form Blogs'});
 });

app.get('/all-blogs', (req, res)=>{
    Blog.find().sort({ createdAt: -1 , title:1})
    .then ((result)=>{
      res.render('index', {title : 'Blogs' , blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
 });

app.post('/add-blog', (req, res)=>{
console.log(req.body)
   const blog = new Blog(req.body);
        blog.save()
        .then((result)=>{
            res.send(result);
          
        })
        .catch((err) =>{
            console.log(err);
           //express.response.write(err);
        })
        res.redirect('/');
    });
    
   







app.use((req, res) => {
    res.status(404).render('404');
});
