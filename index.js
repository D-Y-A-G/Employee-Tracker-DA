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
        message: "Please select an action from below",
        name: "mainMenu",
        choices: [
          "Add employee",
          "Delete employee",
          "View all employees",
          "Update role",
          "View Department",
          "Add department",
        ],
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
        case "Add employee":
          break;
        case "View all employees":
          viewEmp();
          break;
        case "Update role":
          break;

        case "View Department":
          viewDept();
          break;
        case "Add department":
          break;
      }

      // addRole = addRole + ``;
      console.log(answer);
    });
};

const returnMainMenu = () => {

  
}

const viewEmp = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    //("+first_name", "+last_name+,")

    console.table(results);
  });
};

const viewDept = () => {
  db.query("SELECT * FROM department", (err, results) => {
    console.table(results);
  });
};

startApp();


// const employee = {first_name: "Denis", last_name: "Arce", role_id: "1", manager_id: "1"};

// db.query("INSERT INTO (first_name, last_name, role_id, manager_id) VALUES (" + employee.first_name + "," + employee.last_name + "," + employee.role_id + "," employee.manager_id + ")", function(err, results) {});
