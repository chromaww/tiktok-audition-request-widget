// utils/chat-filters.js
const Constants  = require('../utils/constants');

function isFromAllowedUser(data) {
    return Constants.ADMIN_USER_IDS.includes(data?.user?.userId);
}

function getCommand(comment) {
    return comment.split(" ")[0];
}

function isAllowedCommand(message) {
    let allowedComands = [
        Constants.COMMAND_REQUEST,
        Constants.COMMAND_NEXT,
        Constants.COMMAND_CLEAR
    ]

    let command = getCommand(message);
    return allowedComands.includes(command);
}

module.exports = { isFromAllowedUser, getCommand, isAllowedCommand }