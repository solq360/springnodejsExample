(function(){
	AppContext.runServer();
	
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : '/ws/test',
		success : function(json){
			alert(json.key);
		}
	});
	var post_data = {p1:'xxx',p2:'555'};
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : '/ws/test/a/b',
		data : post_data,
		success : function(json){
			console.log(json);
		}
	});
	
})();