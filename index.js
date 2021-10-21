///////// required variables ///////////
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeeTracker_db",
  },
  console.log(`Connected to database.`)
);

//////////setup user choices in a variable to plug in into functions ////////////

const userChoices = {
  viewEmp: "View All employees",
  addEmp: "Add an Employee",
  updateEmpRole: "Update an Employee Role",
  viewRoles: "View All Roles",
  addRole: "Add a New Role",
  viewDept: "View All Departments",
  addDept: "Add a New Department",
  returnMainMenu: "Return to Main Menu",
  exitApp: "Exit Application",
};

const menuSelectPrompt = "Please select an action from below";

////////////////////////// Inquirer ///////////////////////////
console.log("✍  ⏱  EMPLOYEE TRACKER ⏱ ✍");

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
    ])

    ////////////////using switch case to access each function ////////////////

    .then((answer) => {
      const choice = answer.mainMenu;

      switch (choice) {
        case userChoices.viewEmp:
          viewEmp();
          break;
        case userChoices.addEmp:
          addEmp();
          break;
        case userChoices.updateEmpRole:
          updateEmpRole();
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
          console.log("Goodbye, Have a GREAT day!");
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
        validate: (deptName) => {
          if (deptName) {
            return true;
          } else console.log("Please enter a Department name!");
        },
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department (department_name) VALUES ("${answer.deptName}")`,
        (err, res) => {
          if (err) throw err;
          console.log("\n New Department added!");
        }
      );
      returnMainMenu();
    });
};

///////////////////adding employee /////////////////////////

const addEmp = () => {
  db.query("SELECT * FROM employee, roles", (err, results) => {
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
          choices: results.map((el) => {
            return { name: el.title, value: el.id };
          }),
        },
        {
          type: "list",
          message: " Who is the employees Manager",
          name: "empManager",
          choices: results.map((el) => {
            return {
              name: el.first_name + el.last_name,
              value: el.manager_id,
            };
          }),
        },
      ])
      .then((answer) => {
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.name}", " ${answer.lastName}", ${answer.empRole}, ${answer.empManager})`,
          (err, results) => {
            if (err) throw err;
            console.log("Employee added!");
          }
        );
        returnMainMenu();
      });
  });
};

/////////////////////// Update Role //////////////////////////////

const updateEmpRole = () => {
  db.query("SELECT * FROM employee", (err, results) => {
    inquirer
      .prompt([
        {
          type: "list",
          message: " Which Employee role do you want to update?",
          name: "empName",
          choices: results.map((el) => {
            return { name: el.first_name, value: el.id };
          }),
        },
        {
          type: "list",
          message: " Which Role did you want to assign to selected Employee",
          name: "empRole",
          choices: results.map((el) => {
            return {
              name: el.title,
              value: el.role_id + el.first_name,
            };
          }),
        },
      ])
      .then((answer) => {
        db.query(
          `UPDATE employee SET role_id = ${answer.empRole} WHERE id = ${answer.empName}`,
          (err, results) => {
            // console.log(err, results);
            if (err) throw err;
            console.log("Employee Role Changed!");
          }
        );
        returnMainMenu();
      });
  });
};

//////////////////////// Add Role ////////////////////////////////

const addRole = () => {
  db.query("SELECT * FROM department", (err, results) => {
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
          choices: results.map((el) => {
            return { name: el.department_name, value: el.id };
          }),
        },
      ])
      .then((answer) => {
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ("${
            answer.roleName
          }", "${parseInt(answer.salary)}", " ${answer.roleDept}")`,
          (err, results) => {
            if (err) throw err;
            console.log("Role added!");
          }
        );
        returnMainMenu();
      });
  });
};
///////// View employees, department and roles functions /////////

const viewEmp = () => {
  db.query("SELECT * FROM employee", function (err, results) {
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
