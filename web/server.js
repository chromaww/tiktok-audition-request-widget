// web/server.js
const express = require('express');
const http = require('http');
const path = require('path');

function createServer() {
    const app = express();
    const server = http.createServer(app);

    app.use(express.static(path.join(__dirname, '..', 'public')));

    return { app, server };
}

module.exports = createServer;