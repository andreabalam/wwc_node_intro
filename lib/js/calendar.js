'use stric';
var socket = io.connect('http://localhost:8080');

function formarEvento(hora, evento){
	var tListPoint = 
		'<li class="list-group-item"><span class="badge">_time_</span>_event_</li>';
	var newListPoint = "";
	newListPoint = tListPoint.replace("_time_",hora);
	newListPoint = newListPoint.replace("_event_",evento);
	return newListPoint;
}

function guardarEvento ( ) {
	var evento = $("#evento").val();
	var hora = $("#hora").val();
	hora = hora.substring(0, (hora.length > 5)? hora.length-3: hora.length);

	$.post('/events/save', { event: evento,time: hora } ,function(response){
		socket.emit('new event', { event: evento,time: hora } );
		$('#myModal').modal('hide');
	});
}

function cargarEventos(){
	$.get('/events', function(response){
		$(".todo-list").empty();
		$.each(response.events, function (key, val){
			$(".todo-list").append(formarEvento(val.time, val.event));
		});	
	},"json");
}

socket.on('new event', function(eventObj){
	$(".todo-list").append(formarEvento(eventObj.time,eventObj.event ) );
	});

	socket.on('user joined', function(msg){
	$('#current-users').html(msg.numUsers);
	});

	socket.on('user left', function(msg){
	$('#current-users').html(msg.numUsers);
	});

	/*socket.on('file changed', function(){
		cargarEventos();
	});*/

$(document).ready(function(){
	cargarEventos();
});