const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

//create the manager card
const generateManager = managerInfo => {
  const manager = new Manager(managerInfo.managerName, managerInfo.managerId, managerInfo.managerEmail, managerInfo.officeNumber);
  return `
<div class="card m-3">
    <div class="card-header">
        <h2 class="card-title">${manager.getName()}</h2>
        <h3 class="card-subtitle">${manager.getRole()}</h3>
    </div>
    <div class="card-body">
        <table class="table table-striped">
            <tr>
                <td>ID: ${manager.getId()}</td>
            </tr>
            <tr>
                <td>Email: <a href="mailto: ${manager.getEmail()}">${manager.getEmail()}</a></td>
            </tr>
            <tr>
                <td>Office number: ${manager.getOfficeNumber()}</td>
            </tr>
        </table>
    </div>
</div>
  `;
};

const generateEmployees = employeeArr => {
    if(!employeeArr) {
        return '';
    }
    const specializedArr = employeeArr.map(employee => {
        if (employee.employeeType === 'Engineer') {
            return new Engineer(employee.engineerName, employee.engineerId, employee.engineerEmail, employee.github);
        } else if (employee.employeeType === 'Intern') {
            return new Intern(employee.internName, employee.internId, employee.internEmail, employee.school);
        }
    });
  return `
        ${specializedArr.map( employee => {
            if(employee.getRole() === 'Engineer'){
                var special = `GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a>`;
            } else if (employee.getRole() === "Intern") {
                var special = `School: ${employee.getSchool()}`;
            }
            return `
        <div class="card m-3">
            <div class="card-header">
                <h2 class="card-title">${employee.getName()}</h2>
                <h3 class="card-subtitle">${employee.getRole()}</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <tr>
                        <td>ID: ${employee.getId()}</td>
                    </tr>
                    <tr>
                        <td>Email: <a href="mailto: ${employee.getEmail()}">${employee.getEmail()}</a></td>
                    </tr>
                    <tr>
                        <td>${special}</td>
                    </tr>
                </table>
            </div>
        </div>
            `
        }).join('')}
  `;
}

const generateHTML = (templateData) => {
  //destructure page data by section
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Team Generator</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header class="jumbotron d-flex justify-content-center">
        <div>
            <h1 class="display-4">My Team</h1>
        </div>
    </header>

    <main class="container d-flex flex-wrap justify-content-center">
        ${generateManager(templateData)}
        ${generateEmployees(templateData.employees)}
    </main>

    <footer>
        <h4 class="d-flex justify-content-center">&copy; ${new Date().getFullYear()} by ${templateData.managerName}</h4>
    </footer>
  </body>
  </html>
  `;
};

module.exports = { generateHTML };
