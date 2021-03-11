const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't' };

const argv = yargs
.command('add', 'Adds A New Note', {
    title: titleOptions,
    body: {
        describe: 'Note description',
        demand: true,
        alias: 'b'
    },    
})
.command('list', 'List All Notes')
.command('read', 'Read A Note From Storage', {
    title: titleOptions
})
.command('remove', 'Remove A Note From Storage', {
    title: titleOptions
})
.help()
.argv;
var command = argv._[0];

if (command == 'add') {

    const note = notes.add(argv.title, argv.body);
    if (note) {
        notes.logNote(note);
    }
    else {
        console.log(`Error Adding ${argv.title}.  Likely title already exists. Check by typing 'list'`);        
    }

} else if (command == 'list') {
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes`);   
    allNotes.map((note) =>  notes.logNote(note));

} else if (command == 'remove') {
    const noteRemoved = notes.remove(argv.title);
    const message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else if (command == 'fetch') {
    const fetchedNote = notes.fetch(argv.title);
    if (fetchedNote) {
            notes.logNote(note);
    } else {
        console.log('Note not found');  
    }
} else {
    console.log('Error');
}