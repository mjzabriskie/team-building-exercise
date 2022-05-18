const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

//create the manager card
const generateManager = managerInfo => {
    console.log(managerInfo.managerName);
  const manager = new Manager(managerInfo.managerName, managerInfo.managerId, managerInfo.managerEmail, managerInfo.officeNumber);
  return `
    <div>
      <h2>${manager.getName()}</h2>
      <h3>${manager.getRole()}</h3>
      <table>
        <tr>
            <td>${manager.getId()}</td>
        </tr>
        <tr>
            <td>${manager.getEmail()}</td>
        </tr>
        <tr>
            <td>${manager.getOfficeNumber()}</td>
        </tr>
      </table>
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
    console.log(specializedArr);
  return `
        ${specializedArr.forEach( employee => {
            if(employee.getRole() === 'Engineer'){
                var special = employee.getGithub();
            } else if (employee.getRole() === "Intern") {
                var special = employee.getSchool();
            }
            return `
        <div>
            <h2>${employee.getName()}</h2>
            <h3>${employee.getRole()}</h3>
            <table>
              <tr>
                  <td>${employee.getId()}</td>
              </tr>
              <tr>
                  <td>${employee.getEmail()}</td>
              </tr>
              <tr>
                  <td>${special}</td>
              </tr>
            </table>
        </div>
            `
        })}
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div>
        <h1>My Team</h1>
        <nav class="flex-row">
            <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/">GitHub</a></h2>
        </nav>
      </div>
    </header>
    <main class="container">
      ${generateManager(templateData)}
      ${generateEmployees(templateData.employees)}
    </main>
    <footer">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${templateData.managerName}</h3>
    </footer>
  </body>
  </html>
  `;
};

module.exports = { generateHTML };
