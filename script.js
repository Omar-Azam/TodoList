let popUp = document.querySelector(".popup");
let add = document.querySelector(".add");
let cancel = document.querySelector(".cancel");
let apply = document.querySelector(".apply");
let searchField = document.querySelector(".search-field");
let search = document.querySelector(".search");
let inp = document.querySelector(".add-task");
let todo = document.querySelector(".todo");
let num = "1";
if (localStorage.getItem("num") === null) {
} else {
  num = localStorage.getItem("num");
  for (let index = 1; index <= num; index++) {
    if (localStorage.getItem(`todo${index}`) === null) {
    } else {
      if (
        localStorage.getItem(localStorage.getItem(`todo${index}`)) ==
        localStorage.getItem(`todo${index}`)
      ) {
        todo.innerHTML += `<div class="note">
                      <div class="note-text">
                        <input class="check" type="checkbox" value="checked" />
                        <span class="item">${localStorage.getItem(
                          `todo${index}`
                        )}</span>
                      </div>
                      <div class="edit">
                        <i class='bx bx-message-rounded-x' title="delete"></i>
                        </div>
                    </div>`;
      } else {
        todo.innerHTML += `<div class="note">
                      <div class="note-text">
                        <input class="check" type="checkbox" value="" />
                        <span class="item">${localStorage.getItem(
                          `todo${index}`
                        )}</span>
                      </div>
                      <div class="edit">
                        <i class='bx bx-message-rounded-x' title="delete"></i>
                        </div>
                    </div>`;
      }
    }
  }
}

add.addEventListener("click", (e) => {
  popUp.classList.remove("hide");
  document.querySelector(".container").classList.add("dim");
});
cancel.addEventListener("click", (e) => {
  popUp.classList.add("hide");
  document.querySelector(".container").classList.remove("dim");
  popUp.querySelector(".top .nothing").classList.add("hide");
  popUp.querySelector(".top .same").classList.add("hide");
});
// apply.addEventListener("click", (e) => {
//   popUp.classList.add("hide");
//   document.querySelector(".container").classList.remove("dim");
//   location.reload();
//   if (inp.value.trim() === "") {
//   } else {
//         todo.innerHTML += `<div class="note">
//                       <div class="note-text">
//                         <input class="check" type="checkbox" />
//                         <span class="item">${inp.value.trim()}</span>
//                       </div>
//                       <div class="edit">
//                         <i class='bx bx-message-rounded-x' title="delete"></i>
//                         </div>
//                     </div>`;
//         localStorage.setItem(`todo${num}`, inp.value.trim());
//         inp.value = "";
//         num++;
//         localStorage.setItem("num", num);
//       }
//       });

function addNote() {
// Prevent adding duplicate notes
if (inp.value.trim() === "") {
  popUp.querySelector(".top .same").classList.add("hide");
  popUp.querySelector(".top .nothing").classList.remove("hide");
  return;
}

// Check if the note already exists in the localStorage or in the DOM
const notes = document.querySelectorAll(".note .item");
const newNoteText = inp.value.trim();
let isDuplicate = false;

notes.forEach((note) => {
  if (note.textContent === newNoteText) {
    isDuplicate = true;
  }
});

if (isDuplicate) {
  popUp.querySelector(".top .nothing").classList.add("hide");
  popUp.querySelector(".top .same").classList.remove("hide");
  inp.value = ""; // Clear input field
  return;
}

// Add the new note if it doesn't exist
todo.innerHTML += `<div class="note">
                    <div class="note-text">
                      <input class="check" type="checkbox" />
                      <span class="item">${newNoteText}</span>
                    </div>
                    <div class="edit">
                      <i class='bx bx-message-rounded-x' title="delete"></i>
                    </div>
                  </div>`;
localStorage.setItem(`todo${num}`, newNoteText);
inp.value = ""; // Clear input field
num++;
localStorage.setItem("num", num);
location.reload();
// popUp.classList.add("hide");
// document.querySelector(".container").classList.remove("dim");
}

apply.addEventListener("click", (e) => {
  addNote()
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNote()
  }
});

searchField.addEventListener("keyup", () => {
  // Use keyup event for live search
  const searchTerm = searchField.value.toLowerCase().trim();
  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    const itemText = note.querySelector(".item").textContent.toLowerCase();
    note.style.display = itemText.includes(searchTerm) ? "flex" : "none";
  });
});

todo.addEventListener("change", (event) => {
  if (event.target.classList.contains("check")) {
    const span = event.target.nextElementSibling;
    if (event.target.checked) {
      span.classList.add("checked-1");
      span.innerText;
      localStorage.setItem(span.innerText, span.innerText);
    } else {
      localStorage.removeItem(span.innerText, span.innerText);
      span.classList.remove("checked-1");
      span.value = "";
    }
  }
});

const notes = document.querySelectorAll(".note");

notes.forEach((note) => {
  if (note.querySelector(".check").value == "checked") {
    note.classList.add("checked");
    note.querySelector(".check").checked = true;
  } else {
    note.classList.remove("checked");
    note.querySelector(".check").checked = false;
  }
  note.querySelector(".check").addEventListener("click", (e) => {
    if (e.target.value == "checked") {
      e.target.value = "";
      if (note.querySelector(".check").value == "checked") {
        note.classList.add("checked");
        note.querySelector(".check").checked = true;
      } else {
        note.classList.remove("checked");
        note.querySelector(".check").checked = false;
      }
    } else {
      e.target.value = "checked";
    }
  });
});

// Add event listener to the parent container (todo list)
todo.addEventListener("click", (e) => {
  // Check if the clicked element is a delete button
  if (e.target.classList.contains("bx-message-rounded-x")) {
    const delButton = e.target; // The clicked delete button
    const editDel = delButton.parentElement; // Parent div (edit)
    const noteDel = editDel.parentElement; // Parent div (note)

    if (noteDel) {
      const itemText = noteDel.querySelector(".item")?.innerHTML;

      // Remove the note from the DOM
      noteDel.remove();
      console.log(`Removed: ${itemText}`);

      // num--;
      // localStorage.setItem("num", num);

      // if (localStorage.getItem("num") !== null) {
      //   num = parseInt(localStorage.getItem("num"), 10);
      // }

      // if(todo){
      //   if(todo.innerHTML == ""){
      //     todo.classList.add("empty");
      //   } else {
      //     todo.classList.remove("empty");
      //   }
      // }

      if (localStorage.getItem(itemText) == itemText) {
        localStorage.removeItem(itemText);
      }
      // Remove the corresponding item from localStorage
      for (let index = 1; index <= num; index++) {
        if (localStorage.getItem(`todo${index}`) === itemText) {
          localStorage.removeItem(`todo${index}`);
          break;
        }
      }
    } else {
      console.error("Failed to find the parent note element.");
    }
  }

  location.reload();
});

if (todo) {
  if (todo.innerHTML == "") {
    todo.classList.add("empty");
    num = 1;
    // localStorage.setItem("num", num);
    localStorage.clear();
  } else {
    todo.classList.remove("empty");
  }
}
