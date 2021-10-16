
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
            ("Michael", "Myers", 3, 3),
            ("Frank", "Dood", 4, 4),
            ("Jimmy", "Johns", 5, 5),
            ("Kim", "Geohns", 6, 6),
            ("Amanda", "Noseco", 7, 7),
            ("Elisa", "Larrain", 8, 5)
;

SELECT * 
    FROM employee
;
