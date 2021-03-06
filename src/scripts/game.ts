import { io } from 'socket.io-client';

var socket = io();

socket.on('time', function (timeString) {
  console.log('Server time: ' + timeString);
});

console.log('This is definitely a test');