var pathname = window.location.pathname;

$(function(){
	if(pathname.match('aluno')) {
	
		// Masked Inputs config
		$('#nascimento').mask("99/99/9999");
	
		// Save button
		$('#save.aluno').on('click', function(){
			$.post("/aluno/save", $("#alunoForm").serialize(), function(data) {
				  document.location.href='/aluno/lista';
			});
		});	
	}
});