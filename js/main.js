const results = document.getElementById('results') 
const formAddNewBook = document.getElementById('add-form')
const isBookCompleted = document.getElementById('readStatusBox')
const modalSaveButton = document.getElementById('modal-save-button')
const modalDeleteButton = document.getElementById('modal-delete-button')

let myLibrary = [{
        id: 1606253742720,
        title: "The Definitive Guide to Red Meat",
        author: "Sir King Winsley",
        pages: 1,
        readStatus: true,
      },
      {
        id: 1606251732520,
        title: "Home Decor 101",
        author: "Dr. Elloit Charmer",
        pages: 230,
        readStatus: false,
      }, {
        id: 1606353782720,
        title: "How To Raise A Vegan",
        author: "Karolin Hurtnowski",
        pages: 1321,
        readStatus: false,
      }
      ];

function Book(id, title, author, pages, readStatus) {
    this.id = id,
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
}

function renderBook() {
  myLibrary.forEach(Book => {
    let bookEntry = document.createElement('div');
    bookEntry.classList.add('bookEntry');
    bookEntry.setAttribute('data-id', Book.id);
    results.appendChild(bookEntry);

    let bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details')
    bookEntry.appendChild(bookDetails)

    let titleInfo = document.createElement('h2');
    titleInfo.classList.add('title-info');
    titleInfo.textContent = Book.title;
    bookDetails.appendChild(titleInfo);
    
    let authorInfo = document.createElement('p');
    authorInfo.classList.add('author-info');
    authorInfo.textContent = ' by ' + Book.author;
    bookDetails.appendChild(authorInfo);
    
    let pageOrPages = (Book.pages > 1) ? "pages": "page";

    let pagesInfo = document.createElement('p')
    pagesInfo.classList.add('pages-info');
    pagesInfo.textContent = Book.pages + ` ${pageOrPages}`;
    bookDetails.appendChild(pagesInfo);
    
    let readStatus = document.createElement('p');
    readStatus.classList.add('read-status');
    bookDetails.appendChild(readStatus);
    readStatus.setAttribute('data-id', Book.id);

    bookCompleted = () => {
      readStatus.textContent = 'Completed';
    };

    bookNotRead = () => {
      readStatus.textContent = 'Not Read Yet';
    };

    if (Book.readStatus == true) {
      bookCompleted();
    } else {
      bookNotRead();
    };
    let tools = document.createElement('div');
    tools.classList.add('tools')
    bookEntry.appendChild(tools)

    let editLibraryBookButton = document.createElement('img');
    editLibraryBookButton.setAttribute('src', 'images/icon-edit.png')
    editLibraryBookButton.classList.add('edit-btn');
    editLibraryBookButton.setAttribute('data-id', Book.id);
    tools.appendChild(editLibraryBookButton);
    
    let bookDelete = document.createElement('span');
    bookDelete.classList.add('book-del-btn');
    bookDelete.textContent = 'X';
    bookDelete.setAttribute('data-id', Book.id);
    tools.appendChild(bookDelete);    
  });
};

renderBook();

addBook = () => {
  this.id = Date.now();
  this.title = document.getElementById('title-name').value;
  this.author = document.getElementById('author-name').value;
  this.pages = parseInt(document.getElementById('page-num').value);
  this.readStatus = (isBookCompleted.checked == true) ? true : false;
  // Add new object to Library
  let addNewBook = new Book(id, title, author, pages, readStatus);
  myLibrary.push(addNewBook);
  
  // Remove rendered books
  results.querySelectorAll('.bookEntry').forEach(e => e.remove());
  renderBook();
}

formAddNewBook.addEventListener('submit', function(e) {
  e.preventDefault();
  addBook();
  formAddNewBook.reset();
  console.log(myLibrary);
  });


results.addEventListener('click', function(e) {
  e.preventDefault();
  // LEARNED e.target.classList.contains
  let getId = e.target.getAttribute('data-id');
  if (e.target.classList.contains('edit-btn')) {
    // finds object based on ID
    let bookBeingEdited = myLibrary.find(x=> x.id == getId)

    let modal = document.querySelector('.modal');
    modal.style.display = 'block';

    // populate fields with found fields
    let modalTitle = document.getElementById('modal-title');
    modalTitle.value = bookBeingEdited.title

    let modalAuthor = document.getElementById('modal-author');
    modalAuthor.value = bookBeingEdited.author;

    let modalPages = document.getElementById('modal-pages');
    modalPages.value = bookBeingEdited.pages;
  
    let modalReadStatus = document.querySelector('.modal-checkbox')
    if (bookBeingEdited.readStatus) {
      modalReadStatus.checked = true;
    } else {
      modalReadStatus.checked = false;
    }
    let modalSaveButton = document.querySelector('.modal-save-button')
    modalSaveButton.setAttribute('data-id', getId);

    let modalDeleteButton = document.querySelector('.modal-delete-button')
    modalDeleteButton.setAttribute('data-id', getId);

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', e => {
      modal.style.display = 'none';
    });

    window.onclick = (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      };
    };

    modalSaveButton.addEventListener('click', e => {
      e.preventDefault();
      let getId = e.target.getAttribute('data-id');
      // find index in myLibrary of target book
      let index = myLibrary.findIndex(x => x.id == getId)
      myLibrary[index].title = modalTitle.value
      myLibrary[index].author = modalAuthor.value
      myLibrary[index].pages = parseInt(modalPages.value)
      myLibrary[index].readStatus = modalReadStatus.checked
      console.log(myLibrary)
      modal.style.display = 'none';
      results.querySelectorAll('.bookEntry').forEach(e => e.remove());
      renderBook();
    });

    modalDeleteButton.addEventListener('click', e => {
      e.preventDefault();
      let getId = e.target.getAttribute('data-id');
      // find index in myLibrary of target book
      let index = myLibrary.findIndex(x => x.id == getId)
      
      myLibrary.splice(index, 1)
      modal.style.display = 'none';
      results.querySelectorAll('.bookEntry').forEach(e => e.remove());
      renderBook();
      e.stopImmediatePropagation()
    });
   };
})
