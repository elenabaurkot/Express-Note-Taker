module.exports = function (app) {
  const fs = require("fs");
  const path = require("path");

  app.get("/api/notes", function (req, res) {
    // variable that reads the db.json file 
    const readNote = fs.readFileSync(path.join(__dirname, '../../db/db.json'));
    // varibale that will parse the readNote (json) file 
    const notes = JSON.parse(readNote)
    // sends the parsed json file back as the response to the url request 
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    // variable that reads the db.json file
    const readNote = fs.readFileSync(path.join(__dirname, '../../db/db.json'));
    // varibale that will parse the readNote (json) file
    const notes = JSON.parse(readNote)
    // variable that will generate a random number to use as an id
    const randomID = Math.floor(Math.random() * 100000);
    // creates a data object template to use for each new note
    let data = {
      id: randomID,
      title: req.body.title,
      text: req.body.text,
    };
    // pushes the new data object into the notes variable
    notes.push(data)
    // writes the new data into the db.json file 
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes))
    // sends the new data object as the response to the server 
    res.json(data);
  });

  app.delete("/api/notes/:id", (req, res) => {
    // makes the url varibale a number data type
    const selectedNote = parseInt(req.params.id);
    // variable that reads the db.json file
    const readNote = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json')));
    // using the filter function to match the note id with the note that was selected to be deleted
    const filteredNotes = readNote.filter(note => note.id != selectedNote);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNotes));
    res.end();
  });
};