const express = require("express"); //import express
const PORT = 2000;

const app = express();
app.use(express.json());

let data = {
    users: [
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
    ],
};

app.listen(PORT, () => {
    console.log(`running in port ${PORT}`);
});

//The HTTP 200 OK success status response code indicates that the request has succeeded.
// request: permintaan dari aplikasi klien
// response: respons yang diterima dari server api

app.get("/", (request, response) => {
    response.status(200).send("<h1>hello,world</h1>");
});

app.post("/", (request, response) => {
    console.log(request.query); //query didapat dari tabel params, diawali tanda tanya
    console.log(request.body); //body didapat dari tab body yang sudah diisi
    console.log(request.params); //params didapat dari url/:(params)
});

app.get("/users", (request, response) => {
    response.status(200).send(data["users"]);
});

//post
app.post("/users/register", (request, response) => {
    let users = data["users"];
    let lastIndex = users.length - 1;
    users.push({ id: users[lastIndex]["id"] + 1, ...request.body });

    response.status(200).send(data.users);
});

//delete
app.delete("/users/delete/:id", (request, response) => {
    const idParams = parseInt(request.params.id);
    let users = data.users;

    let exist = false;

    users.forEach((user) => {
        if (user["id"] === idParams) {
            exist = true;
        }
    });

    if (exist) {
        const newData = users.filter((user) => {
            return user["id"] !== idParams;
        });
        users = newData;

        response.status(200).json({
            status: `user id:${idParams} has been deleted`,
            data: newData,
        });
    } else {
        response.status(400).json({
            status: "user id does not exist",
        });
    }
});

//put
app.put("/users/edit/:id", (request, response) => {
    const idParams = parseInt(request.params.id);
    let users = data.users;
    let editUser = request.body;
    const userId = users.map((user) => user["id"]);
    const index = userId.indexOf(editUser["id"]);

    let exist = false;

    users.forEach((user) => {
        if (user["id"] === idParams) {
            exist = true;
        }
    });

    if (exist && index !== -1) {
        users[index] = editUser;

        response.status(200).json({
            status: "success",
            message: `user id:${idParams} has been replaced`,
            data: users,
        });
    } else {
        response.status(400).json({
            status: "error",
            message: "user id does not exist",
        });
    }
});

//put dengan cara lain
app.put("/users/replace/:id", (request, response) => {
    const idParams = parseInt(request.params.id);
    let users = data.users;
    let selectedDataIndex = null; //null = false

    users.forEach((user, index) => {
        if (user["id"] === idParams) {
            selectedDataIndex = index;
            users[index] = request.body;
        }
    });

    if (selectedDataIndex >= 0) {
        response.status(200).json({
            isSuccess: true,
            message: `user ID:${idParams} has been replaced`,
            data: users,
        });
    } else {
        response.status(400).json({
            isSuccess: false,
            message: `error, user ID not found`,
        });
    }
});

//patch
app.patch("/users/edit/:id", (request, response) => {
    const idParams = parseInt(request.params.id);
    let users = data.users;
    let editUser = request.body;
    const userId = users.map((user) => user["id"]);
    const index = userId.indexOf(editUser["id"]);

    let exist = false;

    users.forEach((user) => {
        if (user["id"] === idParams) {
            exist = true;
        }
    });

    if (exist && index !== -1) {
        const updatedUserKey = Object.keys(editUser);
        for (let key of updatedUserKey) {
            users[index][key] = editUser[key];
        }

        response.status(200).json({
            status: `user id:${idParams} has been updated`,
            data: users,
        });
    } else {
        response.status(200).json({
            status: "user id does not exist",
        });
    }
});

//patch dengan cara lain
app.patch("/users/replace/:id", (request, response) => {
    let idParams = parseInt(request.params.id);
    let users = data.users;
    let selectedDataIndex = false; // inisiasi nilai false

    users.forEach((user, index) => {
        if (user["id"] === idParams) {
            selectedDataIndex = index;
            users[index] = { ...user, ...request.body };
        }
    });

    if (selectedDataIndex === 0 || selectedDataIndex) {
        //selectedData index menjadi true karena memiliki nilai
        response.status(200).json({
            isSuccess: true,
            message: `user ID ${idParams} has been updated`,
            data: users,
        });
    } else {
        response.status(400).json({
            isSuccess: false,
            message: "error, user ID does not exist",
        });
    }
});
