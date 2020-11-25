const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    let notes = await Note.find();
    res.json(notes)
};
notesCtrl.getNote = (req, res) => {
    const { title, content, date, author} = req.body;
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author,
    })
    console.log(newNote);
    res.json({title: 'asdasd'})
};
notesCtrl.createNote = (req, res) => res.json({message: 'Note Saved'});
notesCtrl.updateNote = (req, res) => res.json({message: 'Note Updated'});
notesCtrl.deleteNote = (req, res) => res.json({message: ''})

module.exports = notesCtrl;