const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Storage {
    read(){
        return readFile('db/db.json','utf8');
    }

    write(notes){
        return writeFile('db/db.json', JSON.stringify(notes));
    }

    getNotes(){
        return this.read().then((notes2)=>{
            let parsingNotes;
            try{
                parsingNotes = [].concat(JSON.parse(notes2));
            }catch(error){
                parsingNotes = [];
            }

        return parsingNotes;
        });
    }

    addNote(notes){
        const {title, text} = notes;

        if(!title || !text){
            throw new Error("Notes cannot be blank");
        }

        const newNote = {title, text, id: uuidv1() };


        return this.getNotes()
        .then((notes2)=> [...notes2, newNote])
        .then((updatedNotes)=> this.write(updatedNotes))
        .then(()=> newNote);
    }

    removeNote(id){
        return this.getNotes()
            .then((notes2)=> notes2.filter((notes)=> notes.id !== id))
            .then((filteredNotes)=> this.write(filteredNotes));
    }
}

module.exports = new Storage();