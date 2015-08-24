var models=require('../models/models.js');



exports.show=function(req,res){
	preparaResultados(req,res);

}

function muestraResultado(req,res,resultado){
	res.render('quizes/statistics.ejs',{resultado:resultado,errors: []});
}

function preparaResultados(req,res){
	var resultado={preguntas: 0,
			comentariosTotales: 0,
			preguntasConComentarios: 0,
			mediaComentarios: 0};
	models.Quiz.count().then(
 		function(count){
			resultado.preguntas=count;
			models.Comment.count().then(
		function(count){
			resultado.comentariosTotales=count;
			resultado.mediaComentarios=resultado.comentariosTotales/resultado.preguntas;
			muestraResultado(req,res,resultado);
		});	
		});
	};

