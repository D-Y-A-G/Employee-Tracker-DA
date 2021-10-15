INSERT INTO department (name)
    VALUES  (1, "Engineering"),
            (2, "Sales"),
            (3, "Finance"),
            (4, "Legal")
;

INSERT INTO role (title, salary, department_id)
    VALUES  (01, "Salesperosn", 80000, 2)
            (02, "Lead Engineer", 150000, 1)
            (03, "Software Engineer", 120000, 1)
            (04, "Account Manager", 160000, 3)
            (05, "Accountant", 125000, 3)
            (06, "Legal Team Lead", 250000, 4)
            (07, "Lawyer", 190000, 4)  
;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES  ("John", "Doe" 01)
            ("Bobby", "Bee", 02)
            ("Michael", "Myers" 06)
            ("Frank", "Dood", 07)
            ("Jimmy", "Johns", 03)
            ("Kim", "Geohns", 04)
            ("Amanda", "Noseco", 05)
            ("Elisa", "Larrain", 01)
;