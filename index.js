import express from "express";
import connect from "./db.js";
import rootRoutes from "./src/routes/rootRoutes.js";
import cors from 'cors'

// create object all of express
const app = express();

// add middleware cors to receive request from FE or orther
app.use(cors());

// add middleware for convert string to json with API POST and GET
app.use(express.json());

// import rootRoutes vao index.js
app.use(rootRoutes);

app.get("/hello-world", (req,res) => {
    res.send("Hello World")
});

app.get("/health-check", (req,res) => {
    res.send("Server is connecting")
});

// define port for BE
app.listen(8080, () => {
    console.log("BE starting with port 8080")
});