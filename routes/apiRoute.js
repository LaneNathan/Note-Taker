const router = require('express').Router();
const storage = require('../db/storage');

router.get('/notes', (req, res)=>{
    storage
        .getNotes()
        .then((notes)=>{
            return res.json(notes);
        })
        .catch((error) => res.status(500).json(error));
});

router.post('/notes', (req, res)=>{
    storage
        .addNote(req.body)
        .then((note)=> res.json(note))
        .catch((error)=> res.status(500).json(error));
});

router.delete('/notes/:id', (req, res)=>{
    storage
        .removeNote(req.params.id)
        .then(()=> res.json({ok: true}))
        .catch((error)=> res.status(500).json(error));
});

module.exports = router;