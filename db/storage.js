const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Storage {
    read(){
        return readFile('db/db.json','utf8');
    }

    write(note){
        return writeFile('db/db.json', JSON.stringify(note));
    }

    getNotes(){
        return this.read().then((notes)=>{
            let parsingNotes;
            try{
                parsingNotes = [].concat(JSON.parse(notes));
            }catch(error){
                parsingNotes = [];
            }

        return parsingNotes;
        });
    }

    addNote(note){
        const {title, text} = note;

        if(!title || !text){
            throw new Error("Notes cannot be blank");
        }

        const newNote = {title, text, id: uuidv1() };


        return this.getNotes()
        .then((notes)=> [...notes, newNote])
        .then((updatedNotes)=> this.write(updatedNotes))
        .then(()=> newNote);
    }

    removeNote(id){
        return this.getNotes()
            .then((notes)=> notes.filter((note)=> note.id !== id))
            .then((filteredNotes)=> this.write(filteredNotes));
    }
}

module.exports = new Storage();