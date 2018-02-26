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
				
				if(json.result == true){
					
					//set cookie
				    $.cookie('carteirinha', json.dados.carteirinha); 
				    $.cookie('clientenome', json.dados.nome); 
					
					//mostra o nome do usuario logado em uma div
					$( ".nomcliente" ).html($.cookie('clientenome'));
					
					//redireciona o usuario para pagina
					$.mobile.changePage("#index", {
						transition : "slidefade"
					});

				}else{
					showPopup(json.msg);
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
				
				showPopup(json.msg);
				
				if(json.result == true){
					
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
				
				showPopup(json.msg);
				
				if(json.result == true){
					
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

function showPopup(msg) {
    // close button
    var closeBtn = $('<a href="#" data-rel="back" data-role="button" data-theme="d" data-icon="flat-delete" data-iconpos="notext" class="ui-btn-right">X</a>').button();
    var content = "<p>" + msg + "</p>";
    var popup = $("<div/>", {
        "data-role": "popup"
    }).css({
        "width": $(window).width() / 1.3 + "px" // optional
    }).append(closeBtn).append(content);
    $(".ui-page-active").append(popup);
    $("[data-role=popup]").on("popupafterclose", function () {
        $(this).remove();
    }).on("popupafteropen", function () {
        $(this).popup("reposition", {
            "positionTo": "window",
        });
    }).popup().popup("open");
}







