const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

const port = 8000;

// MongoDB Connection to database
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// ejs Template 
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Use Assets folder images
app.use(express.static('./assets'));

// Showing All Articles
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.get('/home', (req,res)=>{
  res.render('articles/home');
})

app.use('/articles', articleRouter)

// Server is running at port number 8000 localhost:8000
app.listen(port, function(err){
  if(err){console.log("Error in running server: ", err)}

    console.log(`Yup server is running at ${port}`);
})