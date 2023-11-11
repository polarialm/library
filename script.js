const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    function read(){
        if (this.read === true) {
            return 'not read yet.'
        } else return 'has been read.'
    }
    let readPhrase = read()
    return `${this.title} by ${this.author}, ${this.pages}, ${readPhrase}`
}

function addBookToLibrary (title, author, pages, read) {
    const book = new Book(title,author, pages, read)
    myLibrary.push(book)
}