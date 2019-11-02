/* LANGUAGE */
const TEXTS={
	'zh':{
		'title':{text:'暮光原野'},
		'game_title':{text:'暮光原野'},
		'action_title':{text:'行动'},
		'go_forward':{text:'前进'},
		'go_backward':{text:'后退'},
		'turn_left':{text:'左转'},
		'turn_right':{text:'右转'},
		'touch_front':{text:'向前摸'},
		'touch_ground':{text:'向下探'},
		'attack':{text:'攻击'},
		'respawn':{text:'重生'},

		'name_tag':{text:'玩家名:'},
		'health_tag':{text:'生命:'},
		'coin_tag':{text:'金币:'},

		'tree':{text:'树'},
		'grass':{text:'草丛'},
		'barrier':{text:'屏障'},
		'ice':{text:'冰'},
		'gold_block':{text:'金块'},
		'girl':{text:'流浪女孩'},

		'lava':{text:'岩浆'},
		'thorns':{text:'荆棘'},

		'soft':{text:'软'},
		'hard':{text:'硬'},

		'dead_player':{text:'玩家已死。',color:'red'},

		'forward':{text:'前方'},
		'front':{text:'前方'},
		'back':{text:'后方'},
		'left':{text:'左方'},
		'right':{text:'右方'},

		'hand':{text:'手部'},
		'foot':{text:'脚部'},

		'go_successfully':{text:'成功地向{dir}走了一步。'},
		'go_failed':{text:'你撞到了一个{hardness}物。',color:'orange'},

		'turn_successfully':{text:'转向{dir}。',color:'#99ffff'},

		'collect_coin':{text:'你捡到了{count}枚金币！',color:'gold'},

		'respawn_success':{text:'重生成功。',color:'#99ff99'},
		'respawn_failed':{text:'重生失败。原因:{reason}',color:'red'},

		'touch_front_something':{text:'你摸到了一个{hardness}的东西。',color:'#ccccff'},
		'touch_front_nothing':{text:'你什么也没摸到。',color:'#ccccff'},

		'touch_ground_result':{text:'你摸了摸地面，{feeling}。',color:'#ffffbb'},
		'temp_normal':{text:'温度正常'},
		'temp_feeling':{text:'感到{feeling}'},
		'feeling_a_bit':{text:'有点{temp}'},
		'feeling_none':{text:'挺{temp}的'},
		'feeling_very':{text:'很{temp}'},
		'feeling_very_very':{text:'非常{temp}'},
		'feeling_super':{text:'极{temp}'},
		'feeling_hell':{text:'地狱般的{temp}'},
		'feeling_hot':{text:'热'},
		'feeling_cold':{text:'冷'},

		'attack_result_none':{text:'你没有打到任何东西。',color:'#ffdddd'},
		'attack_result_hardness':{text:'你打到了一个{hardness}物。',color:'#ffdddd'},

		'damage_unknown':{text:'你受到了来自{dir}的{value}伤害。',color:'red'},
		'damage_hit_hard':{text:'你受到了来自{dir}的{value}伤害。',color:'red'},
		'damage_attack_hard':{text:'你的手打到了一个硬物，受到了{value}伤害。',color:'red'},
		'damage_lava':{text:'你掉入岩浆并受到{value}伤害。',color:'red'},
		'damage_thorns':{text:'你的手被扎了一下，受到了{value}伤害。',color:'red'},
		'damage_attack':{text:'你被来自{dir}的攻击伤到，受到了{value}伤害。',color:'red'},

		'death_unknown':{text:'{death}不知为何死了。',color:'#bb0000'},
		'death_hit_hard':{text:'{death}撞{damager}而死。',color:'#bb0000'},
		'death_attack_hard':{text:'{death}重拳出击，但打到了{damager}。',color:'#bb0000'},
		'death_lava':{text:'{death}在岩浆中游泳。',color:'#bb0000'},
		'death_thorns':{text:'{death}被荆棘扎死。',color:'#bb0000'},
		'death_attack':{text:'{death}被{damager}击杀。',color:'#bb0000'},
		'drop_coin':{text:'你丢失了{count}枚金币。',color:'#ff3300'},

		'welcome':{text:'欢迎来到暮光原野！你现在可以移动和转身了。',color:'cyan'},
		'player_message':{text:'[{player}] {message}'},
		'message_error':{text:'发送消息时出现错误:{reason}。',color:'red'},
		'no_message':{text:'消息为空'},

		'join_error':{text:'加入失败:{reason}。',color:'red'},
		'join_success':{text:'加入成功。',color:'green'},
		'action_error':{text:'操作失败:{reason}。',color:'red'},
		'wrong_pair':{text:'玩家名和UUID不匹配({data})'},
		'no_action':{text:'你不能做这个动作'},
		'no_name':{text:'没传玩家名'},
		'same_name':{text:'玩家名已存在'},
		'no_space':{text:'地图没有空间'},
		'player_alive':{text:'玩家未死亡'},

		'north':{text:'北'},
		'west':{text:'西'},
		'south':{text:'南'},
		'east':{text:'东'},

		'long_long_string':{text:'一个非常'+'长'.repeat(500)+'的字符串。',color:'violet'},
		'long_long_string2':{text:'一个非常'+' 长'.repeat(500)+' 的字符串。'},
		'format_test':{text:'{a} + {b} = {sum}',color:'pink'},
		'send_test':{text:'收到数据{action}。',color:'blue'},
		'mo_zzd':{text:'脚下的石板镌刻着神秘的花纹，有一股神秘的力量驱使着你去膜拜ZZD。',color:'purple'},
	},
	'en':{
		'title':{text:'Dark Wild'},
		'game_title':{text:'Dark Wild'},
		'action_title':{text:'Actions'},
		'go_forward':{text:'Go forward'},
		'go_backward':{text:'Go backward'},
		'turn_left':{text:'Turn left'},
		'turn_right':{text:'Turn right'},
		'touch_front':{text:'Touch front'},
		'touch_ground':{text:'Touch ground'},
		'attack':{text:'attack'},
		'respawn':{text:'Respawn'},

		'name_tag':{text:'Name:'},
		'health_tag':{text:'Health:'},
		'coin_tag':{text:'Coin:'},

		'tree':{text:'tree'},
		'grass':{text:'grass'},
		'barrier':{text:'barrier'},
		'ice':{text:'ice'},

		'lava':{text:'lava'},
		'thorns':{text:'thorns'},

		'soft':{text:'soft'},
		'hard':{text:'hard'},

		'dead_player':{text:'The player is dead.',color:'red'},

		'forward':{text:'forward'},
		'front':{text:'front'},
		'back':{text:'back'},
		'left':{text:'left'},
		'right':{text:'right'},

		'foot':{text:'foot'},
		'hand':{text:'hand'},

		'go_successfully':{text:'Go {dir} successfully.'},
		'go_failed':{text:'You hit something {hardness}.',color:'orange'},

		'turn_successfully':{text:'Turn {dir}.',color:'#99ffff'},

		'touch_front_something':{text:'You touched a {hardness} thing.',color:'#ccccff'},
		'touch_front_nothing':{text:'You touched nothing.',color:'#ccccff'},

		'touch_ground_result':{text:'You touched ground and {feeling}.',color:'#ffffbb'},
		'temp_normal':{text:'feel the temperture is normal'},
		'temp_feeling':{text:'feel {feeling}'},
		'feeling_a_bit':{text:'a bit {temp}'},
		'feeling_none':{text:'{temp}'},
		'feeling_very':{text:'very {temp}'},
		'feeling_very_very':{text:'very very {temp}'},
		'feeling_super':{text:'super {temp}'},
		'feeling_hell':{text:'{temp} like in the hell'},
		'feeling_hot':{text:'hot'},
		'feeling_cold':{text:'cold'},

		'collect_coin':{text:'You collected {count} coins!',color:'gold'},

		'respawn_success':{text:'Respawn successfully.',color:'#99ff99'},
		'respawn_failed':{text:'Respawn failed. Reason:{reason}',color:'red'},

		'damage_unknown':{text:'You got {value} damage from {dir}.',color:'red'},
		'damage_hit_hard':{text:'You got {value} damage from {dir}.',color:'red'},
		'damage_lava':{text:'You drop into lava and got {value} damage.',color:'red'},
		'damage_thorns':{text:'You got {value} damage by thorns.',color:'red'},

		'death_unknown':{text:'{death} just dead.',color:'#880000'},
		'death_hit_hard':{text:'{death} hit {damager} and dead.',color:'#880000'},
		'death_lava':{text:'{death} swam in lava.',color:'#880000'},
		'death_thorns':{text:'{death} touch the thorns.',color:'#880000'},

		'welcome':{text:'Welcome to Dark Wild! You can move and turn now.',color:'cyan'},
		'player_message':{text:'[{player}] {message}'},
		'message_error':{text:'Error on message:{reason}.',color:'red'},
		'no_message':{text:'no message'},

		'join_error':{text:'Error on joining:{reason}.',color:'red'},
		'join_success':{text:'Joined successfully.',color:'green'},
		'action_error':{text:'Error on action:{reason}.',color:'red'},
		'wrong_pair':{text:'wrong player/uuid pair({data})'},
		'no_action':{text:'no such action'},
		'no_name':{text:'no name'},
		'same_name':{text:'same name'},
		'no_space':{text:'no space'},
		'player_alive':{text:'player is alive'},

		'north':{text:'north'},
		'west':{text:'west'},
		'south':{text:'south'},
		'east':{text:'east'},

		'long_long_string':{text:'A very l'+'o'.repeat(500)+'ng string.',color:'violet'},
		'long_long_string2':{text:'A very l'+' o'.repeat(500)+' ng string.'},
		'format_test':{text:'{a} + {b} = {sum}',color:'pink'},
		'send_test':{text:'Got a data {action}.',color:'blue'},
		'mo_zzd':{text:'You need to %ZZD!',color:'purple'},
	}
};

