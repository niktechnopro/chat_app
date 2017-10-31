// console.log("sanity check")
//setup the route to piggyback
$(document).ready(()=>{
	var socketUrl = "http://127.0.0.1:8080"
	console.log(io);
	socketio = io.connect(socketUrl);
	var name = prompt("what is your name?")
	//emit takes 2 args
	//1. event (we make this up);
	//2. data to send via ws;
	socketio.emit('nameToServer', name);
	socketio.on('newUser',(users)=>{
		console.log(`${userName} just joined`);
		var usersHTML = "";
		users.map((user)=>{
		// $('#users').append(`<div class="col-sm-12">${user.name}</div>`);
			usersHTML += `<div class="col-sm-12">${user.name}</div>`;
		});
		$('#users').html(usersHTML)
	});
	$('#submit-message').submit((event)=>{
		event.prevetDefault();
		var newMesssage = $('#new-message').val();
		socketip.emit('messageToServer', {
			name: name,
			message: newMesssage
		})
	})
	socketio.on()	
});