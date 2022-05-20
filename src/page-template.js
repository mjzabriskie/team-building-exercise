const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

//counter to let the card headers all cycle through different colors
let colorCounter = 1;

//function that dynamically changes the background color of the card headers
const colorCarousel = () => {
    if (colorCounter === 1) {
        colorCounter++;
        return `card-sen`;
    }
    if (colorCounter === 2) {
        colorCounter++;
        return `card-quin`;
    }
    if (colorCounter === 3) {
        colorCounter++;
        return `card-quat`;
    }
    if (colorCounter === 4) {
        colorCounter++;
        return `card-tert`;
    }
    if (colorCounter === 5) {
        colorCounter = 1;
        return `card-sec`;
    }
}

//create the manager card
const generateManager = managerInfo => {
  const manager = new Manager(managerInfo.managerName, managerInfo.managerId, managerInfo.managerEmail, managerInfo.officeNumber);
  return `<div class="card m-3">
            <div class="card-header ${colorCarousel()}">
                <h2 class="card-title">${manager.getName()}</h2>
                <h3 class="card-subtitle"><i class="fa-solid fa-mug-hot"></i>  ${manager.getRole()}</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <tr>
                        <td>ID: ${manager.getId()}</td>
                    </tr>
                    <tr>
                        <td>Email: <a href="mailto: ${manager.getEmail()}" class="dont-break-out">${manager.getEmail()}</a></td>
                    </tr>
                    <tr>
                        <td>Office number: ${manager.getOfficeNumber()}</td>
                    </tr>
                </table>
            </div>
        </div>`;
};

//create the employees that make up the rest of the team
const generateEmployees = employeeArr => {
    //Returns empty string if manager enters in no other employees
    if(!employeeArr) {
        return '';
    }
    //Takes the array of employee objects and turns it into an array
    //of specialized employee Objects.
    const specializedArr = employeeArr.map(employee => {
        if (employee.employeeType === 'Engineer') {
            return new Engineer(employee.engineerName, employee.engineerId, employee.engineerEmail, employee.github);
        } else if (employee.employeeType === 'Intern') {
            return new Intern(employee.internName, employee.internId, employee.internEmail, employee.school);
        }
    });
    //Returns the specializedArr as a single string to be placed in the html
  return `${specializedArr.map( employee => {
            //special dynamically populates the unique field for engineers and interns
            //employeeIcon dynamically populates the correct icon for the role.
            let special = ``;
            let employeeIcon = ``;
            if(employee.getRole() === 'Engineer'){
                special = `GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank" class="dont-break-out">${employee.getGithub()}</a>`;
                employeeIcon = `<i class="fa-solid fa-glasses"></i>  `;
            } else if (employee.getRole() === "Intern") {
                special = `School: ${employee.getSchool()}`;
                employeeIcon = `<i class="fa-solid fa-user-graduate"></i>  `;
            }
    return `
        <div class="card m-3">
            <div class="card-header ${colorCarousel()}">
                <h2 class="card-title">${employee.getName()}</h2>
                <h3 class="card-subtitle">${employeeIcon}${employee.getRole()}</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <tr>
                        <td>ID: ${employee.getId()}</td>
                    </tr>
                    <tr>
                        <td>Email: <a href="mailto: ${employee.getEmail()}" class="dont-break-out">${employee.getEmail()}</a></td>
                    </tr>
                    <tr>
                        <td>${special}</td>
                    </tr>
                </table>
            </div>
        </div>`}).join('')}`;
}

//generates the main html document
const generateHTML = (templateData) => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>My Team</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header class="jumbotron d-flex justify-content-center">
        <div>
            <h1>My Team</h1>
        </div>
    </header>

    <main class="container d-flex flex-wrap justify-content-center">
        ${generateManager(templateData)}
        ${generateEmployees(templateData.employees)}
    </main>

    <script src="https://kit.fontawesome.com/8286a8c819.js" crossorigin="anonymous"></script>
  </body>
  </html>
  `;
};

module.exports = { generateHTML };
