var pathname = window.location.pathname;

$(function(){
	if(pathname.match('aluno')) {
	
		// Masked Inputs config
		$('#nascimento').mask("99/99/9999");
		$('#diaVencimento').mask("99");
		$('#cep').mask("99999-999");
		$('#telefone').mask("(999) 9999-9999");
		$('#celular').mask("(999) 9999-9999");
		$('#conjugueCel').mask("(999) 9999-9999");
		$('#paiCel').mask("(999) 9999-9999");
		$('#maeCel').mask("(999) 9999-9999");
		
		// Show/Hide

    //para o carregamento inicial
			if($('#estadoCivil').val() == 'casado') {
				$('.control-group.conjuge').show('fast');
				$('.control-group.parents').hide('fast');
				$('#contato .mensagem').hide('fast');
			}
			else if($('#estadoCivil').val() == 'solteiro') {
				$('.control-group.parents').show('fast');
				$('.control-group.conjuge').hide('fast');
				$('#contato .mensagem').hide('fast');
			}
			else {
				$('#contato .mensagem').show('fast');
				$('.control-group.parents').hide('fast');
				$('.control-group.conjuge').hide('fast');
			}

    //para o change em Estado Civil
		$('#estadoCivil').on('change', function() {
			if($('#estadoCivil').val() == 'casado') {
				$('.control-group.conjuge').show('fast');
				$('.control-group.parents').hide('fast');
				$('#contato .mensagem').hide('fast');
			}
			else if($('#estadoCivil').val() == 'solteiro') {
				$('.control-group.parents').show('fast');
				$('.control-group.conjuge').hide('fast');
				$('#contato .mensagem').hide('fast');
			}
			else {
				$('#contato .mensagem').show('fast');
				$('.control-group.parents').hide('fast');
				$('.control-group.conjuge').hide('fast');
			}
		});

		// Save button
		$('#save.aluno').on('click', function(){
			$.post("/aluno/save", $("#alunoForm").serialize(), function(data) {
				  document.location.href='/aluno/lista';
			});
		});	
	}
});
