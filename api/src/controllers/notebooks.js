const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* *** TODO: Fill in the API endpoints for notebooks *** */

module.exports = router;

// return a list of all notebook (not including note)
router.get('/',(req,res)=>{
     const returnListNotebook = {
       order :[['createdAt','DESC']]
     };
     models.Notebook.findAll(returnListNotebook)
     .then(notebook => res.json(notebooks))
     .catch(err => res.status(500).json({ error: err.message }));
});


// return list of all note for particular notebook
router.get('/:notebookId/notes' , (req,res)=>{
  models.Notebook.findById(req.params.notebookId, {include: [models.Note]})
  .then(notebook => res.json(notebook.Notes))
  .catch(err => res.status(500).json({ error: err.message }));
});


// create a new notebook using post data. return new notebook
router.post('/', (req,res)=>{
      models.Notebook.create(req.body)
      .then(notebook => res.json(notebook)).then(()=>{console.log('DONE')})
      .catch(err => res.status(422).json({error:err.message}));
});

// return a single notebook by ID
router.get('/:notebookId', (req,res) => {
    models.Notebook.findById(req.params.notebookId)
    .then(notebook=>res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message }));
});

// delete a single notebook by ID. Return empty {}
router.delete('/:notebookId', (req,res) =>{
      models.Notebook.destroy({where :{id: req.params.notebookId}})
      .then(() => res.json({}))
      .catch(ree => res.status(500).json({error:err.message}));
});


//update the attribute of a particular notebook. return the update notebook
router.put('/:notebookId', (req,res)=>{
      models.Notebook.findById(req.params.notebookId)
      .then(notebook => notebook.update(req.body))
      .then(notebook=>res.json(notebook))

});
