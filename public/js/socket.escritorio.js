var socket = io();

var searchParams = new URLSearchParams( window.location.search );

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');

if (escritorio <= 0) {
    window.location = 'index.html';
    throw new Error('El numero de escritorio debe ser mayor que 0');
}

var label = $('h4')

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {

    socket.emit('atenderTicket', { escritorio: escritorio}, function (resp) {

        if (resp === 'No hay tickets') {
            Swal.fire(
                '¡Buen trabajo!',
                'Por el momento, no hay más tickets por atender :)',
                'success'
              )
            label.text('Toque el boton para atender un ticket');
            return;
        }

            label.text('Atendiento al ticket ' + resp.numero);
    });

})
