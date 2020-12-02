# Odin Project - Library / Book Project

I used the [Berkeley Public Library](https://www.berkeleypubliclibrary.org/) site as the template for the design. On my first attempt of the project, I ran into looping bugs. This held me up for a few days, so I decided to take a break, study, and attempt a complete refactor.

I focused on chapter 15 of Flanagan's *(JavaScript: The Definitive Guide)[https://learning.oreilly.com/library/view/javascript-the-definitive/9781491952016/]* on events and propagation. I also reviewed [MDN's Intro to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events). After a few days of working on the same looping bug, I decided it would be worth it to review a few completed Odin projects. I made a point to study the code and look up everything I didn't understand (and not just blindly paste in segments). In particular, [Gkuzin13](https://github.com/Gkuzin13/book-library) was one of the projects that made most sense to me, and is ultimately what got me over the hump — thank you!

## What I Learned
1. Better code organization 
2. Simplified functions
3. Learned to use .forEach(X) => {...  to set properties to multiple objects:
```
function renderBook() {
  myLibrary.forEach(Book => {
    let bookEntry = document.createElement('div');
    bookEntry.classList.add('bookEntry');
    bookEntry.setAttribute('data-id', Book.id);
    results.appendChild(bookEntry);

    let bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details')
    bookEntry.appendChild(bookDetails)
```
4. Adding IDs to data attributes for easy access
5. Used Date.now() to provide easy ID to data attribue
6. To use the event listener on a button, need HTML "type=button" 
7. .reset() forms is better than a custom function
8. let index = myLibrary.findIndex(x => x.id == getId) to find index values
9. let index = myLibrary.find(x => x.id == getId) to find object
10. Learned about how to deal with checkboxes, ternary operators, and more

## The Looping Issue
Initially, I was using a ```for loop``` to rebuild the array of objects after a card was added or modified, but it would duplicate the entries — but it would only do this after two or more modifications were made to the library. Adding an ID to each object, and referencing them by data attribute solved my issue.

## TODO
- add local storage (later)
- connect to a Firebase (in progress)
- improve CSS
- fix mobile modal