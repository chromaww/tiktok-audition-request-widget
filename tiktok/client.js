// tiktok/client.js
const { TikTokLiveConnection } = require('tiktok-live-connector');

function createTikTokClient(username) {
    return new TikTokLiveConnection(username);
}

module.exports = createTikTokClient;