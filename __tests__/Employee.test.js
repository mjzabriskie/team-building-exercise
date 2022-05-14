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

    expect(employee.getRole()).toEqual(expect.stringContaining(employee.constructor.name));
});

// test("subtracts from enemy's health", () => {
//     const enemy = new Enemy('goblin', 'sword');
//     const oldHealth = enemy.health;

//     enemy.reduceHealth(5);

//     expect(enemy.health).toBe(oldHealth - 5);

//     enemy.reduceHealth(99999);

//     expect(enemy.health).toBe(0);
// });

// test("gets enemy's attack value", () => {
//     const enemy = new Enemy('goblin', 'sword');
//     enemy.strength = 10;

//     expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
//     expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
// });

// test('gets a description of the enemy', () => {
//     const enemy = new Enemy('goblin', 'sword');

//     expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
//     expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
// });