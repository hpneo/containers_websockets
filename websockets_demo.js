// var connection = new WebSocket('ws://localhost:2376/v1.24/containers/websockets/attach/ws?logs=0&stream=1&stdin=1&stdout=1&stderr=1');
var commands = document.querySelector('.websockets-demo-container-commands'),
    input = document.querySelector('.websockets-demo-input');

input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    if (event.target.value.trim() !== '') {
      connection.send(event.target.value + '\n');
    }
  }
});

var connection = new WebSocket('wss://ws.codeground.xyz:4430/v1.22/containers/websockets_demo/attach/ws?logs=0&stream=1&stdin=1&stdout=1&stderr=1');

connection.addEventListener('open', function() {
  console.log('open');
});

connection.addEventListener('close', function() {
  console.log('close');
});

connection.addEventListener('error', function() {
  console.log('error');
});

connection.addEventListener('message', function(event) {
  var newCommand = document.createElement('pre');
  newCommand.className = 'cm-s-neo';
  newCommand.textContent = event.data;

  CodeMirror.runMode(newCommand.textContent, 'shell', newCommand);

  commands.appendChild(newCommand);
  input.value = '';
});