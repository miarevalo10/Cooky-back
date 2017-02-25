var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
// se ejecuta apenas se abre el servidor
var conectarBD = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

/**
The insert command returns an object with the following fields:

result Contains the result document from MongoDB
ops Contains the documents inserted with added _id fields
connection Contains the connection used to perform the insert
*/
var insertDocuments = function(objetoAAgregar,db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert( objetoAAgregar
  	, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted "+ result.ops +" documents into the collection");
    callback(result);
  });
}



  var agregarABD = function(objetoAAgregar){
  	var agregado =null;
  	if(objetoAAgregar !== null && objetoAAgregar !== undefined && objetoAAgregar !== NaN)
  	{
  		MongoClient.connect(url, function(err, db) {
			  insertDocuments(objetoAAgregar, db, function(resultado){
			  	console.log('este es el callback! resultado'+' ops el documento'+ JSON.stringify(resultado.ops));
			  	agregado = resultado;
			  	db.close();
			  });
		});
  	}
  	return agregado;

  }

  


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    //console.log(docs)
    callback(docs);
  });
}


  var leerDBD = function(){
  	var agregado =null;
  	
  		MongoClient.connect(url, function(err, db) {
			  findDocuments(db, function(docs){
			  	console.log('este es el callback! resultado '+ JSON.stringify(docs));
			  	agregado = docs;
			  	db.close();
			  });
		});
  	
  	return agregado;

  }

module.exports = {
	agregar: agregarABD,
	leerTodo: leerDBD


};