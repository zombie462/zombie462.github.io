/* DIRECTIONS */

const NORTH=0,WEST=1,SOUTH=2,EAST=3;
const FRONT=0,LEFT=1,BACK=2,RIGHT=3;

function dirAdd(oldDir,delta){
	return (oldDir+delta)%4;
}

function dirSub(oldDir,newDir){
	return (newDir-oldDir+4)%4;
}

function dirRev(dir){
	return (dir+2)%4;
}

function randomDir(RNG){
	return Math.floor(RNG()*4);
}

const DIRS={
	[NORTH]:{x:-1,y:0},
	[WEST]:{x:0,y:-1},
	[SOUTH]:{x:1,y:0},
	[EAST]:{x:0,y:1},
};

function posAdd(a,b){
	return {x:a.x+b.x,y:a.y+b.y};
}

/* SOMETHING */

function NOOP(){/* Does nothing */}

/* DAMAGE */

const DAMAGE_REASON_UNKNOWN='damage_unknown';
const DAMAGE_REASON_HIT_HARD='damage_hit_hard';
const DAMAGE_REASON_ATTACK_HARD='damage_attack_hard';
const DAMAGE_REASON_LAVA='damage_lava';
const DAMAGE_REASON_THORNS='damage_thorns';
const DAMAGE_REASON_ATTACK='damage_attack';

const DAMAGE_DIR_FOOT='foot';
const DAMAGE_DIR_HAND='hand';

const DDRef={
	[DAMAGE_REASON_UNKNOWN]:'death_unknown',
	[DAMAGE_REASON_HIT_HARD]:'death_hit_hard',
	[DAMAGE_REASON_ATTACK_HARD]:'death_attack_hard',
	[DAMAGE_REASON_LAVA]:'death_lava',
	[DAMAGE_REASON_THORNS]:'death_thorns',
	[DAMAGE_REASON_ATTACK]:'death_attack',
};

class Damage{
	constructor(value,reason,dir,damager){
		this.value=value;
		this.damager=damager;
		this.dir=dir;
		this.reason=reason;
	}
};

/* HARDNESS */
const NONE='NONE';
const SOFT='soft';
const HARD='hard';

/* BLOCKS */
const AIR='air';
const BARRIER='barrier';
const GRASS='grass';
const TREE='tree';
const ICE='ice';
const GOLD_BLOCK='gold_block';
const PLAYER='player';
const GIRL='girl';

const BLOCK_ABBR={
	[AIR]:{
		touchFeeling(grid,dir){return NONE;},
		nameString(grid){return AIR;},
	},
	[GRASS]:{
		touchFeeling(grid,dir){return SOFT;},
		nameString(grid){return GRASS;},
	},
	[TREE]:{
		touchFeeling(grid,dir){return HARD;},
		nameString(grid){return TREE;},
	},
	[BARRIER]:{
		touchFeeling(grid,dir){return HARD;},
		nameString(grid){return BARRIER;},
	},
	[ICE]:{
		constructor(){
			this.health=1;
		},
		getTemperature(grid,pos){return -1;},
		touchFeeling(grid,dir){return HARD;},
		nameString(grid){return ICE;},
	},
	[GOLD_BLOCK]:{
		constructor(){
			this.health=1;
		},
		touchFeeling(grid,dir){return HARD;},
		nameString(grid){return GOLD_BLOCK;},
		destroy(grid,damage){
			grid.ground.coin+=3;
		}
	},
	[GIRL]:{
		constructor(){
			this.health=1;
			this.dir=SOUTH;
		},
		getTemperature(grid,pos){return 1;},
		touchFeeling(grid,dir){return SOFT;},
		nameString(grid){return GIRL;},
		afterTouch(grid,dir){
			this.turnBlock(grid,dirSub(grid.block.dir,dir));
			this.blockAttack(grid);
		}
	},
	[PLAYER]:{
		constructor(){
			this.health=5;
			this.coin=0;
			this.dir=SOUTH;
		},
		getTemperature(grid,pos){return pos.x===grid.pos.x&&pos.y===grid.pos.y?0:1;},
		touchFeeling(grid,dir){return SOFT;},
		nameString(grid){return grid.block.name;},
		onMessage(grid,msg){
			this.handler(grid.block.name,msg);
		},
		getState(grid){
			var block=grid.block;
			return {
				name:block.name,
				health:block.health,
				coin:block.coin
			}
		},
		stateChange(grid){
			this.blockAbbr(grid,'onMessage',{format:'player_state',data:this.blockAbbr(grid,'getState')});
		},
		receiveDamage(grid,damage){
			var dir=damage.dir;
			if(typeof dir==='number'){
				dir=['front','right','back','left'][dirSub(dir,grid.block.dir)];
			}
			this.blockAbbr(grid,'onMessage',{format:damage.reason,data:{
				value:damage.value,
				dir:{format:dir}
			}});
			return true;
		},
		destroy(grid,damage){
			var count=grid.block.coin;
			this.say({format:DDRef[damage.reason],data:{death:grid.block.name,damager:{format:damage.damager}}});
			if(count>0){
				grid.block.coin-=count;
				if(this.groundAbbr(grid,'doDestroyCoin')){
					this.genCoin(count);
				}else{
					grid.ground.coin+=count;
				}
				this.blockAbbr(grid,'stateChange');
				this.handler(grid.block.name,{format:'drop_coin',data:{count}});
			}
		},
	},
};

