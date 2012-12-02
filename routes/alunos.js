//DATABASE
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.list = function(req, res, next){
	var alunos = nStore.new('data/alunos.db', function () {
		alunos.all(function (err, results) {
			res.render('alunos/index', { title: 'Alunos', alunos: results });
		});
	});
};

exports.form = function(req, res, next){
	var data = {
			'id' : '',
			'nome' : '',
			'endereco' : ''
			};
    res.render('alunos/form', { title : 'Novo', aluno: data });
};

exports.save = function(req, res, next){
	var alunos = nStore.new('data/alunos.db', function () {
		if(req.body.id == '') {
			var d = new Date();
			req.body.id = d.getDate() + '' + d.getMonth() + '' + d.getFullYear() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();
			delete d;
		}
		var data = {
					'id' : req.body.id,
					'nome' : req.body.nome,
					'endereco' : req.body.endereco 
					};
		alunos.save(req.body.id, data, function (err, key) {
			if (err) { throw err; }
			res.json({"OK":"Aluno criado com sucesso"});
		});
	});
};

exports.edit = function(req, res, next){
  	var alunos = nStore.new('data/alunos.db', function () {
		alunos.get(req.params.id, function (err, doc, key) {
			if (err) { throw err; }
			res.render('alunos/form', { title: 'Editando', aluno: doc });
		});
	});
};

exports.del = function(req, res, next){
  	var alunos = nStore.new('data/alunos.db', function () {
		alunos.remove(req.params.id, function (err) {
			if (err) { throw err; }
			res.redirect('/aluno/lista');
		});
	});
};