let users = [
    {
        id: 1,
        name: "faud",
        email: "faud@mail.com",
        password: 12345,
        role: "admin",
    },
    {
        id: 2,
        name: "dyanira",
        email: "dyanira@mail.com",
        password: 54321,
        role: "user",
    },
    {
        id: 3,
        name: "albert",
        email: "alberto@mail.com",
        password: "alberto120",
        role: "user",
    },
];

let id = users.map((user) => user["id"]);
console.log(id);
