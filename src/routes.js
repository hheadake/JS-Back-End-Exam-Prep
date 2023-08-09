const router = require('express').Router();

const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
const petController = require('./controller/petController');
router.use(homeController);
router.use('/users', userController);
router.use('/pets', petController);
//router.use('*', (req,res) => {
 //res.redirect('404')

//});


module.exports = router; 