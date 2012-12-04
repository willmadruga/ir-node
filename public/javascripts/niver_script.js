var pathname = window.location.pathname;

$(function(){
	if(pathname.match('aniversariantes')) {
    // colorindo a linha do aniversariante de hoje
    var hj = getHoje();    
    var niverTD = $('td.nasc');
    $.each(niverTD, function(index, value) { 
      var dia = $(value).html().split('/')[0];
      if(dia.match(hj)) {
        $(value).parent('tr').addClass('success');
      }
    });
	}
});

function getHoje() {
	  var dia = new Date();
    dia = dia.getDate();
    if(dia<10)
      dia = '0' + dia
  return dia;
}
