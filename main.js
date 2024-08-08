const date = new Date();
const monthNames = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "می",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

// Function to save notes
function save() {
    const notes = [];
    document.querySelectorAll(".note").forEach(note => {
        const textTime = note.querySelector("#time").innerHTML;
        const textWritings = note.querySelector(".writing").innerText;
        notes.push({ textTime, textWritings });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes
function load() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        const noteArea = document.getElementById("noteArea");
        
        notes.forEach(noteData => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note");
            
            const topDiv = document.createElement("div");
            topDiv.classList.add("top");
            
            const dateDiv = document.createElement("div");
            dateDiv.classList.add("date");
            
            const timeDiv = document.createElement("div");
            timeDiv.id = "time";
            timeDiv.innerHTML = noteData.textTime;
            dateDiv.appendChild(timeDiv);
            
            const deleteDiv = document.createElement("div");
            deleteDiv.classList.add("delete");
            deleteDiv.innerText = "delete";
            deleteDiv.addEventListener("click", function () {
                noteArea.removeChild(noteDiv);
                save(); // Save notes after deletion
            });
            
            const writingDiv = document.createElement("div");
            writingDiv.classList.add("writing");
            writingDiv.contentEditable = false;
            writingDiv.innerText = noteData.textWritings;

            const editDiv = document.createElement("div");
            editDiv.classList.add("edit");
            editDiv.innerText = "edit";
            
            editDiv.addEventListener("click", function () {
                if (writingDiv.contentEditable === "false") {
                    writingDiv.contentEditable = "true";
                    editDiv.innerText = "save";
                } else {
                    writingDiv.contentEditable = "false";
                    save(); // Save notes after editing
                    editDiv.innerText = "edit";
                }
            });

            const downDiv = document.createElement("div");
            downDiv.classList.add("down");

            topDiv.appendChild(dateDiv);
            topDiv.appendChild(deleteDiv);
            topDiv.appendChild(editDiv);
            downDiv.appendChild(writingDiv);

            noteDiv.appendChild(topDiv);
            noteDiv.appendChild(downDiv);

            noteArea.appendChild(noteDiv);
        });
    }
}

// Attach event listener to the Add button
document.getElementById("addButton").addEventListener("click", function () {
    const noteArea = document.getElementById("noteArea");

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    const topDiv = document.createElement("div");
    topDiv.classList.add("top");
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    const timeDiv = document.createElement("div");
    timeDiv.id = "time";
    dateDiv.appendChild(timeDiv);

    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete");
    deleteDiv.innerText = "delete";
    deleteDiv.addEventListener("click", function () {
        noteArea.removeChild(noteDiv);
        save(); // Save notes after deletion
    });

    const writingDiv = document.createElement("div");
    writingDiv.classList.add("writing");
    writingDiv.contentEditable = false;
    writingDiv.innerText = "";

    const editDiv = document.createElement("div");
    editDiv.classList.add("edit");
    editDiv.innerText = "edit";

    editDiv.addEventListener("click", function () {
        if (writingDiv.contentEditable === "false") {
            writingDiv.contentEditable = "true";
            editDiv.innerText = "save";
        } else {
            writingDiv.contentEditable = "false";
            save(); // Save notes after editing
            editDiv.innerText = "edit";
        }
    });

    const downDiv = document.createElement("div");
    downDiv.classList.add("down");

    topDiv.appendChild(dateDiv);
    topDiv.appendChild(deleteDiv);
    topDiv.appendChild(editDiv);
    downDiv.appendChild(writingDiv);

    noteDiv.appendChild(topDiv);
    noteDiv.appendChild(downDiv);

    noteArea.appendChild(noteDiv);

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    timeDiv.innerHTML = `${hours}:${minutes}   ${day} ,${month}, ${year}`;

    save(); // Save notes after adding a new one
});

// Load notes on page load
document.addEventListener("DOMContentLoaded", load);
