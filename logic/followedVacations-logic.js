let followedVacationsDao = require("../dao/followedVacations-dao");


async function followVacation(userId,vacationId) {
    let successfullyFollowedVacation = await followedVacationsDao.followVacation(userId,vacationId);

    return successfullyFollowedVacation;
};


async function unFollowVacation(userId,vacationId) {
    let successfullyUnFollowedVacation = await followedVacationsDao.unFollowVacation(userId,vacationId);

    return successfullyUnFollowedVacation;
};

async function countUsersForVacation() {
    let amountOfUsersForVacation = await followedVacationsDao.countUsersForVacation();
    return amountOfUsersForVacation;
};

async function getFollowedVacationsByUser(userId) {
    let allFollowedVacationsByUser = await followedVacationsDao.getFollowedVacationsByUser(userId);
    return allFollowedVacationsByUser;
};

async function getNumOfFollowerdForVacation(vacationId) {
    let numOfFollowersForVacation = await followedVacationsDao.getNumOfFollowerdForVacation(vacationId);
    return numOfFollowersForVacation;
};

module.exports = {
    followVacation,
    unFollowVacation,
    countUsersForVacation,
    getFollowedVacationsByUser,
    getNumOfFollowerdForVacation
    };