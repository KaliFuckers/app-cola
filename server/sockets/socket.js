const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticket = new TicketControl(); 

io.on('connection', (client) => {
    
    client.on('siguienteTicket', (data, callback) => {
        const tic = ticket.siguiente();
        callback(tic);
    })

    client.emit('ticketActual', {
        actual:ticket.getTicketActual(),
        ultimos4: ticket.getUltimos4()
    });
    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }
        const atender = ticket.atenderTicket(data.escritorio);
        callback(atender);

        client.broadcast.emit('ultimos4', {
            ultimos:ticket.getUltimos4(),
            boo: ticket.getTicketsLength()
        });
    })

});