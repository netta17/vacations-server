let connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");



async function addVacation(vacationsDetails) {

    let sql = "INSERT INTO vacations (vacationDestination, price, startDate, endDate , img) values (?,?,?,?,?)";

    let parameters = [vacationsDetails.vacationDestination, vacationsDetails.price, vacationsDetails.startDate, vacationsDetails.endDate, vacationsDetails.img];

    let addedVacationResult;
    try {
        addedVacationResult = await connection.executeWithParameters(sql, parameters);
        return addedVacationResult.insertId
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);

    }

}

async function getAllVacations() {

    let sql = "SELECT * FROM vacations";

    let allVacationsDetails;
    try {

        allVacationsDetails = await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }


    return allVacationsDetails;
}

async function deleteVacation(vacationId) {

    let sql = "delete from vacations where vacationId=?";

    let parameters = [vacationId];
    try {
        successfullRemovedVacation = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

    return successfullRemovedVacation;
}

async function deleteVacationFollowers(vacationId) {

    let sql = "delete from followed_vacations where vacationId=?";

    let parameters = [vacationId];
    try {
        successfullRemovedVacationFollowers = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

    return successfullRemovedVacationFollowers;
}


async function editVacation(vacationsDetails) {

    let sql = "UPDATE vacations SET vacationDestination = ?, price  = ?, img = ? , startDate = ? , endDate = ? where vacationId=?"


    let parameters = [vacationsDetails.vacationDestination, vacationsDetails.price, vacationsDetails.img, vacationsDetails.startDate, vacationsDetails.endDate, vacationsDetails.vacationId];


    let currentVacationDetails;
    try {

        currentVacationDetails = await connection.executeWithParameters(sql, parameters);

    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }


    return currentVacationDetails[0];
}



module.exports = {
    addVacation,
    getAllVacations,
    deleteVacation,
    editVacation,
    deleteVacationFollowers
};