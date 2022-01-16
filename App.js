const express = require("express");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followedVacationsController = require("./controllers/followedVacations-controller");
const filesController = require("./controllers/files-controller");
const errorHandler = require("./errors/error-handler");
const loginFilters = require("./filters/login-filters");
const fileupload = require("express-fileupload");
const cors = require('cors');
const server = express();

server.use(cors({ origin: "http://localhost:3000"}));
server.use(fileupload());
server.use(express.static("files"));
server.use(express.json());
server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followedVacations",followedVacationsController);
server.use("/files",filesController);
server.use(errorHandler);
server.use(loginFilters);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));

