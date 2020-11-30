// LEARNED assign selectors at top. Organize.
let newBookBtn = document.querySelector('.new-book-btn')
let cancelBtn = document.querySelector('.cancel-btn')
const results = document.getElementById('results') 
let formAddNewBook = document.getElementById('add-form')
let isBookCompleted = document.getElementById('readStatusBox')
const modalForm = document.getElementById('modalForm')

let myLibrary = [{
        id: 1606253782720,
        title: "The Definitive Guide",
        author: "Sir King Winsley",
        pages: 924,
        readStatus: true,
      },
      {
        id: 1606253732520,
        title: "How Is It Possible",
        author: "Dr. Elloit Charmer",
        pages: 230,
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

// LEARNED using forEach, then dynamically setting properpties to 
// multiple values by the Book => { .... Book } construct
function renderBook() {
  myLibrary.forEach(Book => {
    let bookEntry = document.createElement('div');
      bookEntry.classList.add('bookEntry');
      bookEntry.setAttribute('data-id', Book.id);
      results.appendChild(bookEntry);

    let bookDelete = document.createElement('span');
      bookDelete.classList.add('book-del-btn');
      bookDelete.textContent = '×';
      bookDelete.setAttribute('data-id', Book.id);
      bookEntry.appendChild(bookDelete);

    let titleInfo = document.createElement('h2');
      titleInfo.classList.add('title-info');
      titleInfo.textContent = Book.title;
      bookEntry.appendChild(titleInfo);
    
    let authorInfo = document.createElement('p');
      authorInfo.classList.add('author-info');
      authorInfo.textContent = ' by ' + Book.author;
      bookEntry.appendChild(authorInfo);
    
    let pagesInfo = document.createElement('p')
      pagesInfo.classList.add('pages-info');
      pagesInfo.textContent = Book.pages + ' pages';
      bookEntry.appendChild(pagesInfo);

    let editLibraryBookButton = document.createElement('button');
    editLibraryBookButton.classList.add('edit-btn');
    editLibraryBookButton.setAttribute('data-id', Book.id);
    editLibraryBookButton.textContent = 'Edit';
    bookEntry.appendChild(editLibraryBookButton);
    
    let readStatus = document.createElement('p');
      readStatus.classList.add('read-status');
      bookEntry.appendChild(readStatus);
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

    });
  };

renderBook();

addBook = () => {
  // LEARNED using Date as a UNIQUE ID
  // LEARNED how to use :checked to see if checkbox is checked
  // LEARNED how to use ternary if statement
  this.id = Date.now();
  this.title = document.getElementById('title-name').value;
  this.author = document.getElementById('author-name').value;
  this.pages = document.getElementById('page-num').value;
  this.readStatus = (isBookCompleted.checked == true) ? true : false;
  // Add new object to Library
  let addNewBook = new Book(id, title, author, pages, readStatus);
  myLibrary.push(addNewBook);
  
  // Remove rendered books
  results.querySelectorAll('.bookEntry').forEach(e => e.remove());
  renderBook();
}

// LEARNED "type=button" needs to be attribute in button HTML!
// .reset() works because it's working on the button type

formAddNewBook.addEventListener('submit', function(e) {
  e.preventDefault();
  addBook();
  formAddNewBook.reset();
  console.log(myLibrary);
  });


results.addEventListener('click', function(e) {
  e.stopPropagation()
  // LEARNED e.target.classList.contains
  let getId = e.target.getAttribute('data-id');
  if (e.target.classList.contains('edit-btn')) {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == getId) {
        // fire modal
        let modal = document.querySelector('.modal');
        modal.style.display = 'block';
        
        // populate fields with found fields
        let modalTitle = document.getElementById('modal-title');
        modalTitle.value = myLibrary[i].title;

        let modalAuthor = document.getElementById('modal-author');
        modalAuthor.value = myLibrary[i].author;

        let modalPages = document.getElementById('modal-pages');
        modalPages.value = myLibrary[i].pages;

        let modalReadStatus = document.querySelector('.modal-checkbox')
        if (myLibrary[i].readStatus) {
          modalReadStatus.checked = true;
        } else {
          modalReadStatus.checked = false;
        }

        let closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', (e) => {
          modal.style.display = 'none';
        });

        window.onclick = function(e) {
          if (e.target == modal) {
            modal.style.display = 'none';
          };
        };

        modalForm.addEventListener('click', e => {
          e.preventDefault()
          if (e.target.classList.contains('modal-save-button')) {
            myLibrary[i].title = modalTitle.value
            myLibrary[i].author = modalAuthor.value
            myLibrary[i].pages = modalPages.value
            myLibrary[i].readStatus = modalReadStatus.value
            console.log(myLibrary)
            modal.style.display = 'none';
            results.querySelectorAll('.bookEntry').forEach(e => e.remove());
            renderBook();
            e.stopImmediatePropagation()
            }
         });
        break
        } 
     } 
    }
 })



