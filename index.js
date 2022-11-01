// container

const modal = document.getElementById("modal");
const btn = document.getElementById("new");
const inputFile = document.getElementById("inputFile");
const dltPupup = document.getElementById("delete");
const deletRow = document.getElementById("deleteRow");
const NewAdd = document.getElementById("NewAdd");
const cancel = document.getElementById("cancelbtn");
const SaveData = document.getElementById("save");
// Edit details
const field = document.getElementById("inputFile");
const addName = document.getElementById("inputName");
const addEmail = document.getElementById("inputEmail");
const addAddr = document.getElementById("inputField");

// edit details
const iName = document.getElementById("iName");
const iEmail = document.getElementById("iEmail");
const textarea = document.getElementById("textarea");
const updateEr = document.getElementById("updateError");
const EditnameErr = document.getElementById("EditnameErr");
const EditemailErr = document.getElementById("EditemailErr");
const EditAddressErr = document.getElementById("EditAddressErr");
//  add details validation
const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const submitErr = document.getElementById("submitErr");
const AddressErr = document.getElementById("AddressErr");

let url = "https://jsonplaceholder.typicode.com/users";

let arrayFromApi = [];
let dataForTable = [];
let num = "";
let editId = "";

const buildTable = (data) => {
    let tableData = "";
    data.map((users, i) => {
        tableData += `<tr>
                <td>${i + 1}</td>
                <td>${users.name}</td>
                <td>${users.email}</td>
                <td>${users.address.city}</td>
                <td><button class="EditBtn"id="editbtn${
                    i + 1
                }"onclick="editbtn(${users.id})">Edit</button></td>
                <td><button class="DeleteBtn" id="deletbtn" onclick="Deletbtn(${
                    users.id
                })">Delete</button></td>
                </tr>`;
    });

    document.getElementById("Tdshow").innerHTML = tableData;
};

window.onload = function () {
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((objectData) => {
            editId = 1;

            // onload first row show  in edit details

            arrayFromApi = objectData;

            dataForTable = objectData;
            buildTable(objectData);

            iName.value = objectData[0].name;

            iEmail.value = objectData[0].email;

            textarea.value = objectData[0].address.city;
        });
};

// open modal NEW
function NewOpenPopup() {
    modal.classList.add("openModal");

    SaveData.disabled = false;
}

function closePopup() {
    modal.classList.remove("openModal");
    addName.value = "";
    addEmail.value = "";
    addAddr.value = "";
    nameErr.innerHTML = "";
    emailErr.innerHTML = "";
    AddressErr.innerHTML = "";
}

// updata data
function Save() {
    const validInput =
        AddvalidateName() && AddvalidateEmail() && AddvalidateAddress();
    const UserName = document.getElementById("inputName");
    const Email = document.getElementById("inputEmail");
    const textArea = document.getElementById("inputField");
    SaveData.disabled = true;
    if (validInput) {
        modal.classList.remove("openModal");
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(),
        })
            .then((data) => {
                return data.json();
            })
            .then(() => {
                dataForTable.push({
                    id: dataForTable.length + 1,
                    name: UserName.value,
                    email: Email.value,
                    address: { city: textArea.value },
                });

                buildTable(dataForTable);

                UserName.value = "";
                Email.value = "";
                textArea.value = "";
                // create  value add id Edit details
                iName.value = dataForTable[0].name;

                iEmail.value = dataForTable[0].email;

                textarea.value = dataForTable[0].address.city;
            })

            .catch((err) => console.log(err));
    } else {
        SaveData.disabled = false;
        submitErr.style.display = "block";
        submitErr.innerHTML = "All fields are required";
        setTimeout(function () {
            submitErr.style.display = "none";
        }, 3000);

        return false;
    }
    nameErr.innerHTML = "";
    emailErr.innerHTML = "";
    AddressErr.innerHTML = "";
    submitErr.innerHTML = "";
    AddressErr.innerHTML = "";
}

function Cancel() {
    modal.classList.remove("openModal");
    addName.value = "";
    addEmail.value = "";
    addAddr.value = "";
    nameErr.innerHTML = "";
    emailErr.innerHTML = "";
    AddressErr.innerHTML = "";
}

function Deletbtn(id) {
    num = id;
    dltPupup.classList.add("Modal1");
}

function deletConfirm() {
    const newValue = dataForTable.filter((newValue) => newValue.id != num);
    dltPupup.classList.remove("Modal1");

    dataForTable = newValue;
    arrayFromApi = newValue;

    if (newValue.length > 0) {
        iName.value = newValue[0].name;

        iEmail.value = newValue[0].email;

        textarea.value = newValue[0].address.city;
        editId = newValue[0].id;
    }
    if (newValue.length == 0) {
        iName.value = "";
        iEmail.value = "";
        textarea.value = "";

        EditnameErr.innerHTML = "";
        EditemailErr.innerHTML = "";
        EditAddressErr.innerHTML = "";
    }

    buildTable(newValue);
}
// deletebtnCondition  pupup
function No() {
    dltPupup.classList.remove("Modal1");
}

