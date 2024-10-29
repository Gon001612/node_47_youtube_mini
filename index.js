import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";

const app = express();

// add middleware for convert string to json with API POST and GET
app.use(express.json());

// import rootRoutes vao index.js
app.use(rootRoutes);

app.get("/hello-world", (req,res) => {
    res.send("Hello World")
})

app.get("/health-check", (req,res) => {
    res.send("Server is connecting")
})

// define port for BE
app.listen(8080, () => {
    console.log("BE starting with port 8080")
})