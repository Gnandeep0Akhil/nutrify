const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/nutrifyUsers?retryWrites=true&w=majority`,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('views', 'templates');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var indexRouter = require('./routes/index')
app.use('/', indexRouter)

app.listen(port, ()=>{
    console.log('Listining to port:', port);
})