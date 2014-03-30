/**
 * @author solq
 * @deprecated blog: cnblogs.com/solq
 * */
var appConfig={
	author: 'solq',
	 
	/**debug config**/
	LOGDEBUG : 1,
	LOGINFO : 2,
	LOGERROR : 4,
	LOGLEVEL : (1 | 4),
 
	webServiceFilters : ['\\ws'],
	staticFileFilters : ['\\static'],
	/**auto scan config**/	
	scan :{
		'./core' : {
			injectionType : 'core'
		}
	} 
};
 