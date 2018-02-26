$(document).ready(function() {
	
	/*LOGIN*/
	$("#formLogin").submit(function (e){
		
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "http://clientes.unimedmanaus.com.br/controller/app/procLogin.php", 
			data: {
				acao: 'LoginWeb',
				dados: $(this).serialize()
			},            
			async: true,
			dataType: "json", 
			beforeSend: function() {
               $.mobile.loading( "show" );
			},
			success: function (json) {
				
				$.alert({ title: 'Alerta!', content: json.msg, });
				
				if(json.result == true){
					
					//set cookie
				    $.cookie('carteirinha', json.dados.carteirinha); 
				    $.cookie('clientenome', json.dados.nome); 
				    $.cookie('clientecpf',  json.dados.cpf); 
					
					//mostra o nome do usuario logado em uma div
					$( ".nomcliente" ).html($.cookie('clientenome'));
					
					//redireciona o usuario para pagina
					$.mobile.changePage("#pagina-index", {
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
	});
	
	
	/*ESQUECI SENHA*/
	$("#formEsqueciSenha").submit(function (e){
		
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "http://clientes.unimedmanaus.com.br/controller/app/procLogin.php", 
			data: {
				acao: 'EsqueciSenha',
				dados: $(this).serialize()
			},            
			async: true,
			dataType: "json", 
			beforeSend: function() {
               $.mobile.loading( "show" );
			},
			success: function (json) {
				
				$.alert({ title: 'Alerta!', content: json.msg, });
				
				if(json.result == true){
					
					//redireciona o usuario para pagina
					$.mobile.changePage("#pagina-login", {
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
	});
	
	
	/*CADASTRE-SE*/
	$("#formCadastrese").on("submit", function(e) {
		
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "http://clientes.unimedmanaus.com.br/controller/app/procLogin.php", 
			data: {
				acao: 'Cadastrese',
				dados: $(this).serialize()
			},            
			async: true,
			dataType: "json", 
			beforeSend: function() {
               $.mobile.loading( "show" );
			},
			success: function (json) {
				
				$.alert({ title: 'Alerta!', content: json.msg, });
				
				if(json.result == true){
					
					//redireciona o usuario para pagina
					$.mobile.changePage("#pagina-login", {
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
	});
	
	
	/*2 VIA BOLETO*/
	$("#link-meus-boletos").on("click", function(e) {
		
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "http://clientes.unimedmanaus.com.br/controller/app/proc2viaBoleto.php", 
			data: {
				acao: 'Cadastrese',
				cpf: $.cookie('clientecpf')
			},            
			async: true,
			dataType: "json", 
			beforeSend: function() {
               $.mobile.loading( "show" );
			},
			success: function (json) {
				
				if(json.msg){
					$.alert({ title: 'Alerta!', content: json.msg, });
				}
				
				var data="";
				
				$.each(json, function () {
					
					data += '<table data-role="table" class="ui-responsive table-stroke">';
					data += "<thead><tr><th>Período:</th><th>Data Vencimento:</th><th>Dias em Aberto:</th><th>Nosso Número:</th><th>Boleto:</th></tr></thead>";
					data += "<tbody>";
				
					data += "<tr>";
					
					data += "<td>"+ this.datvencimento +"</td>";
					data += "<td>"+ this.diasemaberto +"</td>";
					data += "<td>"+ this.nossonumero +"</td>";
					data += "<td>"+ this.periodo +"</td>";
					data += "<td>"+ this.gerarboleto +"</td>";
					
					data += "</tr>";
					
					data += "</tbody>";
					data += "</table>";
					
					data += "<hr>";
				});
				
				$("#table-2via-boleto").html(data).enhanceWithin();
				
			},
			complete: function(){
				$.mobile.loading( "hide" );
			},
			error: function(xhr,e,t){
				console.log(xhr.responseText);                
			}
		});
	});
	
	
});


/* FUNCOES */
function validaLogin(){
	
	$.ajax({
		type: "POST",
		url: "http://clientes.unimedmanaus.com.br/controller/app/procValidaSessao.php", 
		data: {
			acao: 'ValidaSessao',
			cpf: $.cookie('carteirinha')
		},            
		async: true,
		dataType: "json", 
		beforeSend: function() {
			$.mobile.loading( "show" );
		},
		success: function (json) {
			
			if(!json.status){
				
				//redireciona o usuario para pagina
				$.mobile.changePage("#pagina-login", {
					transition : "slidefade"
				});
				
			}
			
		},
		complete: function(){
			$.mobile.loading( "hide" );
			return false;
		},
		error: function(xhr,e,t){
			console.log(xhr.responseText);                
		}
	});
	
}
