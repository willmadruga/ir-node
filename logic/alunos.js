//MODEL
var model = {
	'id' : '',
	'matricula' : '',
	'nome' : '',
	'nascimento' : '',
	'mesNascimento' : '',
	'endereco' : '',
	'bairro' : '',
	'cep' : '',
	'telefone' : '',
	'celular' : '',
	'email' : '',
	'profissao' : '',
	'estadoCivil' : '',
	'conjugeNome' : '',
	'conjugeCel' : '',
	'paiNome' : '',
	'paiCel' : '',
	'maeNome' : '',
	'maeCel' : '',
	'problSaude' : '',
	'alergia' : '',
	'fratura' : '',
	'medicacao' : '',
	'outraArteMarcial' : '',
	'graduacaoOutra' : '',
	'indicacao' : '',
	'diaVencimento' : '',
	'plano' : '',
	'modalidades' : ''
};

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
	var Aluno = Object.create(model);
    res.render('alunos/form', { title : 'Novo', aluno: Aluno });
};

exports.save = function(req, res, next){
	var alunos = nStore.new('data/alunos.db', function () {
		var Aluno = preencheAluno(req.body);
		alunos.save(Aluno.id, Aluno, function (err, key) {
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

exports.niver = function(req, res, next){
	var alunos = nStore.new('data/alunos.db', function () {
    //TODO descobrir o motivo e ajustar
    //somando 1 ao resultado de getMonth() porque esta trazendo o mes anterior, nao sei porque.
    //estou em dezembro no momento e ele teima em trazer novembro.
    var d = new Date().getMonth()+1;
		alunos.find({mesNascimento: d.toString()}, function (err, results) {
			res.render('alunos/niver', { title: 'Aniversariantes do Mes', alunos: results });
		});
	});
};

function preencheAluno(data) {
	if(data.id == '') {
		var d = new Date();
    //TODO descobrir o motivo e ajustar
    //somando 1 ao resultado de getMonth() porque esta trazendo o mes anterior, nao sei porque.
    //estou em dezembro no momento e ele teima em trazer novembro.
		data.id = d.getDate() + '' + d.getMonth()+1 + '' + d.getFullYear() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();
    data.matricula = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
		delete d;
	}

	var Aluno = Object.create(model);
		Aluno.id = data.id;
		Aluno.matricula = data.matricula;
		Aluno.nome = data.nome;
		Aluno.nascimento = data.nascimento;
		Aluno.mesNascimento = data.nascimento.split('/')[1];
		Aluno.endereco = data.endereco;
		Aluno.bairro = data.bairro;
		Aluno.cep = data.cep;
		Aluno.telefone = data.telefone;
		Aluno.celular = data.celular;
		Aluno.email = data.email;
		Aluno.profissao = data.profissao;
		Aluno.estadoCivil = data.estadoCivil;
		Aluno.conjugeNome = data.conjugeNome;
		Aluno.conjugeCel = data.conjugeCel;
		Aluno.paiNome = data.paiNome;
		Aluno.paiCel = data.paiCel;
		Aluno.maeNome = data.maeNome;
		Aluno.maeCel = data.maeCel;
		Aluno.problSaude = data.problSaude;
		Aluno.alergia = data.alergia;
		Aluno.fratura = data.fratura;
		Aluno.medicacao = data.medicacao;
		Aluno.outraArteMarcial = data.outraArteMarcial;
		Aluno.graduacaoOutra = data.graduacaoOutra;
		Aluno.indicacao = data.indicacao;
		Aluno.diaVencimento = data.diaVencimento;
		Aluno.plano = data.plano;
		Aluno.modalidades = data.modalidades;
		return Aluno;
}
