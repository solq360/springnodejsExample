/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */ 
module.exports = {
	'get:/test':{
  		controller : function(){				 		
			return {'key':'hello rest'};			
 		}
	} ,
	'/test/{path1}/{path2}':{
  		controller : function(path_path1,path_path2,param_array_p1,param_int_p2,body_body){				 		
			
  			console.log("path_p1 = " , path_path1);
  			console.log("path_p2 = " , path_path2);
  			console.log("param_array_p1 = " , param_array_p1);
  			
  			console.log("param_int_p2 = " , param_int_p2);
  			console.log("body_body = " , body_body);
  			return body_body;			
 		}
	} 
};
