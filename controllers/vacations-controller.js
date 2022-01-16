let vacationsLogic = require("../logic/vacations-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");


// example - http://localhost:3001/vacations/
router.post("/", async (request, response ,next) => {

    let vacationsDetails = request.body;

    try {
        let token = request.headers.authorization;
        let decoded = jwt_decode(token);
        let userId = decoded.userId;

        let successfullAddedVacation = await vacationsLogic.addVacation(vacationsDetails,userId);
        response.json(successfullAddedVacation);
    }
    catch (error) {
        return next(error);
    }
});

// example - http://localhost:3001/vacations/
router.get("/", async (request, response,next) => {

    try {
        let successfullGotAllVacations = await vacationsLogic.getAllVacations();
        response.json(successfullGotAllVacations);
    }
    catch (error) {
        return next(error);
    }
});

// example - http://localhost:3001/vacations/10
router.delete("/:id", async (request, response,next) => {

    let vacationId = request.params.id;

    try {
        let token = request.headers.authorization;
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
   

        await vacationsLogic.deleteVacation(vacationId, userId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

// example - http://localhost:3001/vacations/
router.put("/", async (request, response,next) => {

    
    let vacationsDetails = request.body;
    try {
        let token = request.headers.authorization;
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
        let currentVacationDetails = await vacationsLogic.editVacation(vacationsDetails,userId);
        response.json(currentVacationDetails);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;