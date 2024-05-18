const express = require('express')
const User = require('../models/User');
const{body,validationResult} = require('express-validator')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleweare/fetchuser')
const JWT_TOKEN = 'vishal$123'


//Route 1 : creating User
router.post('/createuser', [
    body('name','Enter a valide name').isLength({min : 3}),
    body('email','Enter a valide email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min : 5}),
],async(req,res)=>{
    let Success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({Success , errors:errors.array()});
    }
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({Success , error: "Sorry with this email user already exists!"})
        }
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password , salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
          })  

        const data ={
            user:{
                id:user.id,
            }
        }
        const authtoken = jwt.sign(data,JWT_TOKEN);

        Success = true;
        res.json({Success , authtoken})
    }catch(error){
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

// Route 2 : Authentication the user
router.post('/login', [
    body('email','Enter a valide email').isEmail(),
    body('password','Password can not be blank').exists(),
],async(req,res)=>{
    let Success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            Success = false
            return res.status(400).json({error:"User not found"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            Success = false
            return res.status(400).json({Success ,error:"Password is incorrect"})
        }
        const data ={
            user:{
                id:user.id,
            }
        }
        const authtoken = jwt.sign(data,JWT_TOKEN);
        Success = true;
        res.json({Success , authtoken})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error!")
    }
})

//Route 3 : get log in user detail
router.post('/getuser', fetchuser ,async(req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error!")
    }
})
module.exports = router;