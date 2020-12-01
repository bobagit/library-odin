# Odin Project - Library / Book Project

I used the Berkeley Public Library's [website](https://www.berkeleypubliclibrary.org/) for the design. I wrote out the code for this project and nearly finished it, but ran into looping bugs near the end. I decided to completely rewrite it after some study.

I started reading David Flanagan's (*JavaScript: The Definitive Guide, 7th Edition*)[https://learning.oreilly.com/library/view/javascript-the-definitive/9781491952016/], focusing on chapter 15 that covers events and propagation. I also reviewed [MDN's Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events). After three days of struggling with the same looping bugs, I finally decided it would be worth it to review submitted Odin project code. I made a point to really study the code and look up everything I didn't understand, and not just paste in segments. In particular, [Gkuzin13](https://github.com/Gkuzin13/book-library) was the project that made most sense to me, and is ultimately what got me over the hump — thank you!

## What I Learned
1. Better code organization 
2. I tried to simplify functions
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
4. Adding IDs to data attributes
5. Use Date.now() to provide convenient IDs
6. Used ternary if statements
7. To use the event listener on a button, need HTML "type=button" 
8. .reset() forms is better than a custom function
9. let index = myLibrary.findIndex(x => x.id == getId) to find index values
10. let index = myLibrary.find(x => x.id == getId) to find object
11. Learned about how to deal with checkboxes

## What I Got Stuck On (For Days)
I was using a for loop to rebuild the library books after one was added, removed, or edited, and it would duplicate the entry if you made two or more modifications. I still need to get better at using Chrome Dev Tools to trake this type of looping error. I ended up completely starting over, and once I implemented ID data atrributes, I was able to get beyond this issue.

## TODO
- add local storage
- connect to a database
- improve CSS
- fix mobile modal

## Conclusion
This project was a real confidence booster — as I finished it, I kept thinking about things I can build.