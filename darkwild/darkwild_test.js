var server=new Server();
var client;

$(function(){
	client=new Client();

	client.resetText();
	client.onMessage({format:'welcome'});

	client.connect(server,'tester');

	client
	.buildAction('go_forward')
	.buildAction('go_backward')
	.buildAction('turn_left')
	.buildAction('turn_right')
	.buildAction('touch_front')
	.buildAction('touch_ground')
	.buildAction('attack')
	.buildAction('respawn');

	client
	.buildQuickKey('wW','go_forward')
	.buildQuickKey('sS','go_backward')
	.buildQuickKey('aA','turn_left')
	.buildQuickKey('dD','turn_right')
	.buildQuickKey('qQ','touch_front')
	.buildQuickKey('eE','touch_ground')
	.buildQuickKey('fF','attack')
	.buildQuickKey('rR','respawn');
	
	// client.send('gogogo');

	const input=$("#send_message");
	input.keydown(function (e) {
		if (e.which == 13 && input.val()!='') {
			client.send('message',{message:input.val()});
			input.val('');
		}
	});

	const ops='wqawwwawedwwqfwdwwwewesdwawdwwwwqawdwawqefwqesawwwdwawe';
	for(let i=0;i<ops.length;i++){
		var e = jQuery.Event("keydown");
		e.keyCode = ops.charCodeAt(i);
		$(document).trigger(e);
	}
});