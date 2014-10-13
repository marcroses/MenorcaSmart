var xmlDoc="";
var xmlDoc2="";
var xmlDoc3="";


function agenda()
{
    
    var idioma="";
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    
    
    url="http://ide.cime.es/infoIDE/agenda.aspx?idmun="+ currentMunicipi.substr(3) + "&idioma=" + idioma;
    alert(url);
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                $("#llistaAgenda").empty();
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            $.each(data, function(i, item) {
                                //Afegir l'encert a la llista
                                $("#llistaAgenda").append('<li onclick="publicacio(\'' + item.id + '\')"><a href="#"><h3>' + item.titulo1 +'</h3></a></li>');
                            });
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                    //Actualiza la lista
                    $("#llistaAgenda").listview("refresh");
                }
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
    //Mostrem la pàgina d'encerts
    $.mobile.changePage("#dialegAgenda");
}

function json_agenda()
{
	if (checkConnection()=="none")
	{
		msgError=textIdioma(0)
		$.mobile.changePage("#dialegError");
	}
	else{
		var url="";
		
	    var idioma="";
	    if (currentIdioma=="cat") idioma=1;
	    if (currentIdioma=="cas") idioma=2;
	    if (currentIdioma=="ang") idioma=3;
	    
	    $.mobile.showPageLoadingMsg( 'Searching' );
	    
		if (currentMunicipi=="07002") url='http://www.ajalaior.org/Publicacions/rss.aspx?tipo=01&idioma=' + idioma;
		if (currentMunicipi=="07015") url='http://www.ajciutadella.org/Publicacions/rss.aspx?tipo=AC&idioma=' + idioma;
		if (currentMunicipi=="07023") url='http://www.ajferreries.org/Publicacions/rss.aspx?tipo=AG&idioma=' + idioma;
		if (currentMunicipi=="07032") url='http://www.ajmao.org/Publicacions/rss.aspx?tipo=AG&idioma=' + idioma;
		if (currentMunicipi=="07037") url='http://www.aj-esmercadal.org/Publicacions/rss.aspx?tipo=03&idioma=' + idioma;
		if (currentMunicipi=="07052") url='http://www.ajsantlluis.org/Publicacions/rss.aspx?tipo=03&idioma=' + idioma;
		if (currentMunicipi=="07064") url='http://www.aj-escastell.org/Publicacions/rss.aspx?tipo=03&idioma=' + idioma;
		if (currentMunicipi=="07067") url='http://www.ajmigjorngran.org/Publicacions/rss.aspx?tipo=AC&idioma=' + idioma;
		//alert(url)
		if (url!="")
		{
		    $.ajax({
		        url: url,
		        dataType: "xml",
		        complete: end_json_agenda
		        //contentType: "text/xml; charset=\"utf-8\""
		    });
			
		}
		else{
			msgError=textIdioma(2)
			$.mobile.changePage("#dialegError");			
		}
    }   
}

function end_json_agenda(xmlHttpRequest, status)
{
	//alert("hola")
	xmlDoc2 = xmlHttpRequest.responseXML;
	var i=0;
	$(xmlDoc2).find("item").each(function(){
        var titol = $(this).find("title").text();
        var link = $(this).find("link").text();
        var pubDate = $(this).find("pubDate").text();
        var description = $(this).find("description").text();
        i++;
        if (i<26) 
    	{
        	$("#llistaAgenda").append('<li id="' + i + '" data-icon="false"><a href="#" onclick="agendaDetall(' + (i-1) + ')"><h3>' + titol + '</h3><div style="font-size:12px;">' + pubDate.substr(3,2) + '/' + pubDate.substr(0,2) + '/' + pubDate.substr(6,4) + '</div></a></li>');    	
    	}
        else{
        	return false;
        }
    });	
	$("#llistaAgenda").listview('refresh');  
	//alert(i)
	if (i>0)
    {
	    $("#contentAgenda").html(textIdioma(6));
    }
    else{
	    $("#contentAgenda").html(textIdioma(4));
    }
	$.mobile.hidePageLoadingMsg( 'Searching' );
}

function agendaDetall(item)
{
	var i=0;
	$(xmlDoc2).find("item").each(function(){
		if (i==item)
		{
	        var titol = $(this).find("title").text();
	        var link = $(this).find("link").text();
	        var pubDate = $(this).find("pubDate").text();
	        var description = $(this).find("description").text();
	        
	        $('#A-Titol').html(titol);	        
	        $('#A-pubDate').html(pubDate);
	        
	        if (currentMunicipi=="07032") description=description.replace('src="/Documents', 'src="http://www.ajmao.org/Documents')
	        $('#A-Noticia').html(description);
	        $.mobile.changePage("#dialegAgenda");
		}
        i++;
    });		
}



