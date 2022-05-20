const inquirer = require("inquirer");
const { writeFile, copyFile } = require("./utils/write-site.js");
const { generateHTML } = require("./src/page-template");
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

// registers max-length node with inquirer
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "maxlength-input",
            name: "managerName",
            message: "Enter the manager's name (Required)",
            maxLength: 45,
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
            type: "maxlength-input",
            name: "managerId",
            message: "Enter the manager's employee ID (Required)",
            maxLength: 6,
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
            type: "maxlength-input",
            name: "managerEmail",
            message: "Enter the manager's email (Required)",
            maxLength: 35,
            validate: function (email) {
                //basic validation to help get email in proper format
                let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                if (regex.test(email)) {
                    return true;
                } else {
                    console.log(`
              Not a valid email, try again`);
                    return false;
                }
            }
        },
        {
            type: "maxlength-input",
            name: "officeNumber",
            message: "Enter the manager's office number (Required)",
            maxLength: 5,
            validate: (officeInput) => {
                if (officeInput) {
                    return true;
                } else {
                    console.log("Please enter the manager's office number");
                    return false;
                }
            }
        }
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
                choices: ["None", "Engineer", "Intern"],
                default: "None"
            },
            {
                type: "maxlength-input",
                name: "engineerName",
                message: "Enter the engineer's name (Required)",
                maxLength: 45,
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
                type: "maxlength-input",
                name: "engineerId",
                message: "Enter the engineer's employee ID (Required)",
                maxLength: 6,
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
                type: "maxlength-input",
                name: "engineerEmail",
                message: "Enter the engineer's email (Required)",
                maxLength: 35,
                when: ({ employeeType }) => {
                    if (employeeType === "Engineer") {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: function (email) {
                    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                    if (regex.test(email)) {
                        return true;
                    } else {
                        console.log(`
                Not a valid email, try again`);
                        return false;
                    }
                }
            },
            {
                type: "maxlength-input",
                name: "github",
                message: "Enter the engineer's github name (Required)",
                maxLength: 25,
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
                type: "maxlength-input",
                name: "internName",
                message: "Enter the intern's name (Required)",
                maxLength: 45,
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
                type: "maxlength-input",
                name: "internId",
                message: "Enter the intern's employee ID (Required)",
                maxLength: 6,
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
                type: "maxlength-input",
                name: "internEmail",
                message: "Enter the intern's email (Required)",
                maxLength: 35,
                when: ({ employeeType }) => {
                    if (employeeType === "Intern") {
                        return true;
                    } else {
                        return false;
                    }
                },
                validate: function (email) {
                    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                    if (regex.test(email)) {
                        return true;
                    } else {
                        console.log(`
                Not a valid email, try again`)
                        return false;
                    }
                }
            },
            {
                type: "maxlength-input",
                name: "school",
                message: "Enter the intern's school name (Required)",
                maxLength: 45,
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
                return employeeData;
            }
        });
};

//initializes program
promptUser()
    .then(promptEmployee)//prompts for other team members
    .then((employeeData) => {//Feeds user response into another function to return the html page
        return generateHTML(employeeData);
    })
    .then((pageHTML) => writeFile(pageHTML))//writes index.html using generated html
    .then((writeFileResponse) => {//Provides visual feedback of write success/failure
        console.log(writeFileResponse.message);
        return copyFile();//if write was successful, calls function to copy the css
    })
    .then((copyFileResponse) => console.log(copyFileResponse.message))//displays visual feedback of copy success/failure
    .catch((err) => console.log(err));//catches errors if anything goes wrong with the promises above.