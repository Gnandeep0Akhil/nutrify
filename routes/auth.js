var express = require('express');
var router = express.Router();
var { createUser, verifyUser } = require('../controllers/auth');


router.get('/signin', (req, res) => {
	res.render('signin');
})

router.post('/signin', (req, res) => {
    verifyUser(req.body, (err, user) => {
        if (err) {
            res.render('signinMessage', { message: err.toString()});
        } else {
            req.session._id = user._id;
            req.session.email = user.email;
            res.redirect('/home');
        }
    })
})

router.get('/signup', (req, res)=>{
    res.render('signup');
})

router.post('/signup', (req, res)=>{
    createUser(req.body)
        .then(() => {
            res.redirect('/auth/signin');
        })
        .catch((err) => {
            res.render('signup', {
                message: err.toString()
            })
        })
})

router.post('/signout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.render('signinMessage', { message : 'Signed Out Successfully!' });
})



module.exports = router;