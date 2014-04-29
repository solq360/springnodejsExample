var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port		: 8585,
  database :'test',
  user     : 'root', 
  password : 'kwgkwg'
});
connection.connect();

/*
connection.query('SELECT * FROM test', function(err, rows, fields) {
  if (err) throw err;
	for(var i in rows){
		
	}
  console.log('value ', rows);
});

connection.query('SELECT * FROM test', function(err, rows, fields) {
  if (err) throw err;
	for(var i in rows){
		
	}
  console.log('value 2', rows);
});

connection.query('SELECT * FROM test2', function(err, rows, fields) {
  if (err) throw err;
	for(var i in rows){
		
	}
  console.log('value 3', rows);
});

connection.query('SELECT * FROM test2', function(err, rows, fields) {
  if (err) throw err;
	for(var i in rows){
		
	}
  console.log('value 4', rows);
});


var sql = "SELECT * FROM ?? ";
var params = ['test2']; 
connection.query(sql, params,function(err, results) {
  
  console.log('value ===', results);
});


var sql = "SELECT * FROM test2 where id=500";
var params = []; 
connection.query(sql, params,function(err, results) {
  
  console.log('value 22222222===', results);
});


var sql = "REPLACE INTO ?? SET ? ";

var post  = {id: 15, body: 'Hello MySQL'};
var query = connection.query(sql, ['test2',post], function(err, result) {
  console.log("result = ",result);
});

*/

//test obj
 
var obj1 ={
	id : '3',
	a : 'a',
	b : 'b'
};

var obj2 ={
	id : '2',
	a : 'a',
	b : 'b'
};

var entity ={
	getId : function(){
		this.id++;
		console.log(this.id);
	}
};

for(var fn in entity){
	obj1[fn] = entity[fn];
	obj2[fn] = entity[fn];
}

obj1.getId();
obj2.getId();

var result1 = [];
var isresult =false;
connection.query("SELECT * FROM test2",[], function(err, result) {
	isresult = true;
	result1 = result;
	console.log("result = ",result);
});
while (!isresult) {
	sleep(500);
}
		
console.log("result1 ==== ",result1);
connection.end();

function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
}
/*
var pool = mysql.createPool({
  host     : 'localhost',
  port		: 8585,
  user     : 'root', 
  database :'test',
  password : 'kwgkwg'
});

pool.on('connection', function(connection) {
   console.log(" connection : ",connection);
  
});
pool.getConnection(function(err, connection) {
	 if (err){
	   console.log(" err : ",err);
	   return;
	 } 
  console.log(" connection : ",connection);
});

pool.end();

*/