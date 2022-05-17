const Employee = require('../lib/Employee');

test('creates an Employee object', () => {
    const employee = new Employee('Mark', '199622', 'zabriskie.m@gmail.com');

    expect(employee.name).toBe('Mark');
    expect(employee.id).toBe('199622');
    expect(employee.email).toBe('zabriskie.m@gmail.com');
});

test("gets employee's name", () => {
    const employee = new Employee('Mark', '199622', 'zabriskie.m@gmail.com');

    expect(employee.getName()).toEqual(expect.stringContaining(employee.name));
});

test("get's employee's id", () => {
    const employee = new Employee('Mark', '199622', 'zabriskie.m@gmail.com');

    expect(employee.getId()).toEqual(expect.stringContaining(employee.id));
});

test("get's employee's email", () => {
    const employee = new Employee('Mark', '199622', 'zabriskie.m@gmail.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email));
});

test("get's employee's role", () => {
    const employee = new Employee('Mark', '199622', 'zabriskie.m@gmail.com');

    expect(employee.getRole()).toEqual(expect.stringContaining("Employee"));
});