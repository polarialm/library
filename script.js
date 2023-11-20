let myLibrary = []

let selectedRemoves

function removeBook (button) {
    const card = button.closest('.card')
    myLibrary.forEach((item, index) => {
        if (index === Number(card.getAttribute('data-book-index'))) {
            myLibrary.splice(index,1)
        }
    })
    initLibraryCards()
}

function attachListener2Removers () {
    selectedRemoves.forEach((item) => {
        item.addEventListener("click", (event) => {
            removeBook(item)
        })
    })
}

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


function initLibraryCards () {
    const container = document.querySelector('.card-container')
    container.innerHTML = ""
    if (myLibrary.length === 0) {
        
    } else {
    myLibrary.forEach((item, index) => {
        function hasRead(){
            if (this.read === true) {
                return 'not read yet.'
            } else return 'has been read.'
        }
        let readPhrase = hasRead()
        const card = document.createElement('div')
        card.classList.add('card')
        const top = document.createElement('div')
        top.classList.add('top')
        const remove = document.createElement('button')
        remove.classList.add('remove')
        remove.setAttribute('type', 'button')
        remove.appendChild(document.createTextNode('X'))
        const title = document.createElement('h3')
        top.appendChild(title)
        top.appendChild(remove)
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const read = document.createElement('p')
        title.textContent = item.title
        author.textContent = item.author
        pages.textContent = item.pages
        read.textContent = readPhrase
        card.appendChild(top)
        card.appendChild(author)
        card.appendChild(pages)
        card.appendChild(read)
        card.setAttribute('data-book-index', `${index}`)
        container.appendChild(card)
        selectedRemoves = document.querySelectorAll('.remove')
        attachListener2Removers()
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
    const read = document.getElementById('read').value 
    plusNewBook(title, author, pages, read)
    event.preventDefault()
})

const close_button = document.getElementById('close')

close_button.addEventListener("click", (event) => {
    dialog.close()
})




