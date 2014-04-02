/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */ 
module.exports = {
	'/test/cookie':{
  		controller : function(cookie){
  			cookie.set("key1","value1");	
  			cookie.set("key2","value1");
  			cookie.remove("key1");
  			console.log("cookie key1 value : ",cookie.get("key1"));			 		
  			console.log("cookies : ",cookie.valueOf());			 		
			return cookie;			
 		}
	},
	'/test/cookie2':{
		controller : function(cookie){
			cookie.set("key1","value1"/*,{ domain : '',path :'',expires:'',httpOnly:true,secure }*/);	
			return cookie;			
		}
	}
};
