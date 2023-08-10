const Photo = require('../models/Photo');
const petsManager = require('../manager/petsManager');
const { getErrorMessage } = require('../utils/errorHandler.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    
   try {
       const pet = await petsManager.getAll();
         res.render('photo', {pet})
    
   } catch (error) {

        res.render('/photo', {error: getErrorMessage(err)}) 

   } 
});




router.get('/create', (req, res) => {
    res.render('photo/create')
});

router.post('/create', async (req, res) => {
   
    const photoData = {
        ...req.body,
        owner: req.user._id,
    }
        
try {
    await petsManager.create(photoData)
    res.redirect('/photo')
    
} catch (err) {

     res.render('photo/create', {error: getErrorMessage(err)})
    
}
    




});

router.get('/:photoId', async (req,res) => {

    try {
        const photoId = req.params.photoId;
        const photo = await petsManager.getOne(photoId).lean();
        const isOwner = req.user?._id == photo.owner._id;
        
    
        res.render('photo/details', { photo, isOwner })
        
    } catch (error) {
        
        res.render('photo/details', {error: getErrorMessage(err)})
        
    }



})
router.get('/:photoId/delete', async (req, res) => {

    try {
        const photo = await petsManager.delete(req.params.photoId);
        res.redirect('/')
        
    } catch (error) {
        
        res.render('photo/details', {error: getErrorMessage(err)})
    }

    
});

router.get('/:photoId/edit', async (req, res) => {

    try {
        const photo = await petsManager.getOne(req.params.photoId).lean();
    
        res.render('photo/edit', { photo })
        
    } catch (error) {
        
        res.render('photo/edit', {error: getErrorMessage(err)})

    }

});


router.post('/:photoId/edit', async (req, res) => {
const petData = req.body;
const photoId = req.params.photoId

try {
    await petsManager.edit(photoId, petData);
    res.redirect(`/`) 
    
} catch (error) {
    res.render('/', {error: getErrorMessage(err)})
}

}); 




module.exports = router; 