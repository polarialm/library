let myLibrary = []
let selectedRemoves
let hasExecutedRemoval = false

function removeBook (button) {
    const card = button.closest('.card')
    
    for (let index = 0; index < myLibrary.length; index++) {
        if (index === Number(card.getAttribute('data-book-index'))) {
            myLibrary.splice(index,1)
        }
    }
    initLibraryCards()
}


function Book(title, author, pages, read) {
    function readPhrase() {
        if (read === true) {
            return 'has been read.'
        } else return 'has not been read yet.'
    }
    this.title = title
    this.author = author
    this.pages = pages
    this.read = readPhrase()
}

function addBookToLibrary (title, author, pages, read) {
    const book = new Book(title,author, pages, read)
    myLibrary.push(book)
}


function initLibraryCards () {
    const container = document.querySelector('.card-container')
    container.innerHTML = ""
    if (myLibrary.length === 0) {
        const text = document.createElement('p')
        text.textContent = 'Your library is empty. Try adding some books!'
        container.appendChild(text)
    } else {
    myLibrary.forEach((item, index) => {
        const card = document.createElement('div')
        card.classList.add('card')
        const top = document.createElement('div')
        top.classList.add('top')
        const remove = document.createElement('button')
        remove.classList.add('remove')
        remove.setAttribute('type', 'button')
        remove.appendChild(document.createTextNode('X'))
        // Attribute listener to remove!!!
        const title = document.createElement('h3')
        top.appendChild(title)
        top.appendChild(remove)
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const read = document.createElement('p')
        title.textContent = item.title
        author.textContent = item.author
        pages.textContent = item.pages
        read.textContent = item.read
        card.appendChild(top)
        card.appendChild(author)
        card.appendChild(pages)
        card.appendChild(read)
        card.setAttribute('data-book-index', `${index}`)
        container.appendChild(card)
        remove.addEventListener('click', (event) => {
            removeBook(remove)
        })
    })
    }
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
    const read = document.getElementById('read').checked
    plusNewBook(title, author, pages, read)
    event.preventDefault()
})

const close_button = document.getElementById('close')

close_button.addEventListener("click", (event) => {
    dialog.close()
})




