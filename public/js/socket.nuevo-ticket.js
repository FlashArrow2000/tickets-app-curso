
// Comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket')

// Establecer conexino con el server
socket.on('connect', function () {
    console.log('Conectado al servidor')
})

// Para decir que se desconecto del servidor
socket.on('disconnect',  function () {
    console.log('Desconectado del servidor')
})

// Aqui pido llamar la funcion siguiente ticket
$('button').on('click', function () {

    socket.emit('siguienteTicket', null, function (res) {

        label.text(`Ticket: ${res.ultimo}`)

    } )

})

// Aqui escucho el siguiente ticket que emite el servidor
socket.on('estadoActual', function (res){

    const body = res.actual;
    const siguienteTicket = body.ultimo;

    label.text(`Ticket: ${siguienteTicket}`)

});