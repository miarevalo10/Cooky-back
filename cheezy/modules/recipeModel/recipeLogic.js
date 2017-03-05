"use strict";
var baseDatosCliente = require('../clientModel/baseDatosCollectionClients.js');
var baseDatosRecipe = require('./baseDatosCollectionRecipe.js');

/*
	Metodos que ofrece la bd para client logic
  createRecipe: crearReceta,
  getRecipeByType: traerRecetaPorTipo,
  getRecipeByUser: traerRecetaPorUsuario,
  likeRecipe: likeAReceta
*/

var crearReceta = function (nickname,password, folder, receta, callback)
{
	baseDatosCliente.getClient(nickname,password, function(cliente){
		//el nickname y el password autentican que si es un cliente original
		if(cliente !== null)
		{
			baseDatosRecipe.verificarTituloReceta(nickname, receta.title, function(existeElTitulo){
				if(!existeElTitulo)
				{
					var recipe = {
					"nickName": nickname,"likesTotal":0,"carpetas": [{"folder":folder,"recetasDelFolder":[receta]}]};

					baseDatosRecipe.createRecipe(recipe);
					callback("OK");
				}
				else
				{
					callback("NO");
				}
			});
		}
		else
		{
			callback("NO");
		}
	});
}


var like = function (clientNickname, titulo)
{
	baseDatosRecipe.likeRecipe(clientNickname, titulo);
}


var mejoresRecetasTipo1=[];
var mejoresRecetasTipo2=[];
var mejoresRecetasTipo3=[];

var getRecipeByTypeSetListas = function ()
{
	console.log("\n recuperando listas de mejores tipos");
	baseDatosRecipe.getRecipeByType(1, 0, function(lista){
		mejoresRecetasTipo1= lista;
		console.log("\n lista 1 ");
		console.log("\n "+ mejoresRecetasTipo1);
	});
	baseDatosRecipe.getRecipeByType(2, 0, function(lista){
		mejoresRecetasTipo2= lista;
		console.log("\n lista 2 ");
		console.log("\n "+ mejoresRecetasTipo2);
	});
	baseDatosRecipe.getRecipeByType(3, 0, function(lista){
		mejoresRecetasTipo3= lista;
		console.log("\n lista 3 ");
		console.log("\n "+ mejoresRecetasTipo3);
	});
}
getRecipeByTypeSetListas();

function recetaPorTipo(tipo)
{
	if(tipo===1)
	{
		return mejoresRecetasTipo1;
	}
	//el else no es necesario pero por si acaso
	else if(tipo===2)
	{
		return mejoresRecetasTipo2;
	}
	else if(tipo===3)
	{
		return mejoresRecetasTipo3;
	}
}


var borrarReceta = function (receta, funcionCallbackResponse)
{
	baseDatosCliente.getClient(receta.nickName,receta.password, function(cliente){
		//el nickname y el password autentican que si es un cliente original
		if(cliente !== null)
		{
			baseDatosRecipe.verificarTituloReceta(receta.nickName, receta.title, function(existeElTitulo){
				if(existeElTitulo)
				{
					baseDatosRecipe.deleteRecipe(receta);
					funcionCallbackResponse(true);
				}
				else
				{
					funcionCallbackResponse(false);
				}
			});
		}
		else
		{
			funcionCallbackResponse(false);
		}
	});
}


module.exports = {
  createRecipe: crearReceta,
  getRecipeByType: recetaPorTipo,
  /**getRecipeByUser: traerRecetaPorUsuario,*/
  deleteRecipe:borrarReceta,
  likeRecipe: like
};