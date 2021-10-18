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

//////////setup user choices in a variable to plug in into functions ////////////

const userChoices = {
  viewEmp: "View All employees",
  addEmp: "Add Employee",
  updateEmpRole: "Update Employee Role",
  viewRoles: "View All Roles",
  addRole: "Add New Role",
  viewDept: "View All Departments",
  addDept: "Add New Department",
  exitApp: "Exit Application",
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
// /// adding values to employee to test with mysql
// const employee = {
//   first_name: "Denis",
//   last_name: "Arce",
//   role_id: "6",
//   manager_id: "3",
// };
// db.query("INSERT INTO employee SET ?", employee, (err, result) => {});

//////////// Inquirer //////////////

const startApp = () => {
  console.log("WELCOME TO EMPLOYEE TRACKER");
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
    ])

    ////////////////using switch case to access each function ////////////////

    .then((answer) => {
      const choice = answer.mainMenu;

      switch (choice) {
        case userChoices.addEmp:
          addEmp();
          break;
        case userChoices.viewEmp:
          viewEmp();
          break;
        case userChoices.updateEmpRole:
          break;
        case userChoices.viewRoles:
          viewRoles();
          break;
        case userChoices.addRole:
          addRole();
          break;
        case userChoices.viewDept:
          viewDept();
          break;
        case userChoices.addDept:
          addDept();
          break;
      }
    });
};

/////////// Return to main menu  /////////////////////

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
          startApp();
          break;
        case userChoices.exitApp:
          break;
      }
    });
};
/////////////////// adding department ////////////////////////

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name?",
        name: "deptName",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department (department_name) VALUES ("${answer.deptName}")`,
        (err, results) => {
          if (err) throw err;
          console.log("Department added!");
        }
      );
      returnMainMenu();
    });
};

///////////////////adding employee /////////////////////////

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please type employee's first name",
        name: "name",
      },
      {
        type: "input",
        message: "Please add employee's last name",
        name: "lastName",
      },
      {
        type: "list",
        message: " What is the employees role?",
        name: "empRole",
        choices: ["Lawyer", "Salesperson", "Accountant", "Software Engineer"],
      },
      {
        type: "list",
        message: " Who is the employees Manager",
        name: "empManager",
        choices: ["John Doe", "Jimmy Johns", "Elisa Larrain", "Michael Myers"],
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (" + ${answer.name} +", " + ${answer.lastName} +", " + ${answer.empRole} +", " + ${answer.empManager} +" )`,
        (err, results) => {
          if (err) throw err;
          console.log("Employee added!");
        }
      );
      returnMainMenu();
    });
};

//////////////////////// Add Role ////////////////////////////////

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: " What is the name of the new Role?",
        name: "roleName",
      },
      {
        type: "input",
        message: " What is the salary of the new Role?",
        name: "salary",
      },
      {
        type: "list",
        message: " Which department does the role belong to?",
        name: "roleDept",
        choices: ["Engineering", "Sales", "Finance", "Legal", "Executive"],
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (" + ${answer.roleName} +", " + ${answer.salary} +", " + ${answer.roleDept} +" )`,
        (err, results) => {
          if (err) throw err;
          console.log("Role added!");
        }
      );
      returnMainMenu();
    });
};
///////// View employees, department and roles functions /////////

const viewEmp = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    //("+first_name", "+last_name+,")

    console.table(results);
  });
  returnMainMenu();
  // console.clear();
};

const viewDept = () => {
  db.query("SELECT * FROM department", (err, results) => {
    console.table(results);
  });
  returnMainMenu();
  // console.clear();
};

const viewRoles = () => {
  db.query("SELECT * FROM roles", (err, results) => {
    console.table(results);
  });
  returnMainMenu();
  // console.clear();
};

startApp();

// const employee = {first_name: "Denis", last_name: "Arce", role_id: "1", manager_id: "1"};

// db.query("INSERT INTO (first_name, last_name, role_id, manager_id) VALUES (" + employee.first_name + "," + employee.last_name + "," + employee.role_id + "," employee.manager_id + ")", function(err, results) {});
