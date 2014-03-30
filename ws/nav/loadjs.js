/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */
 
//var _path = require("path");
module.exports = {	
	auto_webHelper : null,
	auto_appContext : null,
	cache_data : {},
	isDebug : true,
	postConstruct : function(){
 		var $this = this;
		$this.auto_webHelper.scanProcess({
			'./static/js/core' :{}
		},'.js',function(filePath,obj){
		
			//var	id =_path.basename(filePath).replace('.js','');	
			
			$this.cache_data[filePath.replace('./','/')] = 1;
		});
	},	
	'get:/loadjs':{
  		controller : function(){			
			if(this.isDebug){				
				this.postConstruct();
			}			
			return this.cache_data;			
 		}
	} 
};
