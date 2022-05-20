const Manager = require('../lib/Manager');

test('creates a Manager object', () => {
    const manager = new Manager('Mark', '19664', 'zabriskie.m@gmail.com', '56');

    expect(manager.officeNumber).toBe('56');
});

test("gets manager's office number", () => {
    const manager = new Manager('Mark', '19664', 'zabriskie.m@gmail.com', '56');

    expect(manager.getOfficeNumber()).toBe('56');
});

test("gets manager's role", () => {
    const manager = new Manager();

    expect(manager.getRole()).toBe('Manager');
})