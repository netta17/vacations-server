const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");


async function login(userLoginDetails) {

    let sql = "SELECT * FROM users where username =? and password =?";

    let parameters = [userLoginDetails.username, userLoginDetails.password];
    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }

    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

    if (usersLoginResult === null || usersLoginResult.length === 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return usersLoginResult[0];

}


async function isUsernameValide(userName) {

    let sql = "SELECT * FROM users where username =?";

    let parameters = [userName];

    let usernameValidationResult;
    try {
        usernameValidationResult = await connection.executeWithParameters(sql, parameters);
        return usernameValidationResult[0];
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

}

async function addUser(newUserDetails) {

    let sql = "INSERT INTO users (username,password,firstName,lastName,userType) VALUES (?,?,?,?,?)";

    let parameters = [newUserDetails.username, newUserDetails.password, newUserDetails.firstName, newUserDetails.lastName, newUserDetails.userType];

    try {
        let userDetails = await connection.executeWithParameters(sql, parameters);
        return userDetails;


    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }



}

module.exports = {
    login,
    // getUser,
    isUsernameValide,
    addUser
};