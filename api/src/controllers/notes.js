const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */

module.exports = router;
// return list of all note
router.get('/', (req,res)=>{
      const returnListNote ={
          order: [['createdAt', 'DESC']]
      }
      models.Note.findAll(returnListNote)
      .then(notes =>res.json(notes))
      .catch(err => res.status(500).json({error: err.message}))
});
// create a new note using post data. return new note
router.post('/', (req,res)  => {
      models.Note.create(req.body)
      .then(notes => res.json(notes))
      .catch(err => res.status(422).json({ error: err.message}))
});
// return a single note by id
router.get('/:noteId', (req,res) =>{
      models.Note.findById(req.params.noteId)
      .then(note => res.json(note))
      .catch(err => res.status(500).json({error: err.message}))
});
// delete a single note by id, then return empty object{}
router.delete('/:noteId', (req,res)=>{
      models.Note.destroy({where: {id:req.params.noteId}})
      .then(()=> res.json({}))
      .catch(err => res.status(500).json({ error: err.message }));
});

// update the attribute of particular note. return the update note
router.put('/:noteId', (req,res)=>{
      models.Note.findById(req.params.noteId)
      .then(note => note.update(req.body))
      .then(note => res.json(note))
});