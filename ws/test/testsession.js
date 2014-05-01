/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */ 
module.exports = {
	auto_sessionManager : null,
	'/test/session':{
  		controller : function(cookie){
			try{
				var session = this.auto_sessionManager.createSession(555); 
				cookie.set(SessionKey.uuid , session.id );          
				return session;			
			}catch(e){}
  			
 		}
	},
	
	'/test/session/attr':{
        controller : function(request,cookie, session ){
			return session.getAttr(SessionKey.lastTime);
        }
    },
	
	'/test/run':{
        controller : function(){

        }
    }
};
