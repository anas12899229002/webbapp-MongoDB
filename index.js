const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config")


const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login"); 
});

app.get("/signup", (req, res) => {
    res.render("signup"); 
});

app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({name : data.name});

    if(existingUser) {
        res.send("User already exists. Please choose a different username")
    }else {
        // si on veut hacher le mot de passe avec bcrypt //
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

    
});

app.post("/signup")

const port = 5009;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
