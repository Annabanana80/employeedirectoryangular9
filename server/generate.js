var faker = require("faker");

var database = { employees: [] };

for (var i = 1; i <= 100; i++) {
  database.employees.push({
    id: i,
    avatar: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailId: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    jobTitle: faker.name.jobTitle(),
    jobArea: faker.name.jobArea(),
    jobType: faker.name.jobType(),
  });
}

console.log(JSON.stringify(database));
