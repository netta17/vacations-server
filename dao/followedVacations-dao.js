let connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");


async function followVacation(userId, vacationId) {

    let sql = "INSERT INTO followed_vacations (userId , vacationId) values (?,?)"
    let parameters = [userId, vacationId];

    try {
        successfullyFollowedVacation = await connection.executeWithParameters(sql, parameters);
        return;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}


async function unFollowVacation(userId, vacationId) {

    let sql = "DELETE from followed_vacations where userId=? and vacationId=?"
    let parameters = [userId, vacationId];

    try {
        successfullyUnFollowedVacation = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

    return successfullyUnFollowedVacation;
}

async function countUsersForVacation() {

    let sql = "SELECT v.vacationDestination, count(fv.userId) AS amount_of_followers FROM followed_vacations fv INNER JOIN vacations v ON v.VacationId = fv.vacationId GROUP BY v.vacationDestination";

    try {
        successfullyUnFollowedVacation = await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

    return successfullyUnFollowedVacation;

}
async function getFollowedVacationsByUser(userId) {

    let sql = "SELECT vacationId from followed_vacations where userId=?"
    let parameters = [userId];
    let allFollowedVacationsByUser;
    try {
        allFollowedVacationsByUser = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }

    return allFollowedVacationsByUser;
}

async function getNumOfFollowerdForVacation(vacationId) {

    let sql = "SELECT count(userId) As followers FROM followed_vacations where vacationId=?"
    let parameters = [vacationId];
    let numOfFollowersForVacation;
    try {
        numOfFollowersForVacation = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }

    return numOfFollowersForVacation;
}

module.exports = {
    followVacation,
    unFollowVacation,
    countUsersForVacation,
    getFollowedVacationsByUser,
    getNumOfFollowerdForVacation
};