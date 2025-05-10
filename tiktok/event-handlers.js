// tiktok/event-handlers.js
const Logger = require('../utils/log');
const ChatFilters  = require('../utils/chat-filters');
const Constants  = require('../utils/constants');

function registerEventHandlers(client, socket) {
    client.on('chat', data => {
        Logger.logInfo(data.user.uniqueId, data.comment);
        if (ChatFilters.isAllowedCommand(data.comment)) {
            const command = ChatFilters.getCommand(data.comment);            
            if (ChatFilters.isFromAllowedUser(data)) {
                // For admin side
                if (command === Constants.COMMAND_NEXT) {
                    socket.to("CURRENT_SESSION").emit('next-request');
                    Logger.logCommand(data.user.uniqueId, data.comment);
                } else if (command === Constants.COMMAND_CLEAR) {
                    socket.to("CURRENT_SESSION").emit('clear-request');
                    Logger.logCommand(data.user.uniqueId, data.comment);
                } else if (command === Constants.COMMAND_REQUEST) {
                    let songRequest = data.comment.split(`${command} `)[1];
                    Logger.logRequest(data.user.uniqueId, songRequest);
                    socket.to("CURRENT_SESSION").emit('event-log', `🤍 Request dari <b>${data.user.uniqueId}</b>: <b>${songRequest}</b>`);
                }
            } else {
                // For viewers side
                if (command === Constants.COMMAND_REQUEST) {
                    let songRequest = data.comment.split(`${command} `)[1];
                    Logger.logRequest(data.user.uniqueId, songRequest);
                    socket.to("CURRENT_SESSION").emit('event-log', `Request dari ${data.user.uniqueId}: ${songRequest}`);
                }
            }
        }
    });

    // client.on('gift', data => {
    //     console.log(`[GIFT] ${data.user.uniqueId} sent ${data.giftName} x${data.repeatCount}`);
    // });

    // client.on('like', data => {
    //     console.log(`[LIKE] ${data.user.uniqueId} liked. Total likes: ${data.totalLikeCount}`);
    // });

    client.on('error', err => {
        console.error('[ERROR]', err);
    });

    client.on('disconnected', () => {
        console.log('[INFO] Disconnected from livestream');
    });
}

module.exports = registerEventHandlers;