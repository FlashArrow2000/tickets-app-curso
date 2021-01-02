const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if( data.hoy === this.hoy ){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }else{
            this.reiniciarConteoEnDB();
        }

    }

    // Para mostrar cual es el siguiente ticket
    siguiente() {

        this.ultimo += 1; //Esto es lo mismo que: this.ultimo = this.ultimo + 1

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return {
            ultimo: this.ultimo
        };

    }

    getUltimoTicket() {

        return {
            ultimo: this.ultimo
        };
        
    }

    getUltimos4() {

        return {
            ultimos4: this.ultimos4
        };
        
    }

    atenderTicket( escritorio ) {
        
        if( this.tickets.length === 0 ){
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;  
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift( atenderTicket );

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //OJO: Las posiciones en los arrays de izq a der van en orden ascendente, es decir, 1,2,3,4... Pero si queremos recorrer un arreglo de der a izq, utilizamos posicinoes en negativo. Esto borra ultima posicion (que es la primera si lo hacemos de der a izq)
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteoEnDB() {
        
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify( jsonData ); 

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }

}

module.exports = {
    TicketControl
}