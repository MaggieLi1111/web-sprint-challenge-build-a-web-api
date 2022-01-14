const express = require('express');
const server = express();


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

server.use(express.json())
server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)


server.get("/", (req, res) => {
    res.send("API is running!!!")
})

server.use("*", (req, res) => {
    res.status(404).json({
        message:`${req.method} ${req.baseUrl} is not valid`
    })
})

server.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        message:`Error:${err.message}`
    })
})

module.exports = server;
