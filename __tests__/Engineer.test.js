const Engineer = require('../lib/Engineer');

test('creates a Engineer object', () => {
    const engineer = new Engineer('Mark', '19664', 'zabriskie.m@gmail.com','mjzabriskie');

    expect(engineer.github).toBe('mjzabriskie');
});

test("gets engineer's github", () => {
    const engineer = new Engineer('Mark', '19664', 'zabriskie.m@gmail.com','mjzabriskie');

    expect(engineer.getGithub()).toBe('mjzabriskie');
})

test("gets engineer's role", () => {
    const engineer = new Engineer();

    expect(engineer.getRole()).toBe('Engineer');
});