class Block{
	constructor(type=AIR,data={}){
		this.type=type;
		var con=BLOCK_ABBR[type].constructor;
		if(con)con.call(this);
		for(var key in data){
			this[key]=data[key];
		}
	}
};

/* GROUNDS */
const NOTHING='NOTHING';
const SPAWNPOINT='spawnpoint';
const LAVA='lava';
const THORNS='thorns';
const FLAGSTONE='flagstone';

const GROUND_ABBR={
	[NOTHING]:{
	},
	[SPAWNPOINT]:{
		constructor(){
			this.dir=SOUTH;
		}
	},
	[LAVA]:{
		getTemperature(grid,pos){return 2;},
		onMove(grid){
			this.damage(grid,new Damage(6400,DAMAGE_REASON_LAVA,DAMAGE_DIR_FOOT,'lava'));
		},
		doDestroyCoin(grid){return true;},
	},
	[THORNS]:{
		onTouch(grid){
			this.damage(grid,new Damage(1,DAMAGE_REASON_THORNS,DAMAGE_DIR_HAND,'thorns'));
		}
	},
	[FLAGSTONE]:{
		afterTouch(grid){
			this.blockAbbr(grid,'onMessage',{format:'mo_zzd'});
		}
	},
};

class Ground{
	constructor(type=NOTHING,data={}){
		this.type=type;
		var con=GROUND_ABBR[type].constructor;
		if(con)con.call(this);
		this.coin=0;
		for(var key in data){
			this[key]=data[key];
		}
	}
};

/* GRID */
class Grid{
	constructor(map,pos,block,ground){
		this.block=block?block:new Block();
		this.ground=ground?ground:new Ground();
		this.map=map;
		this.pos=pos;
	}
};

/* MAP */
const DEFAULT_MAP_SIZE=10;

const MAP_STYLE_NONE='map_none';
const MAP_STYLE_DEBUG='map_debug';
const MAP_STYLE_TUTORIAL='map_tutorial';
const MAP_STYLE_ARENA='map_arena';

const DEFAULT_MAP_STYLE=MAP_STYLE_TUTORIAL;

