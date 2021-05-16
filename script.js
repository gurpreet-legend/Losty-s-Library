console.log("This is my script")

// Constructor
function Book(name, author, genre) {
    this.name = name;
    this.author = author;
    this.genre = genre
}

// Display Constructor using class
class Display {
    // Implementing the add function 
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let tableRows = document.getElementsByTagName('tr');
        let count = tableRows.length;
        let uiString = `
        <tr class="bookList" >
            <th scope="row">${count}</th>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
        </tr>`;
        tableBody.innerHTML += uiString;
    }
    // Implementing the clear function 
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    // Implementing the show function 
    show(text) {
        let alert = document.getElementById('alert');
        if (text == 'Failure')  {
            alert.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Holy guacamole!</strong> You haven't added the 'Book Name' or 'Author'.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        }
        else if (text == 'Success') {
            alert.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Book has been added to the library.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        }
        setTimeout(() => {
            alert.innerHTML = ``;
        }, 2000);
    }
    // Implementing the validate function 
    validate(book) {
        if (book.name == "" || book.author == "") {
            return false;
        }
        else {
            return true;
        }
    }
}


// Add submit event listener to form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(event) {
    event.preventDefault(); //As submitting a form reloads the page by default
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('bookAuthor').value;
    let genre;

    // Grabbing genre types 
    let fiction = document.getElementById('fiction');
    let thriller = document.getElementById('thriller');
    let educational = document.getElementById('educational');

    if (fiction.checked) {
        genre = fiction.value;
    }
    else if (thriller.checked) {
        genre = thriller.value;
    }
    else if (educational.checked) {
        genre = educational.value;
    }

    let book = new Book(name, author, genre)
    // console.log(book);
    // console.log("You have submitted the form");

    // Display book in the table
    let display = new Display();
    //To check whether the book name and author name are not blank
    if (display.validate(book)) {
        // Method to add book
        display.add(book);
        //Method to clear the form after adding the book
        display.clear();
        display.show('Success');
    }
    else {
        //Show error to the user
        display.show('Failure');
    }
}


