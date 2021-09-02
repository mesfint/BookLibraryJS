let books = document.querySelector(".books");
const addBookBtn = document.querySelector(".btnAddBook");
const form = document.querySelector("form");
const addBtn = document.querySelector("#bookadd_btn");

const html = new HTMLUI();

eventListeners();

let myLibrary = [
  {
    title: "	Operation Hail Storm (Hail, #1)",
    author: "Shedny sheldon",
    pages: 300,
  },
  {
    title: "Una Historia de Ayer",
    author: "Boris Batman",
    pages: 600,
  },
  { title: "The shuttle", author: "David hufman", pages: 350 },
];

function Book(title, author, pages, read) {
  //the constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function eventListeners() {
  document.addEventListener("DOMContentLoaded", function () {
    html.showForm();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //Read values from the form
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    let text = read;

    if (read === true) {
      text = "Read";
    } else {
      text = "Not read yet";
    }
    console.log(text);
    //Instantiate book
    const book = new Book(title, author, pages, text);
    console.log(book);

    //Check all fields have something
    if (title === "" || author === "" || pages === "") {
      //Remove after 3 second
      html.displayError("All fields are mandatory");
      setTimeout(() => {
        document.querySelector(".error").remove();
      }, 3000);
    } else {
      html.displayBooks(book);
      html.clearFields();
      html.displaySuccess("Form Successfully Inserted!!!");
      form.style.display = "none";
    }
  });
}

function HTMLUI() {}

HTMLUI.prototype.showForm = function () {
  addBtn.addEventListener("click", function () {
    form.style.display = "block";
  });
};

HTMLUI.prototype.displayBooks = function (book) {
  const div = document.createElement("div");
  div.classList = "book";
  //Delete book btn
  const delButton = document.createElement("button");
  delButton.className = "remove-Btn";
  delButton.textContent = "Remove";
  //Read status change btn
  const readStatusButton = document.createElement("button");
  readStatusButton.className = "readStatusToggle-Btn";
  readStatusButton.textContent = "Change read status";

  div.innerHTML = `
    <h4>Title: ${book.title}</h4>
    <h5>Author: ${book.author}</h5>
    <h5>Pages: ${book.pages}</h5>
    <p class="read">${book.read}</p>
   
      `;
  div.appendChild(delButton);
  div.appendChild(readStatusButton);

  const spinner = document.querySelector("#loading img");
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    books.append(div);
    html.removeBook();
    html.toggleReadStatus();
  }, 1000);
};

//Print error
HTMLUI.prototype.displayError = function (message) {
  const div = document.createElement("div");
  div.classList = "error";
  div.innerHTML = `
      <p>${message}</p>
      `;
  form.insertBefore(div, document.querySelector(".form-group"));
};

//Print success
HTMLUI.prototype.displaySuccess = function (message) {
  const div = document.createElement("div");
  div.classList = "success";
  div.innerHTML = `
    <p>${message}</p>
    `;
  form.insertBefore(div, document.querySelector(".form-group"));
  setTimeout(() => {
    document.querySelector(".success").remove();
  }, 3000);
};
//Toggle read status
HTMLUI.prototype.toggleReadStatus = function () {
  const btn = document.querySelector(".readStatusToggle-Btn");
  let readText = document.querySelector(".read");
  btn.addEventListener("click", function () {
    if (readText.textContent === "Read") {
      readText.textContent = "Not read yet";
    } else if ((readText.textContent = "Not read yet")) {
      readText.textContent = "Read";
    }
  });
};

//Clear fields

HTMLUI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
};

//delete Book
HTMLUI.prototype.removeBook = function () {
  document.addEventListener("click", function (e) {
    if (e.target.className == "remove-Btn") {
      e.target.parentElement.remove();
    } else {
      return;
    }
  });

  //console.log(e.target);
};
