const Photo = require('../models/Photo');
const petsManager = require('../manager/petsManager')

const router = require('express').Router();

router.get('/', async (req, res) => {
  const pet = await petsManager.getAll();
    res.render('photo', {pet})
});

router.get('/create', (req, res) => {
    res.render('photo/create')
});
router.post('/create', async (req, res) => {
   
    const photoData = {
        ...req.body,
        owner: req.user._id,
    }
        

    
    await petsManager.create(photoData)




    res.redirect('/')
});

router.get('/:photoId', async (req,res) => {
    const photoId = req.params.photoId;
    const photo = await petsManager.getOne(photoId).lean();
    const isOwner = req.user?._id == photo.owner._id;
    

    res.render('photo/details', { photo, isOwner })

})
router.get('/:photoId/delete', async (req, res) => {

    const photo = await petsManager.delete(req.params.photoId);
    
});

router.get('/:photoId/edit', async (req, res) => {

    const photo = await petsManager.getOne(req.params.photoId).lean();

    res.render('photo/edit', { photo })
});


router.post('/:photoId/edit', async (req, res) => {
const petData = req.body;
const photoId = req.params.photoId

await petsManager.edit(photoId, petData);
res.redirect(`/`) 

}); 




module.exports = router; 