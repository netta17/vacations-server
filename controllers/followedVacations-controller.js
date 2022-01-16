let followedVacationsLogic = require("../logic/followedVacations-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");

router.post("/", async (request, response,next) => {

    let followedVacationId = request.body.vacationId;
  
    try {
        let token = request.headers.authorization;
     
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
     

        let successfullyFollowedVacation = await followedVacationsLogic.followVacation( userId, followedVacationId);
        response.json(successfullyFollowedVacation);
    }
    catch (error) {
        return next(error);
    }
});


router.delete("/:id", async (request, response,next) => {

    let unFollowedVacationId = request.params.id;
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
    
    try {
        let successfullyUnFollowedVacation = await followedVacationsLogic.unFollowVacation(userId,unFollowedVacationId);
        response.json(successfullyUnFollowedVacation);
    }
    catch (error) {
        return next(error);
    }
});

router.get("/reports", async (request, response,next) => {
   
    let amountOfUsersForVacation;
    
    try {
      
        amountOfUsersForVacation = await followedVacationsLogic.countUsersForVacation();
        response.json(amountOfUsersForVacation);
    }
    catch (error) {
        return next(error);
    }
});

router.get("/", async (request, response,next) => {

    try {
        let token = request.headers.authorization;
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
       
    
        let allFollowedVacationsByUser = await followedVacationsLogic.getFollowedVacationsByUser(userId);
        response.json(allFollowedVacationsByUser);
    }
    catch (error) {
        return next(error);
    }
});


router.get("/:id", async (request, response,next) => {

    try {
        let vacationId = request.params.id;
    
        let allFollowedVacationsByUser = await followedVacationsLogic.getNumOfFollowerdForVacation(vacationId);
        response.json(allFollowedVacationsByUser);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;