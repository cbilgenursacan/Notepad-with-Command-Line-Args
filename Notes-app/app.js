// author : CBN
// These lines make "require" available
import { createRequire } from "module";
import { argv } from "process";
const require = createRequire(import.meta.url);

// Imports
const yargs = require('yargs');
import { handlers } from './notes.js';

// Creating commands
yargs.command({
    command: 'add',
    describe: 'Add a new note to notes',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        handlers.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing a  note from notes',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        handlers.remNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read selected notes',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        handlers.showNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler(){
        handlers.listNote()
    } 
})

yargs.parse();