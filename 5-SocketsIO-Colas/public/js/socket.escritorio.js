// Comando para establecer la conexión
var socket = io();

socket.on('connect', (client) => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', (client) => {
    console.log('Desconectado al servidor');
});

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario.');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {
    socket.emit('atenderTicket', { escritorio: escritorio }, (data) => {
        if (data.numero > 0) {
            label.text('ticket número ' + data.numero);
        } else {
            alert('No hay más tickets.');
        }

        console.log(data);
    });
});