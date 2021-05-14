const socket = io('http://127.0.0.1:8000');
const form = document.getElementById('send-box');
const msgin = document.getElementById('msgin');
const msgcon = document.querySelector('.container');
var audio = new Audio('ding.mp3');

const append = (message, position) => {
   const messageElement = document.createElement('div');
   messageElement.innerText = message;
   messageElement.classList.add('message');
   messageElement.classList.add(position);
   msgcon.append(messageElement);
   if (position == 'left') {
      audio.play();
   }
};

// when someone submit then we have to print this message to sender and emit send event to server
form.addEventListener('submit', (e)=> {
   e.preventDefault();
   const message = msgin.value;
   append(`You: ${message}`, 'right');
   socket.emit('send', message); // i am sending this message to broadcast it to other users
   msgin.value = '';
})

//socket.on listens to some event and call some function
//socket.emit tells the other js to do listen its call e.g.- below

const nam = prompt("Enter your name to join the room");
socket.emit('new-user-joined', nam);

socket.on('user-joined', nam => {
   append(`${nam} joined the room`, 'left');
});

socket.on('receive', data => {
   append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', nam => {
   append(`${nam} left the room`, 'right');
})