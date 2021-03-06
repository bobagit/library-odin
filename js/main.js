const results = document.getElementById('results') 
const formAddNewBook = document.getElementById('add-form')
const isBookCompleted = document.getElementById('readStatusBox')
const modalSaveButton = document.getElementById('modal-save-button')
const modalDeleteButton = document.getElementById('modal-delete-button')
const modalCancelButton = document.getElementById('modal-cancel-button')

// Local Storage Check Availability Function
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test me field too, bc code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if something already stored
      (storage && storage.length !== 0);
  }
}

let myLibrary = [
  {
    id: 1606882563931,
    title: "Is Firebase Better Than Heroku?",
    author: "Bryon Sebastian",
    pages: 44,
    readStatus: false
  },
  {
    id: 1606843564921,
    title: "JavaScript: The Definitive Guide, 7th Edition",
    author: "David Flanagan",
    pages: 706,
    readStatus: true
  }
];

renderBook();

// // Get objects from Firebase
// const dbRefObject = firebase.database().ref().child('object');
// dbRefObject.on('value', snap => {
//   results.querySelectorAll('.bookEntry').forEach(e => e.remove());
//   myLibrary.push(snap.val())
//   renderBook();
// })

class Book {
  constructor(id, title, author, pages, readStatus) {
    this.id = id,
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
  }
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
    editLibraryBookButton.setAttribute('src', 'images/icon-edit.png');
    editLibraryBookButton.classList.add('edit-btn');
    editLibraryBookButton.setAttribute('data-id', Book.id);
    tools.appendChild(editLibraryBookButton);
    
    let bookDelete = document.createElement('img');
    bookDelete.classList.add('book-del-btn');
    bookDelete.setAttribute('src', 'images/icon-delete.png');
    bookDelete.setAttribute('data-id', Book.id);
    tools.appendChild(bookDelete);    
  });
};

addBook = () => {
  this.id = Date.now();
  this.title = document.getElementById('title-name').value;
  this.author = document.getElementById('author-name').value;
  this.pages = parseInt(document.getElementById('page-num').value);
  this.readStatus = (isBookCompleted.checked == true) ? true : false;
  // Add new object to Library
  let addNewBook = new Book(id, title, author, pages, readStatus);
  
  // Old local object library
  myLibrary.push(addNewBook);
  
  // Add to Firebase
  // let fbDatabase = firebase.database().ref().child('object');
  // let newEntry = fbDatabase.push();
  // newEntry.update(addNewBook);

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
      myLibrary.splice(index, 1);
      modal.style.display = 'none';
      results.querySelectorAll('.bookEntry').forEach(e => e.remove());
      renderBook();
      e.stopImmediatePropagation()
    });

    modalCancelButton.addEventListener('click', e => {
      e.preventDefault();
      modal.style.display = 'none';
      e.stopImmediatePropagation()
    });

   } else if (e.target.classList.contains('book-del-btn')) {
    // finds object based on ID
    let getId = e.target.getAttribute('data-id');
    let index = myLibrary.findIndex(x => x.id == getId)
    myLibrary.splice(index, 1);
    results.querySelectorAll('.bookEntry').forEach(e => e.remove());
    renderBook();
    e.stopImmediatePropagation();
  } 
   
})



// TODO
// - add local storage
// - connect to a database
// - improve CSS
// - fix mobile modal
