const router = require('express').Router();
const User = require('./userSchema');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
   
    try{
        var emailExist = await User.findOne({email:req.body.email});
        if(emailExist) {
            return res.status(400).json("Email already exist");
        }
        var hash = await bcrypt.hash(req.body.password,10);

        const user = new User ({
            name: req.body.name,
            email:req.body.email,
            password:hash,
        })
        var data =await user.save();

        res.json(data);
    }catch(error) {
        res.status(400).json(error)
    }
    res.json(user);
})

router.post('/login',async(req,res) => {
    try{
        var userData = await User.findOne({email:req.body.email});
        if(!userData) {
            return res.status(400).json("Email not exist");
        }
        var validPassword= await bcrypt.compare(req.body.password, userData.password);
        if(!validPassword) {
            return res.status(400).json("Wrong Password");
        }

        var userToken = await jwt.sign({email:userData.email},'tokenkey');
        res.header('auth', userToken).send(userToken); 
    }catch(error){
        res.status(400).json(error)
    }
})

 const validUser = (req,res,next) => {
     var token = req.header('auth');
     req.token =token;
     next();
 }

 router.get('/getUser',validUser,async(req,res) => {
     jwt.verify(req.token,'tokenkey',async(error,data) =>{
         if(error){
             res.sendStatus(403)
         }else{
             const data = await User.find().select(['-password']);
             res.json(data);
         }
     })
 })

module.exports = router;