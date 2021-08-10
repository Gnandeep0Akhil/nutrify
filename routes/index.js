var express = require('express');
var router = express.Router();
var authRouter = require('./auth');
var homeRouter = require('./home');

const isAuthenticated = (req, res, next) => {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/auth/signin');
    }
}

router.use('/auth', authRouter);
router.use('/home', isAuthenticated, homeRouter);


router.get('/', (req, res)=>{
    if(req.session.email){
        res.redirect('/home');
    } else{
        res.redirect('/auth/signin');
    }
})


module.exports = router;