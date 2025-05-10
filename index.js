// index.js
const express = require('express');
const path = require('path');
const createServer = require('./web/server');
const setupSocket = require('./web/socket');
const routes = require('./routes');

const { app, server } = createServer();

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Use modular HTML page routes
app.use('/', routes);

setupSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌐 Server running at http://localhost:${PORT}`);
});