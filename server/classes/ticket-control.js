const fs = require('fs');

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 =[];
        const data = require('../data/data.json');
        if(this.hoy === data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }
        else{
            this.reiniciar();
        }
    }

    guardarArchivo(){
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        const jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    getTicketActual(){
        
        return this.ultimo;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    getTicketsLength(){
        return this.tickets;
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarArchivo();
        return `Ticket ${ this.ultimo }`
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay mas tickets que atender';
        }
        const numero = this.tickets[0];
        numero.escritorio = escritorio;
        this.tickets.shift();
        this.ultimos4.unshift(numero);

        //Shift es quitar el primero
        //unshift poner en el primero
        //pop quita el ultimo

        if(this.ultimos4.length > 4){
            this.ultimos4.pop();
        }
        
        this.guardarArchivo();
        return numero;
        
        
    }

    reiniciar(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
    }
}

module.exports = {
    TicketControl
}