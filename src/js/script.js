const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

const booksList = document.querySelector('.books-list');
const filtersOf = document.querySelector('.filters');

let filters = [];
function render() {
  for(let book of dataSource.books){
    const generatedHTML = bookTemplate(book);
    const bookDomElement = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(bookDomElement);
  }
}

render();

function initActions(){
  let favoriteBooks = [];
  const booksListDOM = document.querySelector('.books-list');
  booksListDOM.addEventListener('dblclick', function(event) {
    if (event.target.offsetParent.classList.contains('book__image')=== true) {
      const bookId = event.target.offsetParent.getAttribute('data-id');
      console.log(bookId);
      if (event.target.offsetParent.classList.contains('favorite') === false) {
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        event.target.offsetParent.classList.remove('favorite');
        for(let i = 0; i < favoriteBooks.length; i++) {                        
          if (favoriteBooks[i] == bookId) { 
            favoriteBooks.splice(i, 1);      
          }
        }
      }
    }
  });
  
  filtersOf.addEventListener('click',function (event) {
    const filterValue = event.target.value;
    if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
      if(event.target.checked === true){
        filters.push(filterValue);
      }else{
        for(let i = 0; i < filters.length; i++) {                        
          if (filters[i] == event.target.value) { 
            filters.splice(i, 1);      
          }
        }
      }
    }
    filterBooks();
  });

  function filterBooks() {
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of filters){
        if(filter && book.details[filter] == false ){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden == true){
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
      }else {
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
      }
    }
  }
}



initActions();