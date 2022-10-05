let myLibrary = [];

function Book(id, name, author, pages, read) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let read = this.read ? "has been read" : "has not been read";
  return `${this.name}, author ${this.author} has ${this.pages} pages and ${read}`;
};

function addBookToLibrary(...book) {
  myLibrary = myLibrary.concat(book);
}

// some sample books
const theHobbit = new Book(-2, "The Hobbit", "J.R.R. Tolkien", 295, true);
const theHobbit2 = new Book(
  -1,
  "Who Moved My Cheese?",
  "Spencer Johnson",
  94,
  true
);
const theHobbit3 = new Book(0, "The Little Prince", "Saint-Exupéry", 96, false);

addBookToLibrary(theHobbit, theHobbit2, theHobbit3);
// console.log("library", myLibrary);

const displayLibrary = () => {
  const library = document.querySelector("#library");
  library.innerHTML = "";
  myLibrary.map((book, index) => {
    // console.log(book.name);
    const ul = document.createElement("ul");
    ul.classList.add("book-card");
    ul.setAttribute("id", book.id);
    for (const attr in book) {
      if (attr !== "info" && attr !== "id") {
        const el = document.createElement("li");
        el.innerHTML = `<strong>${
          attr.charAt(0).toUpperCase() + attr.slice(1)
        }</strong>: ${book[attr]}`;
        ul.append(el);
      }
    }
    library.appendChild(ul);
    const readToggle = book.read ? "unread" : "read";
    ul.innerHTML = `<span class='close remove-book'></span><br/>${ul.innerHTML}<br/><span class='read'>Mark as <button id='book-read-toggle'>${readToggle}</button></span>`;
  });
};

displayLibrary();

const bookForm = document.querySelector("#add-form");
const addBook = bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newBook = new Book(
    myLibrary.length + 1,
    this.elements["book-name"].value,
    this.elements["book-author"].value,
    this.elements["num-pages"].value,
    document.querySelector("#read-y").checked
  );
  addBookToLibrary(newBook);
  resetInputs();
  displayLibrary();
  this.className = "click-off";
  document.querySelector(".main-container").style.filter = "none";
});

document.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches(".remove-book")) {
    // remove book from library
    myLibrary = myLibrary.filter((book) => book.id !== +e.target.parentNode.id);
    displayLibrary();
  } else if (e.target.matches("#close-input")) {
    // close book add input
    resetInputs();
    displayLibrary();
    bookForm.className = "click-off";
    document.querySelector(".main-container").style.filter = "none";
  } else if (e.target.matches("#add-book")) {
    // click add book, blur background
    bookForm.className = "click-on";
    document.querySelector(".main-container").style.filter = "blur(20px)";
  } else if (e.target.matches("#book-read-toggle")) {
    const changeBook = myLibrary.find(
      (book) => book.id == +e.target.parentNode.parentNode.id
    );
    changeBook.read = !changeBook.read;
    myLibrary = myLibrary.map((book) =>
      book.id !== changeBook.id ? book : changeBook
    );
    displayLibrary();
  }
});

const resetInputs = () => {
  document.querySelector("#read-y").checked = false;
  document.querySelector("#read-n").checked = false;
  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = "";
  }
};
