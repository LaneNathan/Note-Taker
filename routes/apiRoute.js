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
