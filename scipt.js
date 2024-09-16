// Get the button element by its ID 'btn' and store it in btnEl
const btnEl = document.getElementById("btn");

// Get the app element (container for notes) by its ID 'App' and store it in appEl
const appEl = document.getElementById("App");

// Get all existing notes from localStorage and display them on the screen
getNotes().forEach((note)=>{
    // Create a textarea element for each note using createNoteEl and insert it into the app before the button
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

// Function to create a new note element (textarea) and set its behavior
function createNoteEl(id, content){

    // Create a new textarea HTML element to represent a note
    const element = document.createElement("textarea");

    // Add the 'note' class to the textarea for styling purposes
    element.classList.add("note");

    // Set the placeholder text for the textarea when it's empty
    element.placeholder = "Empty Note";

    // Set the textarea's initial content to the provided 'content'
    element.value = content;

    // Add a double-click event listener to the textarea to handle note deletion
    element.addEventListener("dblclick", () => {
        // Show a confirmation dialog before deleting the note
        const warning = confirm("Do you want to delete this note?");
        
        // If the user confirms deletion, call deleteNote function
        if(warning){
            deleteNote(id, element);
        }
    });

    // Add an event listener that triggers when the content of the note changes (on input)
    element.addEventListener("input", () => {
        // Update the note's content in localStorage when the user types
        updateNote(id, element.value);
    });

    // Return the newly created note element
    return element;
}

// Function to delete a note from the list and localStorage
function deleteNote(id, element){
    // Filter out the note with the given 'id' from the array of notes
    const notes = getNotes().filter((note) => note.id != id);

    // Save the updated list of notes back to localStorage
    saveNote(notes);

    // Remove the note element from the DOM (user interface)
    appEl.removeChild(element);
}

// Function to update the content of a note
function updateNote(id, content){
    // Get the current list of notes from localStorage
    const notes = getNotes();

    // Find the note with the matching 'id' and store it in 'target'
    const target = notes.filter((note) => note.id == id)[0];

    // Update the content of the found note
    target.content = content;

    // Save the updated list of notes back to localStorage
    saveNote(notes);
}

// Function to add a new note when the user clicks the button
function addNote(){
    // Get the current list of notes from localStorage
    const notes = getNotes();

    // Create a new note object with a random id and empty content
    const noteObj = {
        id: Math.floor(Math.random() * 10000),  // Random id
        content: ""                             // Empty content initially
    };

    // Create a new note element using createNoteEl with the new note's id and content
    const noteEl = createNoteEl(noteObj.id, noteObj.content);

    // Insert the new note element into the DOM (before the button)
    appEl.insertBefore(noteEl, btnEl);

    // Add the new note to the list of notes
    notes.push(noteObj);

    // Save the updated list of notes to localStorage
    saveNote(notes);
}

// Function to save notes to localStorage
function saveNote(notes){
    // Store the array of notes as a JSON string in localStorage under the key 'note-app'
    localStorage.setItem("note-app", JSON.stringify(notes));
}

// Function to get the list of notes from localStorage
function getNotes(){
    // Get the notes from localStorage and parse them from JSON back to an array
    // If there are no notes in localStorage, return an empty array
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// Add a click event listener to the button
// When the button is clicked, it triggers the addNote function to add a new note
btnEl.addEventListener("click", addNote);
