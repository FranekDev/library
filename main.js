let addBook = document.querySelector('.add_new_book');
const addBookField = document.querySelector('.new_book');
let content = document.querySelector('.content');
const add = document.querySelector('.add');
const bookIsRead = document.querySelector('.mark_as_read');
const bookIsNotRead = document.querySelector('.mark_as_not_read');

let isRead = false;

let myLibrary = [];

myLibrary.push(new Book("Hobbit", "J.R.R. Tolkien", false));
myLibrary.push(new Book("The Laws of Human Nature", "Robert Green", true));

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

const isEmpty = (str) => !str.trim().length;

bookIsRead.addEventListener('click', () => { isRead = true; });
bookIsNotRead.addEventListener('click', () => { isRead = false; });

function addBookTolibrary() {
    
    let title = document.querySelector('.title').value;
    let author = document.querySelector('.author').value;

    if(!isEmpty(title) && !isEmpty(author)) {
        let book = new Book(title, author, isRead);
        myLibrary.push(book);
    }
    console.log(myLibrary);
    displayBooks();
}


function displayBooks() {
    content.innerHTML = "";
    myLibrary.map(book => { 
        console.log(book.isRead);
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
            bookStatus.classList.add('read_status', 'read');
            bookStatus.textContent = "Mark as read";
            bookStatus.setAttribute('value', 'true');
        }
        else {
            bookStatus.classList.add('not_read', 'read_status');
            bookStatus.textContent = "Mark as not read";
            bookStatus.setAttribute('value', 'false');
        }
        changeBookStatus(bookStatus);

        content.appendChild(newBook);
        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(bookStatus);
    });
}

let changeBookStatus = (bookStatus) => {

  bookStatus.addEventListener('click', () => {
      if (bookStatus.getAttribute('value') == "true") {
          bookStatus.classList.remove('read');
          bookStatus.classList.add('not_read');
          bookStatus.textContent = "Mark as not read";
          bookStatus.setAttribute('value', 'false');
      }
      else if (bookStatus.getAttribute('value') == "false") {
          bookStatus.classList.remove('not_read');
          bookStatus.classList.add('read');
          bookStatus.textContent = "Mark as read";
          bookStatus.setAttribute('value', 'true');
      }
  });

}

addBook.addEventListener('click', () => {
    let setTitle = document.querySelector('.title');
    let setAuthor = document.querySelector('.author');
    setTitle.value = "";
    setAuthor.value = "";
    let readStatus = document.querySelectorAll('.read_status');
    
    if(addBookField.style.display == 'flex') {
        addBookField.style.display = 'none';
        document.body.style.backgroundColor = 'rgb(255, 246, 235)';
        readStatus.forEach((status) => {
            status.style.opacity = '1';
        });
    }
    else {
        addBookField.style.display = 'flex';
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        readStatus.forEach((status) => {
            status.style.opacity = '0.5';
        });
    }
});

add.addEventListener('click', () => {
    addBookTolibrary();
    addBookField.style.display = 'none';
    let readStatus = document.querySelectorAll('.read_status');
    document.body.style.backgroundColor = 'rgb(255, 246, 235)';
    readStatus.forEach((status) => {
        status.style.opacity = '1';
    });
});

window.onload = displayBooks();