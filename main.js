const addBook = document.querySelector('.add_new_book');
let readStatus = document.querySelector('.status');
let notReadStatus = document.querySelector('.not_read_status');
let status = document.querySelector('.status');
let title = document.querySelector('.title').value;
let author = document.querySelector('.author').value;
const addBookField = document.querySelector('.new_book');
const book = document.querySelector('.book');
let content = document.querySelector('.content');
const add = document.querySelector('.add');

let readButton = document.querySelector('.read_status');


readButton.addEventListener('click', (book) => {
    if(book.isRead == "not read yet") {
        book.isRead = "read";
        console.log(book.isRead);
    }
    else {
        book.isRead = "not read yet";
        console.log(book.isRead);
    }
});

let myLibrary = [];

myLibrary.push(new Book("Hobbit", "J.R.R. Tolkien", "not read yet"));
myLibrary.push(new Book("The Laws of Human Nature", "Robert Green", "not read yet"));

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

function addBookTolibrary() {
    let title = document.querySelector('.title').value;
    let author = document.querySelector('.author').value;
    // let isRead = document.querySelector('.read_status').value;
    let isRead = "";
    readStatus.addEventListener('click', () => {
        isRead = readStatus.value;
    });
    let book = new Book(title, author, isRead);
    myLibrary.push(book);
    console.log(myLibrary);
    displayBooks();
}


function displayBooks() {
    content.innerHTML = "";
    myLibrary.map(book => { 
        let newBook = document.createElement('div');
        newBook.classList.add('book');

        let bookTitle = document.createElement('span');
        bookTitle.classList.add('book_title');
        bookTitle.textContent = book.title;

        let bookAuthor = document.createElement('span');
        bookAuthor.classList.add('book_author');
        bookAuthor.textContent = book.author;

        let bookStatus = document.createElement('div');
        if(book.isRead == true) {
            bookStatus.classList.add('read_status');
            bookStatus.textContent = "Mark as read";
            bookStatus.value = "true";
        }
        else {
            bookStatus.classList.add('not_read');
            bookStatus.textContent = "Mark as not read";
            bookStatus.value = "false";
        }

        content.appendChild(newBook);
        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(bookStatus);
    });
}

addBook.addEventListener('click', () => {
    let setTitle = document.querySelector('.title');
    let setAuthor = document.querySelector('.author');
    setTitle.value = "";
    setAuthor.value = "";
    if(addBookField.style.visibility == 'hidden') {
        addBookField.style.visibility = 'visible';
    }
    else {
        addBookField.style.visibility = 'hidden';
    }
});

add.addEventListener('click', () => {
    addBookTolibrary();
    addBookField.style.visibility = 'hidden';
    title.textContent = "";
    author.textContent = "";
});

displayBooks();