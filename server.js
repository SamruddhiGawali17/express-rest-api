const express = require("express");

const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Samruddhi",
        email: "samruddhi@example.com"
    },
    {
        id: 2,
        name: "Prateek",
        email: "prateek@example.com"
    }
];

// GET - Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST - Add a new user
app.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT - Update a user
app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;

    res.json(user);
});

// DELETE - Delete a user
app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});