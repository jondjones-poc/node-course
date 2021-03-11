const fs = require('fs');
const filename = 'notes.json';

const fetchNotes = () => {
    try {
        var notesString = fs.readFileSync(filename)
        return JSON.parse(notesString);
    }
    catch(e) {
        // Ignore if file doesn't exist.
    }
    return [];
};

const saveNotes = (notes) => {
    fs.writeFileSync(filename, JSON.stringify(notes));

}

const add = (title, body) => {
    let notes = fetchNotes();
    const note = {
        title,
        body
    };

    const duplicationNotes = notes.filter((note) => note.title === title);
    if (duplicationNotes.length === 0) {
        console.log(`Add ${title} and ${body}`);
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => {
    return fetchNotes();
};

const fetch = (title) => {
    let notes = fetchNotes();
    const filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes;
};

const remove = (title) => {
    let notes = fetchNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

const logNote = (note) => {
    console.log("----");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log("----");
};

module.exports = {
    add,
    getAll,
    fetch,
    remove,
    logNote
}