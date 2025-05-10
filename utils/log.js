// utils/log.js

// Private Functions
function getCurrentDateInFormat() {
    const pad = n => n.toString().padStart(2, '0');
    const currentDate = new Date();
    const currentTimestamp = `${currentDate.getFullYear()}-${pad(currentDate.getMonth()+1)}-${pad(currentDate.getDate())} ${pad(currentDate.getHours())}:${pad(currentDate.getMinutes())}:${pad(currentDate.getSeconds())}`;
    return currentTimestamp;
}

// Public Functions
function logCommand(username, message) {
    const type = "COMMAND";
    console.log(`[${getCurrentDateInFormat()}] [${type}] [USER: ${username}]: ${message}`);
}

function logRequest(username, songRequest) {
    const type = "REQUEST";
    console.log(`[${getCurrentDateInFormat()}] [${type}] [USER: ${username}]: Has requested ${songRequest}`);
}

function logInfo(username, message) {
    const type = "INFO";
    console.log(`[${getCurrentDateInFormat()}] [${type}] [USER: ${username}]: ${message}`);
}

function logError(message, err) {
    console.error(`[${getCurrentDateInFormat()}] [ERROR] ${message}`, err);
}

module.exports = { logCommand, logRequest, logInfo, logError };
