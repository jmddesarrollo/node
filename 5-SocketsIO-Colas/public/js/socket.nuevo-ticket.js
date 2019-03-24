// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});