class Map{
	constructor(h=DEFAULT_MAP_SIZE,w=DEFAULT_MAP_SIZE,mapStyle=DEFAULT_MAP_STYLE){
		this.h=h;
		this.w=w;
		this.arr=new Array(h);
		for(var i=0;i<h;i++){
			this.arr[i]=new Array(w);
			for(var j=0;j<w;j++){
				this.arr[i][j]=new Grid(this,{x:i,y:j});
			}
		}
		this.build(mapStyle);
	}
	build(mapStyle){
		switch(mapStyle){
			case MAP_STYLE_NONE:{
				break;
			}
			case MAP_STYLE_DEBUG:{
				this.arr[0][0].ground=new Ground(LAVA);
				this.arr[0][1].ground=new Ground(THORNS);
				this.arr[0][1].ground.coin+=100;
				this.arr[0][2].block=new Block(GOLD_BLOCK);
				this.arr[1][0].block=new Block(GIRL);
				this.arr[1][1].ground=new Ground(SPAWNPOINT);
				this.arr[1][2].block=new Block(ICE);
				this.arr[2][0].block=new Block(GRASS);
				this.arr[2][1].ground=new Ground(FLAGSTONE);
				this.arr[2][2].block=new Block(TREE);
				break;
			}
			case MAP_STYLE_TUTORIAL:{
				const mapBlock=[
					'RRRRRRRRRR',
					'R.R...I..R',
					'R...T.R.GT',
					'RRR...R..R',
					'R..TRR...R',
					'RG.......T',
					'T..RTRT..R',
					'R....IT..T',
					'TOT...TT.R',
					'RRTTRTRTRR',
				];
				const mapGround=[
					'..........',
					'.S........',
					'..........',
					'..........',
					'......T...',
					'..........',
					'........L.',
					'..TT...LO.',
					'.....F..O.',
					'..........',
				];
				const goldCount=[
					'0000000000',
					'0001000000',
					'0000020100',
					'0000100010',
					'0300000000',
					'0000010000',
					'0000000500',
					'0100200000',
					'0001010000',
					'0000000000',
				];
				for(let x=0;x<this.h;x++){
					for(let y=0;y<this.w;y++){
						var grid=this.getGrid({x,y});
						grid.block=new Block({
							'.':AIR,
							'R':GRASS,
							'I':ICE,
							'O':GOLD_BLOCK,
							'G':GIRL,
							'T':TREE,
						}[mapBlock[x][y]]);
						grid.ground=new Ground({
							'.':NOTHING,
							'S':SPAWNPOINT,
							'L':LAVA,
							'T':THORNS,
							'F':FLAGSTONE,
						}[mapGround[x][y]],{
							coin:parseInt(goldCount[x][y],36)
						});
					}
				}
				break;
			}
			default:{
				break;
			}
		}
	}
	inBound({x,y}){
		return x>=0&&y>=0&&x<this.h&&y<this.w;
	}
	getGrid({x,y}){
		if(!this.inBound({x,y})){
			return new Grid(this,{x,y},new Block(BARRIER));
		}
		return this.arr[x][y];
	}
	filter(ifunc){
		var list=[];
		for(var line of this.arr){
			for(var grid of line){
				if(ifunc(grid)){
					list.push(grid);
				}
			}
		}
		return list;
	}
	choice(ifunc,vfunc=()=>0){
		var res;
		var value=-Infinity;
		var list=this.filter(ifunc);
		for(var grid of list){
			var sc=vfunc(grid);
			if(sc>value){
				res=grid;
				value=sc;
			}
		}
		return res;
	}
	locatePlayer(name){
		return this.choice(g=>g.block.type===PLAYER&&g.block.name===name);
	}
};

