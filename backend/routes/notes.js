const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleweare/fetchuser')
const Note = require('../models/Note')

//Route 1: fatch all notes
router.get('/fetchallnotes', fetchuser ,async(req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes)   
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error!")
    }
})

//Route 2 : add all notes
router.post('/addnote', fetchuser , [
    body('title','Enter a valid title').isLength({min : 3}),
    body('Description','Description must be atleast 5 characters').isLength({min : 5}),
],async(req,res)=>{
    try {
        const {title,Description,tag} = req.body
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note = new Note({
            title , Description ,tag , user : req.user.id  
        })
        const savedNote = await note.save()
        res.json(note)
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error!")
    }
}) 

//Route 3 : Update notes
router.put('/updatenote/:id', fetchuser ,async(req,res)=>{
    const {title,Description,tag} = req.body
    try {  
        const newNote = {}
        if(title){newNote.title = title}
        if (Description){newNote.description= Description} 
        if(tag){newNote.tag = tag}
    
        let note =await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("not found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote}, {new : true})
        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error!")
    }
})

//Route 4 : Delete notes
router.delete('/deletenote/:id', fetchuser ,async(req,res)=>{
    const {title,Description,tag} = req.body
    try {
        let note =await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("not found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json("Success : note is deleted Sucsessfully")   
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error!") 
    }
})

module.exports = router