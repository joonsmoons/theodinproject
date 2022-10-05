let myLibrary = [];

function Book(name, author, pages, read) {
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

const theHobbit = new Book("The Hobbit1", "J.R.R. Tolkien", 295, true);
const theHobbit2 = new Book("The Hobbit2", "J.R.R. Tolkien", 295, true);
const theHobbit3 = new Book("The Hobbit3", "J.R.R. Tolkien", 295, true);

addBookToLibrary(theHobbit, theHobbit2, theHobbit3);
// console.log("library", myLibrary);

const displayLibrary = () => {
  const library = document.querySelector("#library");
  library.innerHTML = "";
  myLibrary.map((book) => {
    // console.log(book.name);
    const ul = document.createElement("ul");
    ul.classList.add("book-card");
    for (const attr in book) {
      if (attr !== "info") {
        const el = document.createElement("li");
        el.innerHTML = `<strong>${
          attr.charAt(0).toUpperCase() + attr.slice(1)
        }</strong>: ${book[attr]}`;
        ul.append(el);
      }
    }
    library.appendChild(ul);
  });
};

displayLibrary();

const bookForm = document.querySelector("#add-form");

document.querySelector("#add-book").addEventListener("click", function (e) {
  e.preventDefault();
  bookForm.className = "click-on";
  document.querySelector(".main-container").style.filter = "blur(20px)";
});

const addBook = bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newBook = new Book(
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

document.querySelector("#close").addEventListener("click", function (e) {
  e.preventDefault();
  resetInputs();
  displayLibrary();
  bookForm.className = "click-off";
  document.querySelector(".main-container").style.filter = "none";
});

const resetInputs = () => {
  document.querySelector("#read-y").checked = false;
  document.querySelector("#read-n").checked = false;
  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = "";
  }
};
