const nameCreate: HTMLInputElement = document.querySelector(".nameCreate")!;
const genderCreate: HTMLInputElement = document.querySelector(".gender")!;
const selectElm: HTMLSelectElement = document.querySelector(".select")!;
const passengersDiv = document.querySelector(".passengersDiv");
const createNewPassengerBtn: HTMLButtonElement =
  document.querySelector(".createPasenger")!;
let myPassengers: Pasangers[] = [];
let myFlights: Flights[] = [];
const BASEURL: string = "https://66eac13555ad32cda47a437e.mockapi.io/api/Flights/";

const getPassengers = async (): Promise<void> => {
  try {
    const res: Response = await fetch(BASEURL + "pasangers?agent=8797742");
    const pasangers: Pasangers[] = await res.json();
    myPassengers = pasangers;
  } catch (err) {
    console.log("this is the first " + err);
  }
};
getPassengers();

const getFlights = async (): Promise<void> => {
  try {
    const res: Response = await fetch(BASEURL + "flights");
    const flights: Flights[] = await res.json();
    myFlights = flights;
  } catch (err) {
    console.log("this is the first " + err);
  }
};
getFlights();

const referachFLightSelect = async () => {
  await getFlights();
  for (const flight of myFlights) {
    const newOption: HTMLOptionElement = document.createElement("option");
    newOption.value = flight.id;
    newOption.textContent = flight.from + " to " + flight.to;
    selectElm.appendChild(newOption);
  }
};

referachFLightSelect();

const deletePassenger = async (id: string) => {
  const res = await fetch(BASEURL + `pasangers/${id}`, {
    method: "DELETE",
  });
  refreachPassengersListSelect();
};

const editPassengerFunc = async (editPassrnger: Pasangers) => {
  try {
    const res: Response = await fetch(
      BASEURL + `pasangers/${editPassrnger.id}`,
      {
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
      }
    );
    console.log(await res.json());
    refreachPassengersListSelect();
  } catch (err) {
    console.log(err);
  }
};

const refreachPassengersListSelect = async () => {
  try {
    await getPassengers();
    while (passengersDiv?.firstChild) {
      passengersDiv.removeChild(passengersDiv.firstChild);
    }
    for (const pasanger of myPassengers) {
      const newDiv = document.createElement("div");
      const labelName = document.createElement("label");
      const deleteBtn = document.createElement("button");
      const editBtn = document.createElement("button");
      deleteBtn.textContent = "delete";
      editBtn.textContent = "edit";
      labelName.textContent = "name: " + pasanger.name +  "   gender: " + pasanger.gender;
      newDiv.appendChild(labelName);
      newDiv.appendChild(deleteBtn);
      newDiv.appendChild(editBtn);
      newDiv.className = "innerListDiv";
      passengersDiv?.appendChild(newDiv);
      // console.log(myPassengers);

      deleteBtn.addEventListener("click", async () => {
        await deletePassenger(pasanger.id);
      });
      editBtn.addEventListener("click", async () => {
        const inputName: HTMLInputElement = document.createElement("input");
        const maleLabel: HTMLLabelElement = document.createElement("label");
        const femaleLabel: HTMLLabelElement = document.createElement("label");
        const inputMaleGender: HTMLInputElement =
          document.createElement("input");
        const inputFemaleGender: HTMLInputElement =
          document.createElement("input");
        const submitButton: HTMLButtonElement =
          document.createElement("button");
          inputName.value = pasanger.name
        submitButton.textContent = "submit edit";
        inputName.placeholder = "insert new name";
        inputFemaleGender.type = "radio"
        inputFemaleGender.value = "female"
        inputFemaleGender.name = "editGender"
        inputMaleGender.type = "radio"
        inputMaleGender.value = "male"
        inputMaleGender.name = "editGender"
        femaleLabel.textContent = "female"
        maleLabel.textContent = "male"

        newDiv.appendChild(submitButton);
        newDiv.appendChild(inputName);
        newDiv.appendChild(inputFemaleGender)
        newDiv.appendChild(femaleLabel)
        newDiv.appendChild(inputMaleGender)
        newDiv.appendChild(maleLabel)


        editBtn.disabled = true;

        submitButton.addEventListener("click", async () => {
          const editPassenger: Pasangers = {
            createdAt: pasanger.createdAt,
            name: inputName.value,
            gender: `${
                (
                  document.querySelector(
                    'input[name="editGender"]:checked'
                  ) as HTMLInputElement
                )?.value
              }`,
            flight_id: pasanger.flight_id,
            agent: "8797742",
            id: pasanger.id,
          };
          await editPassengerFunc(editPassenger);
          editBtn.disabled = false;
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};
createNewPassengerBtn.addEventListener("click", async () => {
  await createNewPassenger();
});

const createNewPassenger = async () => {
  const res = await fetch(BASEURL + "pasangers", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      createdAt: Date(),
      name: nameCreate.value,
      gender: `${
        (
          document.querySelector(
            'input[name="gender"]:checked'
          ) as HTMLInputElement
        )?.value
      }`,
      flight_id: selectElm.value,
      agent: 8797742,
    }),
  });
  await refreachPassengersListSelect();
};
refreachPassengersListSelect();


interface Pasangers {
  createdAt: string;
  name: string;
  gender: string;
  flight_id: string;
  agent: string;
  id: string;
}
interface Flights {
  date: string;
  from: string;
  to: string;
  id: string;
}
