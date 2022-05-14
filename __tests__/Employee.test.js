const Employee = require('../lib/Employee');

test('creates an Employee object', () => {
    const employee = new Employee('Mark', '199622', 'zabriskie.m@gmail.com');

    expect(employee.name).toBe('Mark');
    expect(employee.id).toBe('199622');
    expect(employee.email).toBe('zabriskie.m@gmail.com');
});

// test("gets enemy's health value", () => {
//     const enemy = new Enemy('goblin', 'sword');

//     expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
// });

// test('checks if enemy is alive or not', () => {
//     const enemy = new Enemy('goblin', 'sword');

//     expect(enemy.isAlive()).toBeTruthy();

//     enemy.health = 0;

//     expect(enemy.isAlive()).toBeFalsy();
// });

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