var models=require('../models/models.js');

exports.load=function(req,res,next,quizId){
	
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				
				next();
			}else{
				next(new Error("No existe quizID=" + quizId));
			}
		}
	).catch(function(error){ 
		next(error);
	});
};

exports.index=function(req,res){
	filtro={};

	if(typeof req.query.search!=="undefined"){
		busca="%"+req.query.search.replace(/\s/gi,'%')+"%";
		filtro={where: ["pregunta like ?",busca]};
	}
	models.Quiz.findAll(filtro).then(function(quizes){
	res.render('quizes/index.ejs',{quizes:quizes});
		
	})
	
};

exports.show=function(req,res){
		res.render('quizes/show',{quiz: req.quiz});
	
	};

exports.answer=function(req,res){
	var resultado='Incorrecto';
	if(req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto';
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado}); 
};