class Game{
	constructor(mapH,mapW,mapStyle){
		this.map=new Map(mapH,mapW,mapStyle);
	}
	setHandler(reponseHandler){
		this.handler=reponseHandler;
	}
	setRNG(RNG){
		this.random=RNG;
	}
	canSpawn(){
		return this.map.choice(
			g=>g.block.type===AIR&&g.ground.type!==LAVA
		)!==undefined;
	}
	spawnPlayer(name){
		var grid=this.map.choice(g=>g.block.type===AIR&&g.ground.type!==LAVA,g=>(
			this.random()+(x=>x?x:0)({[NOTHING]:0.2,[SPAWNPOINT]:Infinity}[g.ground.type])
		));
		grid.block=new Block(PLAYER,{
			name,
			dir:grid.ground.type==SPAWNPOINT&&grid.ground.dir?grid.ground.dir:randomDir(this.random),
		});
		this.handler(name,{format:'player_state',data:this.blockAbbr(grid,'getState')});
		return grid;
	}
	canJoin(name){
		var locate=this.map.locatePlayer(name);
		if(locate){
			return true;
		}
		return this.canSpawn();
	}
	join(name){
		var grid=this.map.locatePlayer(name);
		if(grid){
			this.handler(name,{format:'player_state',data:this.blockAbbr(grid,'getState')});
		}else{
			grid=this.spawnPlayer(name);
		}
		return {format:'join_success'};
	}
	blockAbbr(grid,abbrName,...args){
		var func=BLOCK_ABBR[grid.block.type][abbrName];
		if(!func){
			return undefined;
		}else{
			return func.call(this,grid,...args);
		}
	}
	groundAbbr(grid,abbrName,...args){
		var func=GROUND_ABBR[grid.ground.type][abbrName];
		if(!func){
			return undefined;
		}else{
			return func.call(this,grid,...args);
		}
	}
	say(msg){
		this.handler('',msg);
	}
	damage(grid,damage){
		var block=grid.block;
		if(typeof block.health!=='undefined'){
			this.blockAbbr(grid,'receiveDamage',damage);
			if(damage.value>0){
				block.health=Math.max(block.health-damage.value,0);
				this.blockAbbr(grid,'stateChange');
				if(block.health<=0){
					this.blockAbbr(grid,'destroy',damage);
					grid.block=new Block();
				}
			}
		}
	}
	moveBlock(grid,dir){
		if(grid.block.type===AIR){
			return false;
		}
		var newGrid=this.map.getGrid(posAdd(grid.pos,DIRS[dir]));
		if(newGrid.block.type===AIR){
			newGrid.block=grid.block;
			grid.block=new Block();
			this.blockAbbr(newGrid,'onMessage',{format:'go_successfully',data:{
				// dir:newGrid.block.dir===dir?'forward':'back'
				dir:{format:['forward','','back',''][dirSub(dir,newGrid.block.dir)]}
			}});
			this.groundAbbr(newGrid,'onMove');
		}else{
			var rev=dirRev(dir);
			this.blockAbbr(grid,'onMessage',{
				format:'go_failed',
				data:{hardness:{format:this.blockAbbr(newGrid,'touchFeeling',rev)}}});
			if(this.blockAbbr(newGrid,'touchFeeling',rev)==HARD){
				this.damage(grid,new Damage(1,DAMAGE_REASON_HIT_HARD,dir,this.blockAbbr(newGrid,'nameString')));
			}
			this.blockAbbr(newGrid,'onHit',rev);
		}
	}
	turnBlock(grid,dir){
		var block=grid.block;
		block.dir=dirAdd(block.dir,dir);
		this.blockAbbr(grid,'onMessage',{format:'turn_successfully',data:{
			dir:{format:['','left','','right'][dir]}
		}});
	}
	genCoin(count){
		while(count>0){
			var genCount=Math.ceil(Math.sqrt(count));
			var grid=this.map.choice(
				grid=>!this.groundAbbr(grid,'doDestroyCoin')
				&&grid.block.type===AIR,
				this.random
			);
			if(grid){
				grid.ground.coin+=genCount;
				count-=genCount;
			}else{
				return count;
			}
		}
		return 0;
	}
	blockAttack(grid){
		var dir=grid.block.dir;
		var newGrid=this.map.getGrid(posAdd(grid.pos,DIRS[dir]));
		var hardness=this.blockAbbr(newGrid,'touchFeeling',dirRev(dir));
		this.blockAbbr(grid,'onMessage',
			hardness===NONE?{
				format:'attack_result_none',
			}:{
				format:'attack_result_hardness',
				data:{hardness:{format:hardness}}
			}
		);
		if(hardness===HARD){
			this.damage(grid,new Damage(1,DAMAGE_REASON_ATTACK_HARD,dir,this.blockAbbr(newGrid,'nameString')));
		}
		var damage=new Damage(1,DAMAGE_REASON_ATTACK,dirRev(dir),this.blockAbbr(grid,'nameString'));
		this.damage(newGrid,damage);
		this.blockAbbr(newGrid,'afterAttack',damage);
	}
	action(name,action,data={}){
		var grid=this.map.locatePlayer(name);
		switch(action){
			case 'go_forward':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				this.moveBlock(grid,grid.block.dir);
				break;
			}
			case 'go_backward':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				this.moveBlock(grid,dirRev(grid.block.dir));
				break;
			}
			case 'turn_left':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				this.turnBlock(grid,1);
				break;
			}
			case 'turn_right':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				this.turnBlock(grid,3);
				break;
			}
			case 'touch_front':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				var dir=grid.block.dir;
				var newGrid=this.map.getGrid(posAdd(grid.pos,DIRS[dir]));
				var res=this.blockAbbr(newGrid,'touchFeeling',dirRev(dir));
				this.blockAbbr(newGrid,'onTouch',dirRev(dir));
				if(res!==NONE){
					this.blockAbbr(grid,'onMessage',{format:'touch_front_something',data:{
						hardness:{format:res}
					}});
				}else{
					this.blockAbbr(grid,'onMessage',{format:'touch_front_nothing'});
				}
				this.blockAbbr(newGrid,'afterTouch',dirRev(dir));
				break;
			}
			case 'touch_ground':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				this.groundAbbr(grid,'onTouch');
				if(grid.block.type!==PLAYER){
					return;
				}
				var pos=grid.pos;
				var temp=0;
				for(var dx=-1;dx<=1;dx++){
					for(var dy=-1;dy<=1;dy++){
						var newGrid=this.map.getGrid(posAdd(pos,{x:dx,y:dy}));
						temp+=this.blockAbbr(newGrid,'getTemperature',pos)||0;
						temp+=this.groundAbbr(newGrid,'getTemperature',pos)||0;
					}
				}
				var message={format:'temp_normal'};
				if(temp!==0){
					message.format='temp_feeling';
					var absTemp=Math.abs(temp);
					message.data={
						feeling:{
							format:
								absTemp<=5?[
									'BUG!',
									'feeling_a_bit',
									'feeling_none',
									'feeling_very',
									'feeling_very_very',
									'feeling_super'
								][absTemp]
								:'feeling_hell',
							data:{
								temp:{
									format:temp>0?'feeling_hot':'feeling_cold'
								}
							}
						}
					};
				}
				this.blockAbbr(grid,'onMessage',{format:'touch_ground_result',data:{feeling:message}});
				var count=grid.ground.coin;
				if(count>0){
					grid.ground.coin-=count;
					grid.block.coin+=count;
					this.blockAbbr(grid,'onMessage',{format:'collect_coin',data:{count}});
					this.blockAbbr(grid,'stateChange');
				}
				this.groundAbbr(grid,'afterTouch');
				break;
			}
			case 'attack':{
				if(!grid){
					this.handler(name,{format:'dead_player'});
					return;
				}
				this.blockAttack(grid);
				break;
			}
			case 'message':{
				if(data.message){
					this.say({format:'player_message',data:{player:name,message:data.message}});
				}else{
					this.handler(name,{format:'message_error',data:{reason:{format:'no_message'}}});
				}
				break;
			}
			case 'respawn':{
				if(grid){
					this.handler(name,{format:'respawn_failed',data:{reason:{format:'player_alive'}}});
				}else if(!this.canSpawn()){
					this.handler(name,{format:'respawn_failed',data:{reason:{format:'no_space'}}});
				}else{
					this.spawnPlayer(name);
					this.handler(name,{format:'respawn_success'});	
				}
				break;
			}
			default:{
				this.handler(name,{format:'send_test',data:{action,...{data}}});
				break;
			}
		}
	}
};

