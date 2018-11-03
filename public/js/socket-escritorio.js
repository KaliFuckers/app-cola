var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

socket.on('connect', function(){
    console.log('Conectando al servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectando al servidor');
});

label.text('Nadie')

$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        if(resp.numero === undefined){
            return alert('No hay más tickets');
        }
        label.text(`Ticket ${resp.numero}`);
    });
});

