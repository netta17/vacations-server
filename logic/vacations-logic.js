let vacationsDao = require("../dao/vacations-dao");
let pushLogic = require("./push-logic");


async function addVacation(vacationsDetails,senderId) {
    let vacationId;
    vacationId = await vacationsDao.addVacation(vacationsDetails,senderId);
    vacationsDetails.vacationId = vacationId;
    pushLogic.broadcastExceptSender("addVacation" , vacationsDetails, senderId);

    return vacationId;
}

async function getAllVacations() {
    let vacationsDetails = await vacationsDao.getAllVacations();

    return vacationsDetails;
}


async function deleteVacation(vacationId, senderId) {
    await vacationsDao.deleteVacation(vacationId);
    await vacationsDao.deleteVacationFollowers(vacationId);
    pushLogic.broadcastExceptSender("deleteVacation" , vacationId , senderId);
    
}

async function editVacation(vacationsDetails,senderId) {
    let currentVacationDetails = await vacationsDao.editVacation(vacationsDetails);
    let editedVacationId = vacationsDetails.vacationId
    vacationsDetails.vacationId =editedVacationId ;
    pushLogic.broadcastExceptSender("editVacation" , vacationsDetails , senderId);

    return currentVacationDetails;

}

module.exports = {
addVacation,
getAllVacations,
deleteVacation,
editVacation
};