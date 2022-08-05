## Fire and Ice Api     
The node module interfaces with the [An API of Ice and Fire](https://anapioficeandfire.com/)    

### Installation   
* `git clone` into the repository    
* `cd fire_and_ice_api`   
* `npm install`     
* In the web browser, run `htt://localhost:8000/api`

### Endpoints   
* `getBookCharacters(id):` returns the list of characters in the a book of given id.
* `getBooks():` returns a list of books, authors, and year released.
* `getComments():` returns a list of comments in the book.
* `getCommentById():` returns a comment based on id.
* `addComment():` adds comments to mysql database.
* `updateComment():` updates comments in the database.
* `deleteComment(id)`: deletes comments of a given id.
* `getCommentsByBook(book_name):` retrieves comments from the database.
