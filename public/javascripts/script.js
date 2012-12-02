var pathname = window.location.pathname;

$(function(){
	if(pathname.match('aluno')) {
		$('#save.aluno').on('click', function(){
			$.post("/aluno/save", $("#alunoForm").serialize(), function(data) {
				  document.location.href='/aluno/lista';
			});
		});	
	}
});