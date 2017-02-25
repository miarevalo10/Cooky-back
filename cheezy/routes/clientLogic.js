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
var existeEsteNickName = function(nickName)
{
	string = nickName.trim();
	if (string.indexOf(',') > -1  || string.indexOf(';') > -1 || string.indexOf(':') > -1 ||
	    string.indexOf('{') > -1 ||string.indexOf(' ') > -1 ){
    // letras peligrosas
       return "You cant use any of these simbols : , { ";
	}
	return baseDatos.existsClientNickName(string);
}

var crearCliente = function (newClient)
{
	var nickName = newClient.nickName;
	var existeNickName = existeEsteNickName(nickName);
	var agrego = false;

	//verificar todos datos cliente

	if(existeNickName)
	{
		return false;
	}
	else
	{
		console.log('no existe');
		agrego = baseDatos.createClient(newClient);
	}
	return agrego;

}

module.exports = {
	existsClientNickName : existeEsteNickName, //done
	createClient: crearCliente,					//done
	/**getClient: traerCliente,
	updateClient: modificarCliente,
	deleteClient: borrarCliente*/
};