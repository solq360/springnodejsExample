/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */
 
var debug = function(){
	//(appConfig.LOGDEBUG & appConfig.LOGLEVEL) &&
	console.log.apply(console, arguments);		
}
var _error = function(){
	//(appConfig.LOGERROR & appConfig.LOGLEVEL) &&
	console.error.apply(console, arguments);
} 
	
var  AppContext={
	_isStart : false,
	runServer : function(){
	
		if(this._isStart) return;
		this._isStart = true;	
		//IOC 控制流程
		//1.scan 
		//2.auto  injection field
		//3.init run

		debug( "start injection : =============================================");
		_scan();
		debug( "end injection : =========================================");
		debug( "=========================================");
		debug( "=========================================");

		debug( "start injection field : =============================================");
		_auto_injection_field();
		debug( "end injection field : =============================================");

		debug( "=========================================");
		debug( "=========================================");

		//init run
		debug( "start init : =============================================");
		_init();
		debug( "end init : =============================================");		
 
	},
	findContainer : function(key){
		key = this.getKey(key);
		return this.data[key];
	},
	addContainer : function(id,container){
		id = this.getKey(id);
		container.id= id;
		if(this.data[id]!=null ){
			_error(" injection key is has : " ,id);
			return;
		}
		this.data[id] = container;
	},
	getKey : function(key){
		key = key.trim();
		key = key[0].toLowerCase() + key.substring(1,key.length);
		return key;
	},
	data : {}
};
 
 //处理功能方法
var _injection = function(container){
	var id = container.id;
 	AppContext.addContainer(id,container); 	
	return container;
}

var _scan = function(){
	$.ajax({
		type: "get",
		url: "/ws/loadjs",
		dataType : 'json',
		success : function(json){
			for(var i in json){
				debug(i);
				var id = json[id];
				if(id == 'appContext'){
					continue;
				}
				
				requirejs(i,function(a,b,c){
					
					debug(a,b,c);
				});
			}			
		}
	})
	 
	//	var id=_injection(filePath,container).id;
	//	debug( "injection : ",id, filePath);
}

var _auto_injection_field = function(){
	for(var id in AppContext.data){

		var container = AppContext.findContainer(id);
		
		for(var field in container){
			if(field.indexOf('auto_')==0){
			
				var checkFn = container[field];
				if(typeof checkFn == 'function'){
					continue;
				}
				var injectionKey = field.replace('auto_','');
				
				if(AppContext.findContainer(injectionKey)==null){
					_error('injection field not find id : ',field, id );
				}else{
					container[field] = AppContext.findContainer(injectionKey);				
					debug("injection field : ",injectionKey,id )
				}			
			}			
		}		
	}
}

var _init = function(){
	//为什么分三个初始化阶段呢	
	//postConstruct 为应用层初始化，如果做服务层扩展的话，就要在应用层初始化之前准备工作，这下明了吧
	for(var id in AppContext.data){
		var container =AppContext.findContainer(id);
		container.awake!=null && container.awake(AppContext);
	}
	
	for(var id in AppContext.data){
		var container = AppContext.findContainer(id);
		container.start!=null && container.start(AppContext);
	}
	
	for(var id in AppContext.data){
		var container = AppContext.findContainer(id);
		container.postConstruct!=null && container.postConstruct(AppContext);
	}
}

var _reload = function(){
	for(var id in AppContext.data){
		var container = AppContext.findContainer(id);
		container.reload!=null && container.reload(AppContext);
	}
}

var _end = function(){
	for(var id in AppContext.data){
		var container = AppContext.findContainer(id);
		container.preDestroy!=null && container.preDestroy(AppContext);	 
	}
}