const { TicketControl } = require('../classes/ticket-control');
const { io } = require('../server');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    
    // Aqui escucho el ticket solicitado por el cliente
    client.on('siguienteTicket', (data, callback) => {
        
        const siguienteTicket = ticketControl.siguiente();
        
        callback( siguienteTicket );
        
        console.log(siguienteTicket);
        
    });
    
    // Aqui emito el ticket actual hacia al cliente
    client.emit('estadoActual', {

        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()

    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                err: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback( atenderTicket );
        
        client.broadcast.emit('ultimos4', {ultimos4: ticketControl.getUltimos4()});

    });


});