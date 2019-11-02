class Connector{
	constructor(){
		this.listeners=[];
		this.server=null;
	}
	connect(server){
		this.server=server;
	}
	listen(callback){
		this.listeners.push(callback);
	}
	send(action,data={}){
		var res;
		if(this.server instanceof Server){
			res=this.server.receive(action,data);
		}else{

		}
		if(!(res instanceof Array)){
			res=[res];
		}
		for(let callback of this.listeners){
			callback.call(this,res);
		}
	}
};