/* Client */
class Client{
	constructor(language='zh'){
		$('#send_message')[0].value='';
		this.reponse=$('#reponse');
		this.messages=[];
		this.setLanguage(language);
	}
	setLanguage(language){
		this.language=language;
		this.texts=TEXTS[language];
		this.resetText();
	}
	onMessage(msg){
		if(msg instanceof Array){
			for(var i in msg){
				this.onMessage(msg[i]);
			}
			return;
		}
		switch(msg.format){
			case 'uuid_data':{
				this.uuid=msg.data.uuid;
				break;
			}
			case 'player_state':{
				var {name,health,coin}=msg.data;
				$('#name').text(name);
				$('#health').text(health);
				$('#coin').text(coin);
				for(var id of [
					'go_forward',
					'go_backward',
					'turn_left',
					'turn_right',
					'touch_front',
					'touch_ground',
					'attack',
				]){
					$('#'+id).prop('disabled',health<=0);
				}
				$('#respawn').prop('disabled',health>0);
				break;
			}
			default:{
				var onBottom=this.reponse.scrollTop()+this.reponse.height()+50>=this.reponse.prop("scrollHeight");
				this.messages.push(msg);
				this.praseMessage(msg);
				if(onBottom){
					this.reponse.scrollTop(this.reponse.prop("scrollHeight"));
				}
				break;
			}
		}
	}
	checkText(id){
		while(typeof this.texts[id]==='undefined'){
			this.texts[id]=JSON.parse(prompt(`${id} in ${this.language}`,`{"text":"${id}"}`));
		}
		return this.texts[id];
	}
	buildText(id){
		var x=this.checkText(id);
		$('#'+id).html(x.text);
		if(x.color){
			$('#'+id).css('color',x.color);
		}
	}
	praseText(msg){
		if(typeof msg.format=='string'){
			var str=this.checkText(msg.format).text;
			if(msg.data){
				var newData={};
				for(var i in msg.data){
					newData[i]=this.praseText(msg.data[i]);
				}
				str=str.format(newData);
			}
			return str;
		}else if(typeof msg=='string'){
			return msg;
		}else{
			return JSON.stringify(msg);
		}
	}
	praseMessage(msg){
		var node=$('<li></li>');
		var text=this.checkText(msg.format);
		if(text.color){
			node.css('color',text.color);
		}
		node.text(this.praseText(msg));
		this.reponse.append(node);
	}
	resetText(){
		$('title').html(this.texts.title.text);
		for(var id of [
			'game_title',
			'action_title',
			'go_forward',
			'go_backward',
			'turn_left',
			'turn_right',
			'touch_front',
			'touch_ground',
			'attack',
			'respawn',
			'name_tag',
			'health_tag',
			'coin_tag',
		]){
			this.buildText(id);
		}
		this.reponse.html('');
		for(var i in this.messages){
			this.praseMessage(this.messages[i]);
		}
	}
	send(action,data={},callback=this.onMessage){
		if(!data.name){
			data.name=this.name;
		}
		if(!data.uuid){
			data.uuid=this.uuid;
		}
		callback.call( this, this.server.receive(action,data) );
	}
	connect(server,name){
		this.name=name;
		this.server=server;
		this.send('join',{name});
		return this;
	}
	buildAction(id,name){
		if(!name)name=id;
		var self=this;
		$('#'+id).click(function(){
			self.send(name,{name:self.name,uuid:self.uuid});
		});
		return this;
	}
	buildQuickKey(key,id){
		$(document).keydown(function(event){
			if(event.target.nodeName!=='INPUT'&&key.indexOf(event.key)!=-1){
				if(!$('#'+id).prop('disabled')){
					$('#'+id).click();
				}
			}
		});
		return this;
	}
};