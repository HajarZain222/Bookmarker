var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var addButton = document.getElementById("submit");
var editButton = document.querySelectorAll(".edit button");
var deleteButton = document.querySelectorAll(".delete button");

var bookMarksList = [];

if(localStorage.getItem("bookMarksList") != null) {
    bookMarksList = JSON.parse(localStorage.getItem("bookMarksList"));
    displayData();
}

function addBookmark() {

    if(!validateInputs()) {
        return;
    }

    var bookmark = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }

    bookMarksList.push(bookmark);
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksList));
    displayData();
    clearInputs();
}

function editBookmark(index) {
    siteNameInput.value = bookMarksList[index].name;
    siteUrlInput.value = bookMarksList[index].url;
    bookMarksList.splice(index, 1);
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksList));
    displayData();
}

function clearInputs() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function displayData() {
    var box = "";
    for(var i=0; i< bookMarksList.length; i++) {
        box += `
        <tr>
            <td>${i+1}</td>
            <td>${bookMarksList[i].name}</td>
            <td class="visit">
                <div class="visit-link btn">
                    <i class="fa-solid fa-eye me-1"></i>
                    <a href="${bookMarksList[i].url}" target="_blank">Visit</a>
                </div>
            </td>
            <td class="edit">
                <button onclick="editBookmark(${i})" class="btn btn-primary" type="button">
                    <i class="fa-solid fa-pencil me-1"></i>Edit
                </button>
            </td>
            <td class="delete">
                <button onclick="deleteBookmark(${i})" class="btn" type="button">
                    <i class="fa-solid fa-trash-can me-1"></i>Delete
                </button>
            </td>
        </tr>`
    }

    document.getElementById("table-body").innerHTML = box;
}

function deleteBookmark(index) {
    bookMarksList.splice(index, 1);
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksList));
    displayData();
}

function validateInputs() {
    let isValid = true;
    let errors = [];

    if (siteNameInput.value.trim().length < 3) {
        isValid = false;
        errors.push("Site name must contain at least 3 characters");
    }

    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    if (!urlPattern.test(siteUrlInput.value.trim())) {
        isValid = false;
        errors.push("Site URL must be a valid one");
    }

    if (!isValid) {
    document.getElementById("modal-body").innerHTML = `
        <h5 class="modal-title text-start mb-3">
            Site Name or Url is not valid, Please follow the rules below :
        </h5>
        <ul class="text-start">
            ${errors.map(err => `<li>
                <i class="fa-regular fa-circle-right me-2"></i>${err}
                </li>`)
                .join("")}
        </ul>
    `;
        var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
    return isValid;
}


