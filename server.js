const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine','ejs');
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', bookRouter)

//MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/MyLibrary')
        .then(()=> console.log("Connected to Database"))
        .catch((err)=> console.log(err))

app.listen(port, ()=>{
    console.log(`Server runing in ${port}`)
})