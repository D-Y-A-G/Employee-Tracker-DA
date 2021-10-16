///////// required variables ///////////
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Denis1234",
    database: "employeeTracker_db",
  },
  console.log(`Connected to database.`)
);

const userChoices = {
  addEmp: "Add employee",
  deleteEmp: "Delete employee",
  viewEmp: "View all employees",
  viewRoles: "View all Roles",
  updateRole: "Update role",
  viewDept: "View Department",
  addDept: "Add department",
  exitApp: "Exit application",
  returnMainMenu: "Return to Main Menu",
};

const menuSelectPrompt = "Please select an action from below";

/////////////// to get data from mysql /////////////
// const dept = "Shipping";
// db.query(
//   "INSERT INTO department (department_name) VALUES (" + dept + ")", // escaped value with sanitation outside //
//   (err, results) => {}
// );

// db.query("SELECT * FROM department", function (err, results) {
//   //("+first_name", "+last_name+,")
//   console.log(results);
//   console.table(results);
// });
///// adding values to employee to test with mysql
// const employee = {
//   first_name: "Denis",
//   last_name: "Arce",
//   role_id: "6",
//   manager_id: "3",
// };
// db.query("INSERT INTO employee SET ?", employee, (err, result) => {});

//////////// Inquirer //////////////

const startApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: menuSelectPrompt,
        name: "mainMenu",
        choices: Object.values(userChoices).filter((choice) => {
          return choice !== userChoices.returnMainMenu;
        }),
        loop: false,
      },

      // {
      //   type: "input",
      //   message: "Please add employee name",
      //   name: "employeeDetails",
      // },
    ])

    .then((answer) => {
      const choice = answer.mainMenu;

      switch (choice) {
        case userChoices.addEmp:
          break;
        case userChoices.viewEmp:
          viewEmp();
          break;
        case userChoices.viewRoles:
          viewRoles();
          break;
        case userChoices.updateRole:
          break;

        case userChoices.viewDept:
          viewDept();
          break;
        case userChoices.addDept:
          break;
      }
    });
};

const returnMainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: menuSelectPrompt,
        name: "returnSelection",
        choices: [userChoices.returnMainMenu, userChoices.exitApp],
      },
    ])
    .then((answer) => {
      const choice = answer.returnSelection;
      switch (choice) {
        case userChoices.returnMainMenu:
          // startApp();
          break;
        case userChoices.exitApp:
          break;
      }
    });
};

const viewEmp = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    //("+first_name", "+last_name+,")

    console.table(results);
  });
  returnMainMenu();
  console.clear();
};

const viewDept = () => {
  db.query("SELECT * FROM department", (err, results) => {
    console.table(results);
  });
  returnMainMenu();
  console.clear();
};

const viewRoles = () => {
  db.query("SELECT * FROM roles", (err, results) => {
    console.table(results);
  });
  returnMainMenu();
  console.clear();
};

startApp();

// const employee = {first_name: "Denis", last_name: "Arce", role_id: "1", manager_id: "1"};

// db.query("INSERT INTO (first_name, last_name, role_id, manager_id) VALUES (" + employee.first_name + "," + employee.last_name + "," + employee.role_id + "," employee.manager_id + ")", function(err, results) {});


