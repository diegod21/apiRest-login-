const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController')

router.get('/', auth,  (req,res)=>{
    if(req.user.admin){
    res.send('este dado só deve ser visto pelo admin')}
    else{
        res.status(401).send('not an admin: acces denied')
    }
})

module.exports = router;