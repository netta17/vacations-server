let usersDao = require("../dao/users-dao");
let pushLogic = require("./push-logic");
const crypto = require("crypto");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");


const config = require("../config.json");
const jwt = require('jsonwebtoken');
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";


async function login(userLoginDetails) {

    userLoginDetails.password = crypto.createHash("md5").update(saltLeft + userLoginDetails.password + saltRight).digest("hex");

    let userLoginData = await usersDao.login(userLoginDetails);
    const token = jwt.sign({
        userId: userLoginData.userId,
        userType: userLoginData.userType,
        
    }, config.secret);

    pushLogic.broadcastExceptSender("connection" , userLoginData.userId);

    return { token: token, userType: userLoginData.userType , userId: userLoginData.userId};
 
}

async function addUser(newUserDetails) {

    validateUserData(newUserDetails);
 
    let isUsernameExist =await usersDao.isUsernameValide(newUserDetails.username);
  
    if (isUsernameExist) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }

    newUserDetails.password = crypto.createHash("md5").update(saltLeft + newUserDetails.password + saltRight).digest("hex");
    let addedNewUserDetails = await usersDao.addUser(newUserDetails);
    const token = jwt.sign({
        userId: addedNewUserDetails.insertId,
        userType: "customer",
    }, config.secret);

     return { token: token, userType: "customer" , userId: addedNewUserDetails.insertId  };
  
}

async function validateUserData(newUserDetails) {
    

    if (!newUserDetails.firstName) {
        throw new ServerError(ErrorType.FIELD_IS_EMPTY);
    }

    if (!newUserDetails.lastName) {
        throw new ServerError(ErrorType.FIELD_IS_EMPTY);
    }

    if (!newUserDetails.username) {
        throw new ServerError(ErrorType.FIELD_IS_EMPTY);
    }

    if (!newUserDetails.password) {
        throw new ServerError(ErrorType.FIELD_IS_EMPTY);
    }

    if (newUserDetails.userType != "admin") {
        return newUserDetails.userType = "customer";
    }


}

module.exports = {
    login,
    // getUser,
    addUser
};