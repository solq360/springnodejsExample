/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */
var appConfig={
	author: 'solq',
	/**db config**/
	dbHost : '127.0.0.1',
	dbPort : 9977 , 
	dbUser : '',
	dbPasssWord : '',
	
	/**debug config**/
	LOGDEBUG : 1,
	LOGINFO : 2,
	LOGERROR : 4,
	LOGLEVEL : (1 | 4),
	
	/**web config**/
	projectName : 'REST',
	version : '0.01',
	webPort : 8888,
	
	/**web config**/	
	startCacheStatic : true,
	/**controller filter config**/	
	welcomeFilters : ['\\','\\index.html','\\login.html'],
	webServiceFilters : ['\\ws'],
	staticFileFilters : ['\\static'],
	/**auto scan config**/	
	scan :{
		'./core' : {
			injectionType : 'core'
		},
		'./config' : {
			injectionType : 'config'
		},
		'./aop' : {
			injectionType : 'aop'
		},
		'./module' : {
			injectionType : 'service'
		},
		'./ws' : {
			filter : '\\ws', //url 服务 过滤器
			injectionType : 'controller',
			//include : [],
			exclude : ['./ws/test/test1.js']
		},
		/*'./api' : {
			filter : '\\api', //url 服务 过滤器
			injectionType : 'controller'
		}*/
	} 
};

module.exports  = appConfig;