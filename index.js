const inquirer = require("inquirer");
const { writeFile, copyFile } = require("./utils/generate-site.js");
const generatePage = require("./src/page-template");
const ListPrompt = require("inquirer/lib/prompts/list");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "Enter the manager's name (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter the manager's name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "managerId",
      message: "Enter the manager's employee ID (Required)",
      validate: (idInput) => {
        if (idInput) {
          return true;
        } else {
          console.log("Please enter the manager's employee ID");
          return false;
        }
      },
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter the manager's email (Required)",
        validate: function(email)
        {
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if(regex.test(email)) {
              return true;
            } else {
                console.log(`
                Not a valid email, try again`);
                return false;
            }
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number (Required)",
        validate: (officeInput) => {
          if (officeInput) {
            return true;
          } else {
            console.log("Please enter the manager's office number");
            return false;
          }
        },
    }
    // {
    //   type: "confirm",
    //   name: "confirmAbout",
    //   message:
    //     'Would you like to enter some information about yourself for an "About" section?',
    //   default: true,
    // },
    // {
    //   type: "input",
    //   name: "about",
    //   message: "Provide some information about yourself:",
    //   when: ({ confirmAbout }) => {
    //     if (confirmAbout) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   },
    // }
  ]);
};

const promptEmployee = (employeeData) => {
  if (!employeeData.employees) {
    employeeData.employees = [];
  }

  console.log(`
=================
Add a New Employee
=================
    `);
  return inquirer
    .prompt([
        {
            type: "list",
            name: "employeeType",
            message: "Which type of employee would you like to add?",
            choices: ["Engineer", "Intern", "None"],
            default: "None"
        },
        {
            type: "input",
            name: "engineerName",
            message: "Enter the engineer's name (Required)",
            when: ({ employeeType }) => {
                if (employeeType === "Engineer") {
                    return true;
                } else {
                    return false;
                }
            },
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter the engineer's name");
                return false;
              }
            }
          },
          {
            type: "input",
            name: "engineerId",
            message: "Enter the engineer's employee ID (Required)",
            when: ({ employeeType }) => {
                if (employeeType === "Engineer") {
                    return true;
                } else {
                    return false;
                }
            },
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                console.log("Please enter the engineer's employee ID");
                return false;
              }
            },
          },
          {
              type: "input",
              name: "engineerEmail",
              message: "Enter the engineer's email (Required)",
              when: ({ employeeType }) => {
                if (employeeType === "Engineer") {
                    return true;
                } else {
                    return false;
                }
            },
              validate: function(email)
              {
                let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                if(regex.test(email)) {
                  return true;
                } else {
                    console.log(`
                    Not a valid email, try again`);
                    return false;
                }
              }
          },
          {
              type: "input",
              name: "github",
              message: "Enter the engineer's github name (Required)",
              when: ({ employeeType }) => {
                if (employeeType === "Engineer") {
                    return true;
                } else {
                    return false;
                }
            },
              validate: (githubInput) => {
                if (githubInput) {
                  return true;
                } else {
                  console.log("Please enter the engineer's github name");
                  return false;
                }
              },
          },
          {
            type: "input",
            name: "internName",
            message: "Enter the intern's name (Required)",
            when: ({ employeeType }) => {
                if (employeeType === "Intern") {
                    return true;
                } else {
                    return false;
                }
            },
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter the intern's name");
                return false;
              }
            }
          },
          {
            type: "input",
            name: "internId",
            message: "Enter the intern's employee ID (Required)",
            when: ({ employeeType }) => {
                if (employeeType === "Intern") {
                    return true;
                } else {
                    return false;
                }
            },
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                console.log("Please enter the intern's employee ID");
                return false;
              }
            },
          },
          {
              type: "input",
              name: "internEmail",
              message: "Enter the intern's email (Required)",
              when: ({ employeeType }) => {
                if (employeeType === "Intern") {
                    return true;
                } else {
                    return false;
                }
            },
              validate: function(email)
              {
                let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                if(regex.test(email)) {
                  return true;
                } else {
                    console.log(`
                    Not a valid email, try again`)
                    return false;
                }
              }
          },
          {
              type: "input",
              name: "school",
              message: "Enter the intern's school name (Required)",
              when: ({ employeeType }) => {
                if (employeeType === "Intern") {
                    return true;
                } else {
                    return false;
                }
            },
              validate: (schoolInput) => {
                if (schoolInput) {
                  return true;
                } else {
                  console.log("Please enter the intern's school name");
                  return false;
                }
              },
          }
    ])
    .then((specificEmployee) => {
      if (specificEmployee.employeeType !== "None") {
        employeeData.employees.push(specificEmployee);
        return promptEmployee(employeeData);
      } else {
        return console.log(employeeData);
      }
    });
};

promptUser()
  .then(promptEmployee)
  .then((employeeData) => {
    return generatePage(employeeData);
  })
  .then((pageHTML) => writeFile(pageHTML))
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => console.log(copyFileResponse))
  .catch((err) => console.log(err));