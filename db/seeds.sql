
INSERT INTO department (department_name)
    VALUES  ("Engineering"),
            ("Sales"),
            ("Finance"),
            ("Legal"),
            ("Executive")
;

INSERT INTO roles (title, salary, department_id)
    VALUES  ("Salesperson", 80000, 2),
            ("Sr. Manager Engineer", 150000, 1),
            ("Software Engineer", 120000, 1 ),
            ("Sales Manager", 160000, 2),
            ("Accountant", 125000, 3),
            ("Legal Team Manager", 250000, 4),
            ("Lawyer", 190000, 4), 
            ("Executive Director", 500000, 5) 
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ("John", "Doe", 1, 1 ),
            ("Bobby", "Bee", 2, 1),
            ("Michael", "Smith", 3, 1),
            ("Frank", "Dood", 4, 2),
            ("Jimmy", "Johns", 5, 3),
            ("Kim", "Geohns", 6, 3),
            ("Amanda", "Noseco", 7, 3),
            ("Elisa", "Larrain", 8, 2)
;

SELECT * 
    FROM employee
;


-- /////////// get all roles and employees ////////////

-- // const allRoles = () => {
-- //   const roles = [];
-- //   db.query("SELECT * FROM roles", (err, result) => {
-- //     if (err) throw err;
-- //     result.forEach(({ title }) => roles.push(title));
-- //   });
-- //   return roles;
-- // };

-- // // const employees = () => {
-- // //   const emps = [];
-- // //   db.query(
-- // //     'SELECT CONCAT_WS("", employee.name, employee.lastName) AS Employee FROM employee ORDER BY ASC',
-- // //     (err, result) => {
-- // //       if (err) throw err;
-- // //       result.forEach(({ Employee }) => emps.push(Employee));
-- // //     }
-- // //   );
-- // //   return emps;
-- // // };

-- /////////////// to get data from mysql /////////////
-- // const dept = "Shipping";
-- // db.query(
-- //   "INSERT INTO department (department_name) VALUES (" + dept + ")", // escaped value with sanitation outside //
-- //   (err, results) => {}
-- // );

-- // db.query("SELECT * FROM department", function (err, results) {
-- //   //("+first_name", "+last_name+,")
-- //   console.log(results);
-- //   console.table(results);
-- // });
-- // /// adding values to employee to test with mysql
-- // const employee = {
-- //   first_name: "Denis",
-- //   last_name: "Arce",
-- //   role_id: "6",
-- //   manager_id: "3",
-- // };
-- // db.query("INSERT INTO employee SET ?", employee, (err, result) => {});