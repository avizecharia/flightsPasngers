"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nameCreate = document.querySelector(".nameCreate");
const genderCreate = document.querySelector(".gender");
const selectElm = document.querySelector(".select");
const passengersDiv = document.querySelector(".passengersDiv");
const createNewPassengerBtn = document.querySelector(".createPasenger");
let myPassengers = [];
let myFlights = [];
const BASEURL = "https://66eac13555ad32cda47a437e.mockapi.io/api/Flights/";
const getPassengers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASEURL + "pasangers?agent=8797742");
        const pasangers = yield res.json();
        myPassengers = pasangers;
    }
    catch (err) {
        console.log("this is the first " + err);
    }
});
getPassengers();
const getFlights = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASEURL + "flights");
        const flights = yield res.json();
        myFlights = flights;
    }
    catch (err) {
        console.log("this is the first " + err);
    }
});
getFlights();
const referachFLightSelect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getFlights();
    for (const flight of myFlights) {
        const newOption = document.createElement("option");
        newOption.value = flight.id;
        newOption.textContent = flight.from + " to " + flight.to;
        selectElm.appendChild(newOption);
    }
});
referachFLightSelect();
const deletePassenger = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(BASEURL + `pasangers/${id}`, {
        method: "DELETE",
    });
    refreachPassengersListSelect();
});
const editPassengerFunc = (editPassrnger) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASEURL + `pasangers/${editPassrnger.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                createdAt: editPassrnger.createdAt,
                name: editPassrnger.name,
                gender: editPassrnger.gender,
                flight_id: editPassrnger.flight_id,
                agent: editPassrnger.agent,
                id: editPassrnger.id,
            }),
        });
        console.log(yield res.json());
        refreachPassengersListSelect();
    }
    catch (err) {
        console.log(err);
    }
});
const refreachPassengersListSelect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getPassengers();
        while (passengersDiv === null || passengersDiv === void 0 ? void 0 : passengersDiv.firstChild) {
            passengersDiv.removeChild(passengersDiv.firstChild);
        }
        for (const pasanger of myPassengers) {
            const newDiv = document.createElement("div");
            const labelName = document.createElement("label");
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            editBtn.textContent = "edit";
            labelName.textContent = "name: " + pasanger.name + "   gender: " + pasanger.gender;
            newDiv.appendChild(labelName);
            newDiv.appendChild(deleteBtn);
            newDiv.appendChild(editBtn);
            newDiv.className = "innerListDiv";
            passengersDiv === null || passengersDiv === void 0 ? void 0 : passengersDiv.appendChild(newDiv);
            // console.log(myPassengers);
            deleteBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                yield deletePassenger(pasanger.id);
            }));
            editBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                const inputName = document.createElement("input");
                const maleLabel = document.createElement("label");
                const femaleLabel = document.createElement("label");
                const inputMaleGender = document.createElement("input");
                const inputFemaleGender = document.createElement("input");
                const submitButton = document.createElement("button");
                inputName.value = pasanger.name;
                submitButton.textContent = "submit edit";
                inputName.placeholder = "insert new name";
                inputFemaleGender.type = "radio";
                inputFemaleGender.value = "female";
                inputFemaleGender.name = "editGender";
                inputMaleGender.type = "radio";
                inputMaleGender.value = "male";
                inputMaleGender.name = "editGender";
                femaleLabel.textContent = "female";
                maleLabel.textContent = "male";
                newDiv.appendChild(submitButton);
                newDiv.appendChild(inputName);
                newDiv.appendChild(inputFemaleGender);
                newDiv.appendChild(femaleLabel);
                newDiv.appendChild(inputMaleGender);
                newDiv.appendChild(maleLabel);
                editBtn.disabled = true;
                submitButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    const editPassenger = {
                        createdAt: pasanger.createdAt,
                        name: inputName.value,
                        gender: `${(_a = document.querySelector('input[name="editGender"]:checked')) === null || _a === void 0 ? void 0 : _a.value}`,
                        flight_id: pasanger.flight_id,
                        agent: "8797742",
                        id: pasanger.id,
                    };
                    yield editPassengerFunc(editPassenger);
                    editBtn.disabled = false;
                }));
            }));
        }
    }
    catch (err) {
        console.log(err);
    }
});
createNewPassengerBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield createNewPassenger();
}));
const createNewPassenger = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const res = yield fetch(BASEURL + "pasangers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            createdAt: Date(),
            name: nameCreate.value,
            gender: `${(_a = document.querySelector('input[name="gender"]:checked')) === null || _a === void 0 ? void 0 : _a.value}`,
            flight_id: selectElm.value,
            agent: 8797742,
        }),
    });
    yield refreachPassengersListSelect();
});
refreachPassengersListSelect();
