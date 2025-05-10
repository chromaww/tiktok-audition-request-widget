// web/socket.js
const { Server } = require('socket.io');
const Logger = require('../utils/log');
const createTikTokClient = require('../tiktok/client');
const registerEventHandlers = require('../tiktok/event-handlers');

function setupSocket(server) {
    const io = new Server(server);
    let client = null;

    io.on('connection', (socket) => {
        // Joining socket room
        const clientId = socket.handshake.auth.clientId;
        socket.clientId = clientId;

        Logger.logInfo("System", `[SOCKET] Client connected, SocketID: ${socket.id}, ClientID: ${clientId}`);

        socket.on('join', function(room) {
            socket.join(room);
        });

        socket.on('start-live', async (username) => {
            if (client) {
                Logger.logInfo("System", '[TIKTOK_CLIENT] Already connected.');
                return;
            }

            client = createTikTokClient(username);

            try {
                const state = await client.connect();
                Logger.logInfo("System", `[TIKTOK_CLIENT] Connected, roomId ${state.roomId}`);
                registerEventHandlers(client, socket);
                socket.emit('connected');
            } catch (err) {
                Logger.logError('[TIKTOK_CLIENT] Error while connecting', err);
                socket.emit('connect-error', err.message);
                client = null;
            }
        });

        socket.on('disconnect-live', async () => {
            if (client) {
                try {
                    socket.leave(clientId);
                    await client.disconnect();
                    socket.emit('disconnected');
                    Logger.logInfo("System", '[INFO] Disconnected from livestream');
                } catch (err) {
                    Logger.logError('[DISCONNECT-ERROR]', err);
                } finally {
                    client = null;
                }
            }
        });
    });
}

module.exports = setupSocket;