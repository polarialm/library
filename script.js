const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}



function addBookToLibrary (title, author, pages, read) {
    const book = new Book(title,author, pages, read)
    myLibrary.push(book)
}

addBookToLibrary('Book1','Author1',222,false)

function initLibraryCards () {
    myLibrary.forEach((item) => {
        function hasRead(){
            if (this.read === true) {
                return 'not read yet.'
            } else return 'has been read.'
        }
        let readPhrase = hasRead()
        const container = document.querySelector('.card-container')
        const card = document.createElement('div')
        card.classList.add('card')
        const title = document.createElement('h3')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const read = document.createElement('p')
        title.textContent = item.title
        author.textContent = item.author
        pages.textContent = item.pages
        read.textContent = readPhrase
        card.appendChild(title)
        card.appendChild(author)
        card.appendChild(pages)
        card.appendChild(read)
        container.appendChild(card)
    })
}

initLibraryCards()

const plus = document.querySelector('#plus-btn')
const dialog = document.querySelector('dialog')

plus.addEventListener('click', function () {
    dialog.showModal()
})

const submit_button = document.querySelector('#submit-button')
const inputs = document.querySelectorAll('input')

function plusNewBook (title, author, pages, read) {
    const card_container = document.querySelector('.card-container')
    card_container.innerHTML = ''
    addBookToLibrary(title, author, pages, read)
    initLibraryCards()
}

submit_button.addEventListener("click", (event) => {
    inputs.forEach((item) => {
        if (item.validity.valid === false) {
            const errors = document.querySelectorAll(".error")
            errors.forEach((eitem) => {
                if (eitem.dataset.errorTarget === item.name) {
                    eitem.style.display = "block"
                }
            })
            throw new Error('bad')
        }
    })
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').value 
    plusNewBook(title, author, pages, read)
    event.preventDefault()
})

const close_button = document.getElementById('close')

close_button.addEventListener("click", (event) => {
    dialog.close()
})

