// author : CBN
//imports
import * as FileSystem from 'fs';
import chalk from 'chalk';

const getNotes = () => {
    try{
        const dataBuffer = FileSystem.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e){
        return [];
    }
}

const changeNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes);
    FileSystem.writeFileSync('notes.json', dataJSON);
}

const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return(day + '/' + month + '/' + year);
}

const addNote = (title, body) => {
    const notes = getNotes();
    const date = getDate();
    notes.push({
        title: title,
        body: body,
        date: date
    });
    changeNotes(notes);
    console.log(chalk.bgGreenBright('Note Added!'));
}

const remNote = (title) => {
    const notes = getNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    changeNotes(newNotes);

    if(notes.length > newNotes.length)
        console.log(chalk.bgGreen('Note Removed!'));
    else
        console.log(chalk.bgRed('Not couldn\'t found!'));
}

const showNote = (title) => {
    const notes = getNotes();
    const goal = notes.filter((note) => note.title === title);
    goal.forEach(note => {
        console.log(chalk.bgGrey(note.title + '\n' + note.body));
    })
}

const listNote = () => {
    console.log(chalk.cyanBright('Your Notes...'));
    const notes = getNotes();
    notes.forEach(element => {
        console.log(chalk.magenta(element.title));
    });    
}

export const handlers = {addNote, remNote, listNote, showNote};