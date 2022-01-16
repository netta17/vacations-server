let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");


// example - http://localhost:3001/users/login
router.post("/login", async (request, response,next) => {

    let userLoginDetails = request.body;
  

    try {
        let successfullLoginData = await usersLogic.login(userLoginDetails);
        response.json(successfullLoginData);
    }
    catch (error) {
        return next(error);
    }
});

// example - http://localhost:3001/users/signup
router.post("/signup", async (request, response,next) => {

    let newUserDetails = request.body;

    try {
        let successfullAddedUser = await usersLogic.addUser(newUserDetails);
     
        response.json(successfullAddedUser);
    }
    catch (error) {
        return next(error);
    }
});

router.get("/", async (request, response) => {

        let token = request.headers.authorization;
        let decoded = jwt_decode(token);
        let userId = decoded.userId;
        let userType = decoded.userType;

        let userDetails = {
            userId,
            userType
        }
        response.json(userDetails);

});


module.exports = router;