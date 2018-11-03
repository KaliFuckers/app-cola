var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectando al servidor');
});

socket.on('disconnect', function(){
    console.log('Descontado del servidor');
    
})

socket.on('ticketActual', function(data){
    label.text(`Ticket ${data.actual}`);
});

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguiente){
        label.text(siguiente);
    });

    
})
