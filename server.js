'use strict';

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const admin = require("firebase-admin");

const serviceAccount = require("./__DO_NOT_DELETE/boxmen-universe-firebase-adminsdk-88dlj-71587885ed.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.firestore().collection('test').doc().create({
	isTest: true,
	isWorking: true,
	isInHeroku: true
});

// Website related stuffs
const PORT = process.env.PORT || 3000;
// const INDEX = '/dist/index.html';

const server = express()
	.use(express.static(path.join(__dirname, 'dist')))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('disconnect', () => console.log('Client disconnected'));
});

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
setTimeout(() => io.emit('time', new Date().toTimeString()), 4300);