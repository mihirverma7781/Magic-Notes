console.log("this is a note app");

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);

  showNotes();
});

//function to show elements from local storage
const showNotes = () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //   console.log(notesObj);
  let html = "";
  notesObj.forEach((element, index) => {
    html += ` <div class="noteCard my-2 mx-2 card del-${
      index + 1
    }" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}.</p>
                <button class="btn btn-primary delBtn" id="${index}" onClick="dNote(this.id)">Delete Note</button>
              </div></div>`;
  });
  //   console.log(notes);
  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML =
      "<h4>No notes made yet !!!<br/><br/> Use add notes & make a note.</h5>";
  }
};
showNotes();

//function to delete a node

function dNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); // first argument starting and sec is how many nodes
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  // console.log("iam deleteing",index)
}

//
let search = document.getElementById("searchTxt");

search.addEventListener("input", () => {
  // console.log("input event", search.value);

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    //  console.log(cardTxt);
    if (cardTxt.includes(search.value.toLowerCase())) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
