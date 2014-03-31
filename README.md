springnodejsExample
============
如果觉得还行，请我喝瓶水
[![Gittip](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](http://me.alipay.com/solq)



作者 : solq

blog : 
* http://www.cnblogs.com/solq/p/3574640.html
* http://www.jiaotuhao.com/
* http://www.springnodejs.com/
* http://example.springnodejs.com/

git : https://github.com/solq360/springnodejs
	https://github.com/solq360/springnodejsExample.git

QQ群:9547527


先来介绍框架文件
/core/AppContext.js
============
整个框架最核心的，所有的容器都经过 AppContext 扫描注册，而扫描配置，在/config/Appconfig.js 文件里
为什么分这么多目录呢，这根据不同的领域进行划分，以目录的形式进行区分管理，以后可能会介绍面向领域设计
现在大家只需要知道，开发一个业务，需要 config 资源，还有提供外部访问的服务类/控制类，最后给外部访问的公开类.三样

/config/Appconfig.js

* ./core 是框架的核心，一般不用写代码在这里
* ./config 配置资源
* ./module 业务模块
* ./ws	对外公开访问  webservice 

```
var appConfig={ 
	/**auto scan config**/	
	scan :{
		'./core' : {
			injectionType : 'core'
		},
		'./config' : {
			injectionType : 'config'
		},
		'./module' : {
			injectionType : 'service'
		},
		'./ws' : {
			filter : '\\ws', //url 服务 过滤器
			injectionType : 'controller',
			//include : [],
			exclude : ['./ws/test/test1.js']
		}
	} 
};
```

app.js 很简单，就一个入口
```
var appContext = require("./core/AppContext.js");

appContext.runServer();

var httpServer = appContext.findContainer("httpServer");
httpServer.runServer();
```

* appContext.runServer 方法包括，文件扫描/注册,自动依赖注入,初化容器阶段
* appContext.findContainer(id) 通过ID就可以查找容器，ID以文件名注册

/core/HttpServer.js
内部已经做好一个 REST 的 HttpServer 应用
只要执行 就可以工作
如果你想加 socket 通信的话，是不是很简单？

接下来可以做什么呢？
我们先要熟悉IOC自动注入。
首先在 ./module/account/service/AccountService.js 建个JS文件

```
module.exports = {	
 	user : 'solq',
	postConstruct : function(){
		console.log('account service postConstruct');
 	},
	preDestroy  : function(){
		console.log('account service preDestroy');
	}
};
```

* 建好后运行一下 node app.js 看看
* 然后在控制台 输入 close_server 看看
* 容器初始化的时候会执行 postConstruct 方法
* 服务器关闭时会执行 preDestroy 方法
* 顺便说下控制台命令在 ./core/console.js

接下来，AccountService.js 在其它地方怎么找到用上啊??

 ./module/test/service/TestService.js 我们再来建一个JS
```
module.exports = {	
 	auto_accountService : null,
	postConstruct : function(){
		console.log('testService  postConstruct');
		console.log('auto_accountService',this.auto_accountService.user);
 	}
};
```

再运行一下 node app.js 看看
是不是自动注入你写的服务了?
auto_(容器ID) 就可以注入

写起来真累，先写在这里大家反复练习一下，然后总结一下这样做有什么好处


 
如果觉得还行，请我喝瓶水
[![Gittip](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](http://me.alipay.com/solq)