function json_noticies()
{
	if (checkConnection()=="none")
	{
		msgError=textIdioma(0)
		$.mobile.changePage("#dialegError");
	}
	else{
		$.mobile.showPageLoadingMsg( 'Searching' );
		var url="";
		if (currentMunicipi=="07002") url='http://www.aj-alaior.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07015") url='http://www.ajciutadella.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07023") url='http://www.ajferreries.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07032") url='http://www.ajmao.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07037") url='http://www.aj-esmercadal.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07052") url='http://www.ajsantlluis.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07064") url='http://www.aj-escastell.org/Publicacions/rss.aspx?tipo=NT';
		if (currentMunicipi=="07067") url='http://www.ajmigjorngran.org/Publicacions/rss.aspx?tipo=NT';
		if (url!="")
		{
		    $.ajax({
		        url: url,
		        dataType: "xml",
		        complete: end_json_noticies
		        //contentType: "text/xml; charset=\"utf-8\""
		    });    	
		}
		else{
			msgError=textIdioma(2)
			$.mobile.changePage("#dialegError");				
		}
    }    
}


function end_json_noticies(xmlHttpRequest, status)
{
	//alert("hola")
	xmlDoc = xmlHttpRequest.responseXML;
	var i=0;
	$(xmlDoc).find("item").each(function(){
        var titol = $(this).find("title").text();
        var link = $(this).find("link").text();
        var pubDate = $(this).find("pubDate").text();
        var description = $(this).find("description").text();
        i++;
        if (i<26) 
    	{
        	$("#llistaNoticies").append('<li id="' + i + '" data-icon="false"><a href="#" onclick="noticiaDetall(' + (i-1) + ')"><h3>' + titol + '</h3><div style="font-size:12px;">' + pubDate.substr(3,2) + '/' + pubDate.substr(0,2) + '/' + pubDate.substr(6,4) + '</div></a></li>');    	
    	}
        else{
        	return false;
        }        
    });	
	$("#llistaNoticies").listview('refresh'); 
	if (i>0)
    {
	    $("#contentNoticies").html(textIdioma(7));
    }
    else{
	    $("#contentNoticies").html(textIdioma(4));
    }	
	$.mobile.hidePageLoadingMsg( 'Searching' );
}

function noticiaDetall(item)
{
	var i=0;
	$(xmlDoc).find("item").each(function(){
		if (i==item)
		{
	        var titol = $(this).find("title").text();
	        var link = $(this).find("link").text();
	        var pubDate = $(this).find("pubDate").text();
	        var description = $(this).find("description").text();
	        
	        $('#Titol').html(titol);	        
	        $('#pubDate').html(pubDate);
	        $('#Noticia').html(description);
	        $.mobile.changePage("#dialegNoticia");
		}
        i++;
    });		
}



function json_detallMunicipal(url)
{
	if (checkConnection()=="none")
	{
		msgError=textIdioma(0)
		$.mobile.changePage("#dialegError");	
	}
	else{
		//alert(url);
	    $.ajax({
	        url: url,
	        dataType: "xml",
	        complete: end_json_detallMunicipal
	        //contentType: "text/xml; charset=\"utf-8\""
	    });    	
    }    
}

function end_json_detallMunicipal(xmlHttpRequest, status)
{
	xmlDoc3 = xmlHttpRequest.responseText;
	/*
	var i=0;
	$(xmlDoc3).find("item").each(function(){
        var titol = $(this).find("title").text();
        var link = $(this).find("link").text();
        var pubDate = $(this).find("pubDate").text();
        var description = $(this).find("description").text();
        i++;
        if (i<26) 
    	{
        	$("#llistaNoticies").append('<li id="' + i + '" data-icon="false"><a href="#" onclick="noticiaDetall(' + (i-1) + ')"><div style="font-size:12px;">' + pubDate + '</div> <h3>' + titol + '</h3></a></li>');    	
    	}
    });
    */	
	xmlDoc3=xmlDoc3.substr(xmlDoc3.indexOf('<div class="PLA_titol">'))
	if (xmlDoc3.indexOf('<div class="PLA_tornar">')!=-1) xmlDoc3=xmlDoc3.substr(0,xmlDoc3.indexOf('<div class="PLA_tornar">'))
	if (xmlDoc3.indexOf('<div class="PLA_share">')!=-1) xmlDoc3=xmlDoc3.substr(0,xmlDoc3.indexOf('<div class="PLA_share">'))
	if (xmlDoc3.indexOf('<div id="DIVbaix">')!=-1) xmlDoc3=xmlDoc3.substr(0,xmlDoc3.indexOf('<div id="DIVbaix">'))
	
	
		if (currentMunicipi=="07002") url='http://www.aj-alaior.org/';
		if (currentMunicipi=="07015") url='http://www.ajciutadella.org/';
		if (currentMunicipi=="07023") url='http://www.ajferreries.org/';
		if (currentMunicipi=="07032") url='http://www.ajmao.org/';
		if (currentMunicipi=="07037") url='http://www.aj-esmercadal.org/';
		if (currentMunicipi=="07052") url='http://www.ajsantlluis.org/';
		if (currentMunicipi=="07064") url='http://www.aj-escastell.org/';
		if (currentMunicipi=="07067") url='http://www.ajmigjorngran.org/';	
	
	xmlDoc3=replaceAll('src="/', 'style="max-width:' + window.innerWidth + 'px;" src="' + url, xmlDoc3)
	xmlDoc3=replaceAll('<h1>', '<h3>', xmlDoc3)
	xmlDoc3=replaceAll('</h1>', '</h3>', xmlDoc3)
	
	$('#detallMunicipal').html(xmlDoc3)
	$.mobile.changePage("#pageInfoMunicipalDetall");
	
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}