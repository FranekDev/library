let addBook = document.querySelector('.add_new_book');
const addBookField = document.querySelector('.new_book');
let content = document.querySelector('.content');
const add = document.querySelector('.add');
const bookIsRead = document.querySelector('.mark_as_read');
const bookIsNotRead = document.querySelector('.mark_as_not_read');

let isRead = false;
let id = 0;

let myLibrary = [];

myLibrary.push(new Book("Hobbit", "J.R.R. Tolkien", false, id++));
myLibrary.push(new Book("The Laws of Human Nature", "Robert Green", true, id++));

function Book(title, author, isRead, id) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.id = id;
}

const isEmpty = (str) => !str.trim().length;

bookIsRead.addEventListener('click', () => { 
    isRead = true; 
    bookIsRead.style.backgroundColor = 'rgb(177, 255, 153, 0.3)';
    bookIsNotRead.style.backgroundColor = 'rgb(255, 130, 130)';
});
bookIsNotRead.addEventListener('click', () => {
    isRead = false; 
    bookIsNotRead.style.backgroundColor = 'rgb(255, 130, 130, 0.3)';
    bookIsRead.style.backgroundColor = 'rgb(177, 255, 153)';
});

function addBookTolibrary() {
    
    let title = document.querySelector('.title').value;
    let author = document.querySelector('.author').value;

    if(!isEmpty(title) && !isEmpty(author)) {
        let book = new Book(title, author, isRead, id++);
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

        let removeBook = document.createElement('div');
        removeBook.classList.add('remove_book');
        removeBook.textContent = "Remove";

        removeBook.addEventListener('click', () => {
            delete myLibrary[book.id];
            displayBooks();
        });

        let editButtons = document.createElement('div');
        editButtons.classList.add('edit_buttons');
        editButtons.appendChild(bookStatus);
        editButtons.appendChild(removeBook);

        content.appendChild(newBook);
        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(editButtons);
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
    bookIsRead.style.backgroundColor = 'rgb(177, 255, 153)';
    bookIsNotRead.style.backgroundColor = 'rgb(255, 130, 130)';
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