function removeIcon() {
    dltPupup.classList.remove("Modal1");
}

function editbtn(id) {
    const foundObj = arrayFromApi.find((item) => item.id == id);

    editId = id;

    iName.value = foundObj.name;

    iEmail.value = foundObj.email;

    textarea.value = foundObj.address.city;
    EditvalidName("iName") &&
        EditvalidEmail("iEmail") &&
        EditvalidAddress("textarea");
}
// Edit detailes

function updateValue() {
    const Input =
        EditvalidName("iName") &&
        EditvalidEmail("iEmail") &&
        EditvalidAddress("textarea");
    if (Input) {
        const foundObj = arrayFromApi.find((item) => item.id == editId);

        foundObj.name = document.querySelector(".Name").value;
        foundObj.email = document.querySelector(".Email").value;
        foundObj.address.city = document.getElementById("textarea").value;

        buildTable(arrayFromApi);
    } else {
        updateEr.innerHTML = "All fields are required...";
        setTimeout(function () {
            updateEr.style.display = "none";
        }, 3000);

        return false;
    }
    EditnameErr.innerHTML = "";
    EditemailErr.innerHTML = "";
    EditAddressErr.innerHTML = "";
}

// Reset table

function ResetValue() {
    const res = arrayFromApi.find((item) => item.id == editId);

    iName.value = res.name;

    iEmail.value = res.email;

    textarea.value = res.address.city;
}

// validation

// Edit details validation

function EditvalidName(fieldName) {
    const correctway = /^[A-za-z]+$/;
    let name = document.getElementById(fieldName).value;

    if (name === "") {
        return false;
    }
    if (name.length < 5) {
        EditnameErr.innerHTML = "Minimum  5 characters";
        return false;
    }
    if (name.length > 30) {
        EditnameErr.innerHTML = " Maximun 20 characters";
        return false;
    }
    if (name.match(correctway) === null || name.match(correctway)) {
        EditnameErr.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

        return true;
    }
}

function EditvalidEmail(fieldEmail) {
    const Email = document.getElementById(fieldEmail).value;

    const correctways = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,15}$/;
    let correctEmail = Email.match(correctways);

    if (Email === "") {
        return false;
    }
    if (Email.length < 10) {
        EditemailErr.innerHTML = "Minimum 10 characters";
        return false;
    }
    if (Email.length > 50) {
        EditemailErr.innerHTML = "Maximum 50 characters";
    }

    if (!correctEmail) {
        EditemailErr.innerHTML = "Email is Invalid";
        return false;
    }
    EditemailErr.innerHTML =
        '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function EditvalidAddress(addressField) {
    let address = document.getElementById(addressField).value;

    if (address === "") {
        EditAddressErr.innerHTML = "Please enter your address";
    }
    if (address.length < 10) {
        EditAddressErr.innerHTML = "minimum 10 characters";
        return false;
    }
    if (address.length > 50) {
        EditAddressErr.innerHTML = "maximum 50 characters";
        return false;
    }
    EditAddressErr.innerHTML =
        '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

// Add details validation

function AddvalidateName() {
    const correctway = /^[A-za-z]+$/;
    let name = document.getElementById("inputName").value;

    if (name === "") {
        return false;
    }
    if (name.length < 5) {
        nameErr.innerHTML = "Minimum 5 characters";
        return false;
    }
    if (name.length > 20) {
        nameErr.innerHTML = "Maximum 20 characters";
        return false;
    }
    if (name.match(correctway)) {
        nameErr.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

        return true;
    }
}

function AddvalidateEmail() {
    let email = document.getElementById("inputEmail").value;
    const correctway = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,15}$/;
    if (email === "") {
        emailErr.innerHTML = "Please enter a valid email";
    }
    if (email.length < 10) {
        emailErr.innerHTML = "Minimum 10 characters";
        return false;
    }
    if (email.length > 50) {
        emailErr.innerHTML = "Maximum 50 characters";
    }
    if (!email.match(correctway)) {
        emailErr.innerHTML = "Email is Invalid";
        return false;
    }
    emailErr.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function AddvalidateAddress() {
    let address = document.getElementById("inputField").value;
    if (address === "") {
        return false;
    }
    if (address.length < 10) {
        AddressErr.innerHTML = "minimum 10 characters";
        return false;
    }
    if (address.length > 50) {
        AddressErr.innerHTML = "maximum 50 characters";
        return false;
    }
    AddressErr.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}
