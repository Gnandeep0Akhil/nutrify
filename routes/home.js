var express = require('express');
var router = express.Router();
var { createMeal } = require('../controllers/addOne');
var { updateUser } = require('../controllers/updateUser');
var { getMeals, getCalories, tCalories } = require('../controllers/meals');

router.get('/', (req, res)=>{
    res.render('home');
})

router.get('/profile', (req, res)=>{
    res.render('profile');
})

router.post('/profile', (req, res)=>{
    
})

router.get('/addOne', (req, res)=>{
    res.render('addOne');
})

router.post('/addOne', (req, res)=>{
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var D = d.getDate();
    var date = parseInt(y+''+m+''+D);
    createMeal(req.body, req.session, date)
        .then(() => {
            res.redirect('/home');
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/update', (req, res)=>{
    updateUser(req.body, req.session)
        .then(() => {
            res.redirect('/home');
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/meals', (req, res)=>{
    var date = req.query.date;
    var d = new Date(date);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var D = d.getDate();
    var query = parseInt(y+''+m+''+D);
    getMeals(query, req.session)
        .then((value) => {
            getCalories(req.session)
                .then((data) => {
                    tCalories(value)
                        .then((calories)=>{
                            res.render('homeAgain', { value : value, data : data[0].calorie, calories: calories });
                        })
                        .catch((err)=>{
                            res.send(err);
                        })
                })
                .catch((err) => {
                    res.send(err);
                })
        })
        .catch((err) => {
            res.send(err);
        })
})




module.exports = router;