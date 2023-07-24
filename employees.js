let employees = new Map();

const form = document.getElementById("my-form");
// SUBMIT FORM DATA
const handleFormSubmit = (event) => {
  event.preventDefault();
  const inputData = {};
  const data = new FormData(event.target);
  data.forEach((value, key) => {
    inputData[key] = value;
  });

  // Get the last key from the previous employees map
  const lastKey = Array.from(employees.keys()).pop();

  // Generate a new unique ID
  const newId = lastKey ? parseInt(lastKey) + 1 : 1;

  // Add the unique id to the inputData Object
  inputData.id = newId;

  // On setting a new employee, generate a new id
  employees.set(newId.toString(), new Set([inputData]));

  document.getElementById("employees").innerHTML = "";

  /////////////////////////////MAP THROUGH EMPLOYEES DATA TO DISPLAY ON THE SIDEBAR'
  employees.forEach((employeeSet) => {
    employeeSet.forEach((employee) => {
      let paragraph = document.createElement("p");
      paragraph.textContent = `${employee.first_name} ${employee.last_name}`;
      paragraph.setAttribute("data-id", employee.id);
      document.getElementById("employees").appendChild(paragraph);
    });
  });
  event.target.reset();
};
form.addEventListener("submit", handleFormSubmit);

let selectedData = {};

// INITIAL DATA BEFORE A DATA IS CLICKED
const intialMessage = () => {
  const intialMessageText = document.createElement("div");
  intialMessageText.textContent = `Kindly click on an employee's data to view employee's details`;
  intialMessageText.style.display = "flex";
  intialMessageText.style.textAlign = "center";
  intialMessageText.style.justifyContent = "center";
  intialMessageText.style.alignItems = "center";
  intialMessageText.style.fontSize = "25px";
  intialMessageText.style.height = "50%";
  intialMessageText.style.padding = "20px";
  intialMessageText.setAttribute("id", "initialMessage");
  document.getElementById("sub_container1").appendChild(intialMessageText);
};

intialMessage();

// GET INDIVIDUAL EMPLOYEE DATA ON CLICK
document
  .getElementById("employees")
  .addEventListener("click", function (event) {
    const clickedItem = event.target.getAttribute("data-id");

    let filteredData = Array.from(employees.values())
      .map((employee) =>
        Array.from(employee.values()).filter(
          (data) => data.id === Number(clickedItem)
        )
      )
      .flat();

    if (Object.keys(selectedData).length > 0) {
      // Remove previously appended elements
      document.getElementById("sub_container1").innerHTML = "";
    }

    if (filteredData.length > 0) {
      let elementExists = document.getElementById("initialMessage");
      elementExists?.remove();
      selectedData = filteredData[0];

      const firstNameParagraph = document.createElement("p");
      firstNameParagraph.textContent = `First Name: ${selectedData.first_name}`;
      document.getElementById("sub_container1").appendChild(firstNameParagraph);

      const lastNameParagraph = document.createElement("p");
      lastNameParagraph.textContent = `Last Name: ${selectedData.last_name}`;
      document.getElementById("sub_container1").appendChild(lastNameParagraph);

      const ageParagraph = document.createElement("p");
      ageParagraph.textContent = `Age: ${selectedData.age}`;
      document.getElementById("sub_container1").appendChild(ageParagraph);

      const weightParagraph = document.createElement("p");
      weightParagraph.textContent = `Weight: ${selectedData.weight}`;
      document.getElementById("sub_container1").appendChild(weightParagraph);

      const heightParagraph = document.createElement("p");
      heightParagraph.textContent = `Height: ${selectedData.height}`;
      document.getElementById("sub_container1").appendChild(heightParagraph);

      const nationalityParagraph = document.createElement("p");
      nationalityParagraph.textContent = `Nationality: ${selectedData.nationality}`;
      document
        .getElementById("sub_container1")
        .appendChild(nationalityParagraph);
    } else {
      intialMessage();
    }
  });
