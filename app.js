require('dotenv').config();
require("pg").defaults.parseInt8 = true;

const express = require("express");
const cors = require("cors");
const routes = require("./routes/app.routes");
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to ticket management application." });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});