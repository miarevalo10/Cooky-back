var baseDatos = require('./baseDatos.js');

/*
	Metodos que ofrece la bd para client logic
	createClient.
	getClient
	updateClient
	deleteClient
	existsClientNickName
	
	clients=
	{
		"id":#,
		"name": x,
		"description":y,
		"picture":p
	}

*/
var existeEsteNickName = function(nickName, funcionCallbackParaAgregarCliente)
{
	string = nickName.trim();
	if (string.indexOf(',') > -1  || string.indexOf(';') > -1 || string.indexOf(':') > -1 ||
	    string.indexOf('{') > -1 ||string.indexOf(' ') > -1 ){
    // letras peligrosas
       funcionCallbackParaAgregarCliente("You cant use any of these simbols : , {  nor space");
	}
	baseDatos.existsClientNickName(string, funcionCallbackParaAgregarCliente);
}

var crearCliente = function (newClient, funcionCallbackResponse)
{
	var nickName = newClient.nickName;
	existeEsteNickName(nickName, function(existeNickName){
			//verificar todos datos cliente, se hace sincronico cuando este retorne
		if(existeNickName)
		{
			//ya existe entonces no se crea
			funcionCallbackResponse(false);
		}
		else
		{
			console.log('no existe');
			baseDatos.createClient(newClient);
			funcionCallbackResponse(true);//ya se verifico que si existe el nickname entonces puede retornar ya
			
		}
	});
}

var traerCliente = function (client, funcionCallbackResponse)
{
	var nickName = client.nickName;
	var password = client.password;

	if(nickname === undefined || password === undefined)
	{
		funcionCallbackResponse(null);
	}
	console.log('datos definidos... buscando cliente... ');
	baseDatos.getClient(client, funcionCallbackResponse);
	
}

module.exports = {
	existsClientNickName : existeEsteNickName, //done
	createClient: crearCliente,					//done
	getClient: traerCliente,
	/**updateClient: modificarCliente,
	deleteClient: borrarCliente*/
};