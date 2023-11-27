

let library = []

const CONTAINER = document.querySelector('.card-container')

cardContainerInit()

function Book (title, author, pages, isReadChecked) {
    function generateRead() {
        if (isReadChecked) {
            return 'has been read.'
        } else return 'has not been read'
    }
    this.title = title
    this.author = author
    this.pages = pages
    this.read = generateRead()
}

function addBook(title,author,pages,read) {
    const book = new Book(title, author, pages, read)
    library.push(book)
}


function removeBook(REMOVE_BUTTON) {
    const CARD = REMOVE_BUTTON.closest('.card')
    for (let index = 0; index < library.length; index++) {
        if (index === Number(CARD.getAttribute('data-index'))) {
            library.splice(index,1)
        }
    }
}

function cardContainerInit() {
    resetContainer(CONTAINER)
    if (library.length < 1) {
        emptyLibraryNotif(CONTAINER)
    } else {
        library.forEach((item, index) => {
            cardCreation(item,index)
        })
    }
}

function resetContainer(container) {
    container.innerHTML = ""
}

function emptyLibraryNotif(container) {
    const TEXT = document.createElement('p')
    TEXT.textContent = "Looks like you have no books in your library. Why don't you try adding some?"
    container.appendChild(TEXT)
}

function cardCreation(item, index) {
    const CARD = document.createElement('div')
    CARD.classList.add('card')
    CARD.setAttribute('data-index',index)
    const CARD_HEADER = document.createElement('div')
    CARD_HEADER.classList.add('card-header')
    const TITLE = document.createElement('h3')
    TITLE.textContent = item.title
    const REMOVE_BUTTON = document.createElement('button')
    REMOVE_BUTTON.setAttribute('type','button')
    REMOVE_BUTTON.appendChild(document.createTextNode('X'))
    REMOVE_BUTTON.classList.add('remove')
    CARD_HEADER.appendChild(TITLE)
    CARD_HEADER.appendChild(REMOVE_BUTTON)
    const AUTHOR = document.createElement('p')
    AUTHOR.textContent = item.author
    const PAGES = document.createElement('p')
    PAGES.textContent = item.pages
    const READ_PHRASE = document.createElement('p')
    READ_PHRASE.textContent = item.read
    CARD.appendChild(CARD_HEADER)
    CARD.appendChild(AUTHOR)
    CARD.appendChild(PAGES)
    CARD.appendChild(READ_PHRASE)
    REMOVE_BUTTON.addEventListener('click', () => {
        removeBook(REMOVE_BUTTON)
        cardContainerInit()
    })
    CONTAINER.appendChild(CARD)
}

const PLUS_SIGN = document.querySelector('#plus')
const DIALOG = document.querySelector('dialog')

PLUS_SIGN.addEventListener('click', () => {
    DIALOG.showModal()
})


const INPUTS = document.querySelectorAll('input')
const SUBMIT = document.querySelector('#submit-button')
const CLOSE = document.querySelector('#close')

CLOSE.addEventListener('click', () => {
    DIALOG.close()
})

SUBMIT.addEventListener('click' , (event) => {
    inputValidityCheck(INPUTS)
    addBook(INPUTS[0].value, INPUTS[1].value, INPUTS[2].value, INPUTS[3].checked)
    cardContainerInit()
    event.preventDefault()
})

function inputValidityCheck(inputs) {
    inputs.forEach((item) => {
        const ERROR = document.querySelectorAll('.error')
        if (item.validity.valid === false) {
            ERROR.forEach((eitem) => {
                if (eitem.dataset.errorTarget === item.name) {
                    eitem.setAttribute('style', 'display: block;')
                }
            })
            throw new Error('Invalid input.')
        } else {
            ERROR.forEach((eitem) => eitem.setAttribute('style', 'display: none;'))
        }
    })
}

