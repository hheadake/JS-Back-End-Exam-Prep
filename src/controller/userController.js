const router = require('express').Router();
const userManager = require('../manager/userManager');
const { getErrorMessage } = require('../utils/errorHandler.js');



router.get('/login', (req,res) => {
    res.render('users/login')
});

router.post('/login', async (req,res) => {
    const { email, password } = req.body;

    
try {
    const token = await userManager.login(email, password);
    res.cookie('token', token)
    res.redirect('/');
    
} catch (err) {
    
    res.render('users/login', { error: getErrorMessage(err)})
}

});

router.get('/register', (req,res) => {
    res.render('users/register')
});

router.post('/register', async (req,res) => {
    const { username,email, password, repeatPassword } = req.body;

    try {
        await userManager.register({username,email, password, repeatPassword});
        res.redirect('users/login')
        
    } catch (error) {
        res.render('users/register', {error: getErrorMessage(err)})
    }

});


router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
});

router.get('/profile', (req, res) => {

    res.render('profile')


});



module.exports = router; 