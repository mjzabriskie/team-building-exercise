const Intern = require('../lib/Intern');

test('creates a Intern object', () => {
    const intern = new Intern('Mark', '19664', 'zabriskie.m@gmail.com','Brigham Young University');

    expect(intern.school).toBe('Brigham Young University');
});

test("gets intern's school", () => {
    const intern = new Intern('Mark', '19664', 'zabriskie.m@gmail.com','Brigham Young University');

    expect(intern.getSchool()).toBe('Brigham Young University');
});

test("gets intern's role", () => {
    const intern = new Intern();

    expect(intern.getRole()).toBe('Intern');
});