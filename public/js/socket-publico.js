var socket = io();
let aux = true;
socket.on('connect', function(){
    console.log('Conectando al servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectando al servidor');
});

socket.on('ultimos4', function(data){
    console.log(data);
    console.log(aux);
    if(data.boo.length !== 0){
        aux = true;
    }
    if(aux === true){
        var audio = new Audio('audio/new-ticket.mp3');
        audio.play();
        actualizarHTML(data.ultimos);
    }
    if(data.boo.length === 0){
        aux = false;
    }
})

socket.on('ticketActual', function(data){
    const ulti = data.ultimos4;
    actualizarHTML(ulti);
    
})

function actualizarHTML(ulti){
    if(ulti.length === 0){
        alert('No hay ticket');
        return;
    }
    for(let i = 0; i <= ulti.length - 1; i++){
        $('#lblTicket' + (i + 1)).text('Ticket ' + (ulti[i].numero));
        $('#lblEscritorio' + ( i + 1)).text('Escritorio ' + (ulti[i].escritorio));
    }
}