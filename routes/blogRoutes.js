const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
router.get('/', (req, res)=>{
    // res.sendFile('./views/index.html', {root: __dirname});
   // res.render('index', {title : 'Blogs' , blogs});
  res.redirect('/all-blogs');
 });
 
 
 
 router.get('/blogs/:id', (req, res)=>{
    const id = req.params.id ; 
    Blog.findById(id)
    .then ((result)=>{
      res.render('details', {title : '', blog : result});
    })
    .catch((err)=>{
        console.log(err);
    })
 
  });
 
  router.delete('/all-blogs/:id', (req, res)=>{
     const id = req.params.id ; 
     Blog.findByIdAndDelete(id)
     .then ((result)=>{
     res.json({redirect : '/all-blogs'});
     })
     .catch((err)=>{
         console.log(err);
     })
  
   });
 
 
  
 
 router.get('/about', (req, res)=>{
     res.render('about' , {title : "About Wisam Shomar"});
 });
 
 router.get('/about-us', (req, res)=>{
    res.render('about');
 });
 
 router.get('/new-blog', (req, res)=>{
     
     res.render('creat-form', {title : 'New Form Blogs'});
  });
 
 router.get('/all-blogs', (req, res)=>{
     Blog.find().sort({ createdAt: -1 , title:1})
     .then ((result)=>{
       res.render('index', {title : 'Blogs' , blogs: result});
     })
     .catch((err)=>{
         console.log(err);
     })
  });
 
 router.post('/add-blog', (req, res)=>{
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
     
     module.exports = router ; 
    
 
 
 
 
 