class Server{
	constructor(){
		this.uuid={};
		this.reponses={};
		var r=this.reponses;
		this.handler=function(name,reponse){
			if(name===''){
				for(var name in r){
					r[name].arr.push(reponse);
				}
			}else{
				r[name].arr.push(reponse);
			}
		};
		this.game=new Game();
		this.game.setHandler(this.handler);
		this.game.setRNG(Math.random);
	}
	receive(action,data={}){
		if(action==='join'){
			if(!data.name){
				return [{format:'join_error',data:{reason:{format:'no_name'}}}];
			}else if(typeof this.uuid[data.name]!=='undefined'&&(!data.uuid||this.uuid[data.name]!==data.uuid)){
				return [{format:'join_error',data:{reason:{format:'same_name'}}}];
			}else if(!this.game.canJoin(data.name)){
				return [{format:'join_error',data:{reason:{format:'no_space'}}}];
			}else{
				if(typeof this.uuid[data.name]==='undefined'){
					this.reponses[data.name]={
						arr:[],
						last:0
					};
				}
				var id=GUID();
				this.uuid[data.name]=id;
				this.handler(data.name,{format:'uuid_data',data:{uuid:id}});
				var res=this.game.join(data.name);
				this.handler(data.name,res);
			}
		}else{
			if(!data.name||!this.uuid[data.name]||!data.uuid||data.uuid!=this.uuid[data.name]){
				return [{format:'action_error',data:{reason:{format:'wrong_pair',data:{data:data}}}}];
			}
			this.game.action(data.name,action,data);
		}
		var rep=this.reponses[data.name];
		return rep.arr.slice(rep.last,rep.last=rep.arr.length);
	}
};