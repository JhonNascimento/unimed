$(document).ready(function() {
	
	$("#formLogin").submit(function (e){
		
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "http://clientes.unimedmanaus.com.br/controller/app/procLogin.php", 
			data: {
				acao: 'LoginWeb',
				cpf: $("#usuario").val(),
				senha: $("#senha").val()
			},            
			async: true,
			dataType: "json", 
			beforeSend: function() {
               $.mobile.loading( "show" );
			},
			success: function (json) {
				
				if(json.result == true){
					
				    $("#usuario_nome").html(json.dados.nome);
					
					//set cookie
				    $.cookie('sessao', $("#usuario").val()); 
					
					//redireciona o usuario para pagina
					$.mobile.changePage("#index", {
						transition : "slidefade",
						reloadPage:true
					});

				}else{
					$( "#popup-dialogo" ).html(json.msg);
					$( "#popup" ).popup( "open" );
				}
			},
			complete: function(){
				$.mobile.loading( "hide" );
			},
			error: function(xhr,e,t){
				console.log(xhr.responseText);                
			}
		});
	});
	
	
	$( "#teste" ).click(function(){
		validaLogin();
	})
	
});


function validaLogin(){
	
	$.ajax({
		type: "POST",
		url: "http://clientes.unimedmanaus.com.br/controller/app/procValidaSessao.php", 
		data: {
			acao: 'ValidaSessao',
			cpf: $.cookie('sessao')
		},            
		async: true,
		dataType: "json", 
		beforeSend: function() {
			$.mobile.loading( "show" );
		},
		success: function (json) {
			
			if(!json.status){
				
				//redireciona o usuario para pagina
				$.mobile.changePage("#login", {
					transition : "slidefade"
				});
				
			}
			
		},
		complete: function(){
			$.mobile.loading( "hide" );
		},
		error: function(xhr,e,t){
			console.log(xhr.responseText);                
		}
	});
	
}






