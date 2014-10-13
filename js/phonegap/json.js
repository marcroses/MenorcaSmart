var urlTurismeMore="";
var xmlDoc="";
var xmlDoc2="";
var xmlDoc3="";
var mapTurHeight=0;

function agenda()
{
    $.mobile.showPageLoadingMsg('Searching');
    var idioma="";
    var fins="";
    var caducitat="";
    
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    

    if (currentIdioma=="cat") fins="fins el dia ";
    if (currentIdioma=="cas") fins="hasta el dia ";
    if (currentIdioma=="ang") fins="until ";
    
    if (currentIdioma=="cat") caducitat="Permanent";
    if (currentIdioma=="cas") caducitat="Permanente";
    if (currentIdioma=="ang") caducitat="Permanent";   

    var idMun=currentMunicipi.substr(2);
    if (idMun=="070") idMun="07";
    
    url="http://ide.cime.es/infoIDE/agenda.aspx?idmun="+ idMun + "&idioma=" + idioma;
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
                            $.each(data.encerts, function(i, item) {
                                //Afegir l'encert a la llista
                                numResultats++;
                                if (numResultats<50)
                                {
	                                if (item.hasta!="")
	                                {
	                                	$("#llistaAgenda").append('<li onclick="publicacio(\'' + item.id + '\',\'AG\')"><a href="#"><h3>' + item.titulo +'</h3><div style="font-size:12px;">'+ fins + item.hasta.substr(0,10) + '</div></a></li>');	
	                                }
	                                else{
	                                	if (item.nocad=="True")
	                                	{
	                                		$("#llistaAgenda").append('<li onclick="publicacio(\'' + item.id + '\',\'AG\')"><a href="#"><h3>' + item.titulo +'</h3><div style="font-size:12px;">' + item.falta.substr(0,10) + ' - ' + caducitat + '</div></a></li>');
	                                	}
	                                	else{
	                                		$("#llistaAgenda").append('<li onclick="publicacio(\'' + item.id + '\',\'AG\')"><a href="#"><h3>' + item.titulo +'</h3><div style="font-size:12px;">' + item.falta.substr(0,10) + '</div></a></li>');
	                                	}
	                                }
                                }
                            });
							if (numResultats>0)
						    {
							    $("#contentAgenda").html("<br>&nbsp;" + textIdioma(6));
						    }
						    else{
							    $("#contentAgenda").html("<br>&nbsp;" + textIdioma(4));
						    }                              
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
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
    $.mobile.hidePageLoadingMsg( 'Searching' );
    //Mostrem la p�gina d'encerts
    //$.mobile.changePage("#dialegAgenda");
}


function noticies()
{
    $.mobile.showPageLoadingMsg( 'Searching' );
    var idioma="";
    var fins="";
    var caducitat="";
    
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    

    if (currentIdioma=="cat") fins="fins el dia ";
    if (currentIdioma=="cas") fins="hasta el dia ";
    if (currentIdioma=="ang") fins="until ";
    
    if (currentIdioma=="cat") caducitat="Permanent";
    if (currentIdioma=="cas") caducitat="Permanente";
    if (currentIdioma=="ang") caducitat="Permanent";   

    var idMun=currentMunicipi.substr(2);
    if (idMun=="070") idMun="07";
    
    url="http://ide.cime.es/infoIDE/noticies.aspx?idmun="+ idMun + "&idioma=" + idioma;
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                $("#llistaNoticies").empty();
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            $.each(data.encerts, function(i, item) {
                                //Afegir l'encert a la llista
                                numResultats++;
                                if (numResultats<50) $("#llistaNoticies").append('<li onclick="publicacio(\'' + item.id + '\',\'NOT\')"><a href="#"><h3>' + item.titulo1 +'</h3><div style="font-size:12px;">'+ item.falta.substr(0,10) + '</div></a></li>'); 
                            });
                            if (numResultats>0)
                            {
                                $("#contentNoticies").html("<br>&nbsp;" + textIdioma(7));
                            }
                            else{
                                $("#contentNoticies").html("<br>&nbsp;" + textIdioma(4));
                            }                              
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                    //Actualiza la lista
                    $("#llistaNoticies").listview("refresh");
                }
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
    $.mobile.hidePageLoadingMsg( 'Searching' );
    //Mostrem la p�gina d'encerts
    //$.mobile.changePage("#dialegAgenda");
}


function publicacio(item, tipus)
{
    $.mobile.hidePageLoadingMsg( 'Searching' );
    var idioma="";
    var titol="";
    var cadLink="";
    var cadDocs="";
    
    if (currentIdioma=="cat") 
    {
        idioma="ca";
        if (tipus=="NOT") titol="Not&iacute;cia";
        if (tipus=="AG") titol="Activitat Agenda";
        cadLink="Link";
        cadDocs="Documents adjunts";
    }
    if (currentIdioma=="cas") 
    {
        idioma="es";
        if (tipus=="NOT") titol="Noticia";
        if (tipus=="AG") titol="Actividad Agenda";
        cadLink="Enlace";
        cadDocs="Documentos adjuntos";
    }
    if (currentIdioma=="ang") 
    {
        idioma="en";
        if (tipus=="NOT") titol="News";
        if (tipus=="AG") titol="Activity";
        cadLink="Link";
        cadDocs="Attachments";
    }

    var idMun=currentMunicipi.substr(2);
    if (idMun=="070") idMun="07";
    
    url="http://ide.cime.es/infoIDE/publicacio.aspx?idmun="+ idMun + "&idioma=" + idioma + "&idPub=" + item;
    //alert(url);
    $.ajax({
        url: url,
        cache: false,
        dataType: 'text',
        success: function(data) { 
            if(!data.error){
                $("#contentPublicacio").html("");
                var xmlDoc3=data;
                if (xmlDoc3.indexOf('<div class="PLA_titol">')>0) xmlDoc3=xmlDoc3.substr(xmlDoc3.indexOf('<div class="PLA_titol">'))
                if (xmlDoc3.indexOf('<div class="PLA_titolNT">')>0) xmlDoc3=xmlDoc3.substr(xmlDoc3.indexOf('<div class="PLA_titolNT">'))
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
                if (currentMunicipi=="07070") url='http://www.cime.es/';
                
                xmlDoc3=replaceAll('src="/', 'style="max-width:' + (window.innerWidth-20) + 'px;" src="' + url, xmlDoc3);
                xmlDoc3=replaceAll('<h1>', '<h3>', xmlDoc3);
                xmlDoc3=replaceAll('</h1>', '</h3>', xmlDoc3);  
                xmlDoc3=replaceAll('<div class="PLA_texte"><p><br /><br />', '<div class="PLA_texte">', xmlDoc3);

				var url2 = url + "publicacions/verpub.aspx?id=";     
				if (currentMunicipi=="07067") url2 = url + "Contingut.aspx?IdPub=";                                           
                
                var img = xmlDoc3.substr(xmlDoc3.indexOf("|||")+3);
                var link = img.substr(img.indexOf("|||")+3);
                matimg = img.split("|||");
                img=matimg[0];
                xmlDoc3 = xmlDoc3.substr(0,xmlDoc3.indexOf("|||")) + "<br>"; 

                if (img.length>2) xmlDoc3 += "<img src='" + url + "Documents/Imatges/" + img + "' style='max-width:" + (window.innerWidth-20) + "px;'><br>"
                xmlDoc3 += "<center><input style='width:90%;' type='button' value='" + cadLink + "' onclick=\"window.open('" + url2 + item + "', '_system')\" /></center>";
                
                
                if (link.length>2) xmlDoc3 += "<center><input style='width:90%;' type='button' value='" + cadDocs + "' onclick=\"window.open('" + url + "Documents/documents/" + link + "', '_system')\" /></center>";
                $("#tipusPub").html(titol);
                $("#contentPublicacio").html('<div style="text-align:justify;">' + xmlDoc3 + '</div>');
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
  
    //Mostrem la p�gina d'encerts
    $.mobile.hidePageLoadingMsg( 'Searching' );
    $.mobile.changePage("#pagePublicacio");
}

function comercos()
{
    $.mobile.showPageLoadingMsg( 'Searching' );
    var idioma="";
    
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    

    url="http://ide.cime.es/infoIDE/comerços.aspx?idmun="+ currentMunicipi.substr(2) + "&idioma=" + idioma + "&nom=&sector=&idComerç=";
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                $("#llistaComer").empty();
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            var nouHeader="";
                            $.each(data.encerts, function(i, item) {
                                if (nouHeader!=item.tipus) $("#llistaComer").append('<li data-role="list-divider">' + item.tipus + '</li>');
                                nouHeader=item.tipus;
                                //Afegir l'encert a la llista
                                $("#llistaComer").append('<li onclick="comerDetall(\'' + item.id + '\')"><a href="#"><h3>' + item.nom +'</h3><div style="font-size:12px;">'+ item.tipus + ' - ' + item.direccio + '</div></a></li>');
                                numResultats++;                                
                            });
                            if (numResultats>0)
                            {
                                $("#contentComer").html("<br>" + textIdioma(10));
                            }
                            else{
                                $("#contentComer").html(textIdioma(4));
                            }                              
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                    //Actualiza la lista
                    $("#llistaComer").listview("refresh");
                }
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
    $.mobile.hidePageLoadingMsg( 'Searching' );
    //Mostrem la p�gina d'encerts
    //$.mobile.changePage("#dialegAgenda");
}


function comerDetall(item)
{
    $.mobile.showPageLoadingMsg( 'Searching' );
    var idioma="";
    var titol="";
    var urlImg =""; 
    if (currentMunicipi=="07002") urlImg='http://www.ajalaior.org/documents/comercios/';
    if (currentMunicipi=="07015") urlImg='http://www.ajciutadella.org/documents/comercios/';
    if (currentMunicipi=="07023") urlImg='http://www.ajferreries.org/documents/comercios/';
    if (currentMunicipi=="07032") urlImg='http://www.ajmao.org/documents/comercios/';
    if (currentMunicipi=="07037") urlImg='http://www.aj-esmercadal.org/documents/comercios/';
    if (currentMunicipi=="07052") urlImg='http://www.ajsantlluis.org/documents/comercios/';
    if (currentMunicipi=="07064") urlImg='http://www.aj-escastell.org/documents/comercios/';
    if (currentMunicipi=="07067") urlImg='http://www.ajmigjorngran.org/documents/comercios/';
    
    
    if (currentIdioma=="cat") 
    {
        idioma="ca";
    }
    if (currentIdioma=="cas") 
    {
        idioma="es";
    }
    if (currentIdioma=="ang") 
    {
        idioma="en";
    }

        url="http://ide.cime.es/infoIDE/comerços.aspx?idmun="+ currentMunicipi.substr(2) + "&idioma=" + idioma + "&nom=&sector=&idComerç=" + item;
        //alert(url);    
        $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                $("#contentComerDetall").html("");
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            var contentHtml="";
                            $.each(data.encerts, function(i, item) {
                                numResultats++;
                                contentHtml += "<h3> " + item.nom + "</h3>";
                                contentHtml += "<b>Tipus:</b> " +item.tipus+ "<br>";
                                contentHtml += "<b>Dirección:</b> " +item.direccio+ "<br>";
                                contentHtml += "<b>Tel&egrave;fono:</b> <a href='tel:" + item.telefon + "'>" + item.telefon + "</a><br>";
                                contentHtml += "<div onclick=\"window.open('" + item.sector + "', '_system')\"><b>web:</b><a href='#'>" + item.sector + "</a></div>";
                                contentHtml += "<b>mail:</b> <a href='mailto:" + item.mail + "'>" + item.mail + "</a><br>";
                                contentHtml += "<b>Descripcio:</b><br> " + item.descrip1 + "<br>";
                                if (item.document!="")
                                {
                                    contentHtml += "<img style='max-width:100%;' src='" + urlImg + item.document + "'><br>";    
                                }
                                
                                comerX=item.x;
                                comerY=item.y;
                                if (comerX!="")
                                {
                                    vectorsCanvas.destroyFeatures();
                                    var punto = new OpenLayers.Geometry.Point(comerX,comerY).transform(new OpenLayers.Projection("EPSG:25831" ), new OpenLayers.Projection("EPSG:25831"));
                                    vectorsCanvas.addFeatures([new OpenLayers.Feature.Vector(punto, {icon:'img/pois/groc32.png', etiqueta:item.nom, width:32, height:32})]);              
                                    mapCanvas.setCenter(new OpenLayers.LonLat(comerX,comerY).transform(new OpenLayers.Projection("EPSG:25831" ), new OpenLayers.Projection("EPSG:25831")), 12);
                                }                                
                                
                            });
                            if (numResultats>0)
                            {
                                $("#contentComerDetall").html(contentHtml);
                            }
                            else{
                                $("#contentComerDetall").html(textIdioma(4));
                            }                              
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                }
               

            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
  
    //Mostrem la p�gina d'encerts
    $.mobile.hidePageLoadingMsg( 'Searching' );
    $.mobile.changePage("#pageComerDetall");
}



/*
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
*/


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
	
	$('#detallMunicipal').html('<div style="text-align:justify;">' + xmlDoc3 + '</div>')
	$.mobile.changePage("#pageInfoMunicipalDetall");
	
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}



function turisme(valor)
{
    var idioma="";
    
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    
    var urlImg = "img/" + valor + ".png";
    document.getElementById("imgLogoTur2B").src =  urlImg;
    document.getElementById("imgLogoTur3B").src =  urlImg;  
    document.getElementById("imgLogoTur4B").src =  urlImg;  

    
    url="http://ide.cime.es/infoIDE/turisme.aspx?idTipus="+ valor + "&idioma=" + idioma;
    //alert(url);
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                $("#llistaTurisme2").empty();
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            $.each(data.encerts, function(i, item) {
                                //alert(item.titol);
                                numResultats++;
                                $("#llistaTurisme2").append('<li data-icon="false" onclick="pubTur(\'' + item.url + '\')"><a href="#"><h3>&nbsp;&nbsp;' + item.titol +'</h3></a></li>');                                
                            });
                            if (numResultats>0)
                            {
                                $("#contentTurisme2").html("<br>&nbsp;" + textIdioma(6));
                            }
                            else{
                                $("#contentTurisme2").html("<br>&nbsp;" + textIdioma(4));
                            }                              
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                    //Actualiza la lista
                    try{
                       $("#llistaTurisme2").listview("refresh");    
                    }
                    catch(err)
                    {}                    
                    
                }
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
}



function pubTur(valor)
{
    var idioma="";
    
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    

    $("#titolTurisme").html('');
    document.getElementById("picTurisme").style.visibility = "hidden"; 
    $("#contentTurisme").html('');

    $("#titolTurisme4").html('');
    document.getElementById("picTurisme4").style.visibility = "hidden"; 
    $("#contentTurisme4").html('');
    
    //alert(valor);
    var url="";

    var params= valor.substr(valor.indexOf("?")+1);
    var matParams=params.split("&");
    var idPub=""
    if (matParams[0].split("=")[0].toLowerCase() != "idioma")
    {
        idPub=matParams[0].split("=")[1];
    }
    url="http://ide.cime.es/infoIDE/turismePub.aspx?idioma=" + idioma + "&idPub=" + idPub;
    //alert(url);
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            $.each(data.encerts, function(i, item) {
                                if (item.pub=="pub")
                                {
                                    //alert(item.html);
                                    var titol = item.titol;
                                    if (item.html.substring(7)=="<br><p>")
                                    {
                                        var content = item.html.substring(7).replace("<div><br><div id='mapDins'><br><div id='botonsMap' style='text-align: right'></div><br><div id='panelMapDins'><br><div id='map'></div><br></div><br><div id='panelImaDins'></div><br><div id='panelVidDins'></div><br></div><br></div>", "");    
                                    }
                                    else{
                                        var content = item.html.replace("<div><br><div id='mapDins'><br><div id='botonsMap' style='text-align: right'></div><br><div id='panelMapDins'><br><div id='map'></div><br></div><br><div id='panelImaDins'></div><br><div id='panelVidDins'></div><br></div><br></div>", "");
                                    }
                                    
                                    content = content.replace("<br><br><p><br />","");
                                    
                                    content = replaceAll(" src='/Documents/Imatges/", " style='text-align:center;width:" + (window.innerWidth-20) + "px;' src='http://www.menorca.es/Documents/Imatges/", content);
                                    //content = content.replace(' src="/Documents/Imatges/', ' style="max-width:' + (window.innerWidth-20) + 'px;" src="http://www.menorca.es/Documents/Imatges/');
                                    //alert(content);
                                    var cadUrl="";
                                    if (currentIdioma=="cat") cadUrl="Llegir m&eacute;s...";
                                    if (currentIdioma=="cas") cadUrl="Leer m&aacute;s";
                                    if (currentIdioma=="ang") cadUrl="More Information...";  

                                    var idioma="";
                                    if (currentIdioma=="cat") idioma="2";
                                    if (currentIdioma=="cas") idioma="1";
                                    if (currentIdioma=="ang") idioma="3";                                      
                                    
                                    $("#titolTurisme").html('<h2>' + titol + '</h2>');
                                    document.getElementById("picTurisme").src =  item.imatge;
                                    document.getElementById("picTurisme").style.visibility = "visible"; 
                                    $("#contentTurisme").html(content);
                                    
                                    urlTurismeMore = "http://www.menorca.es/contingut.aspx?idpub=" + item.idpub + "&idioma=" + idioma;
                                    $("#lblBtnTurismeMore").html(cadUrl);
				    
				    $("#ContentBtnMore9").html("");
				    $("#ContentBtnMore9").append('<center><a href="#" onclick="fn_turismeMore()" data-role="button" data-theme="b" data-iconpos="left" data-icon="info" id="btnTurismeMore9" style="width:90%;">' + cadUrl + '</a></center>').trigger('create');
                                    
                                    //var contentTurismeMore = "<p>&nbsp;<p><div onclick=\"window.open('" + url + "', '_system')\"><a href='#'>" + cadUrl + "</a></div>";
                                    //var contentTurismeMore = "<a data-role='button' data-iconpos='left' data-icon='info' onclick=\"window.open('" + url + "', '_system')\">" + cadUrl + "</a>";
                                    //document.getElementById("contentTurismeMore").innerHTML= contentTurismeMore;

                                    document.getElementById("mapTur").style.visibility = "hidden"; 
                                    document.getElementById("mapTur").style.height = '0px';
                                    if (item.lon!="")
                                    {
                                        var position=new OpenLayers.LonLat(item.lon,item.lat);
                                        mapCanvas2.setCenter(position, 12);
                                        document.getElementById("mapTur").style.visibility = "visible";
                                        document.getElementById("mapTur").style.height = (window.innerHeight/2) + 'px';
                                        
                                        vectorsCanvas2.destroyFeatures();
                                        var punto = new OpenLayers.Geometry.Point(item.lon,item.lat).transform(new OpenLayers.Projection("EPSG:25831" ), new OpenLayers.Projection("EPSG:25831"));
                                        vectorsCanvas2.addFeatures([new OpenLayers.Feature.Vector(punto, {icon:'img/pois/groc32.png', etiqueta:item.titol, width:32, height:32})]);              
                                        mapCanvas2.setCenter(new OpenLayers.LonLat(item.lon,item.lat).transform(new OpenLayers.Projection("EPSG:25831" ), new OpenLayers.Projection("EPSG:25831")), 11);
                                        document.getElementById("ContentBtnMore").style.bottom = '5px'; 
                                    }
                                    else{
					document.getElementById("ContentBtnMore").style.bottom =  (window.innerHeight/2) + 'px';  
				    }
                                    
                                    $.mobile.changePage("#pageTurisme3");                                                                
                                }
                                
                                if (item.pub=="tip")
                                {
                                    var titol = item.titol;
                                    var content = item.html;
                                    content = content.replace("<br><br><p><br />","");
                                    var cadUrl="";
                                    if (currentIdioma=="cat") cadUrl="Llegir m&eacute;s...";
                                    if (currentIdioma=="cas") cadUrl="Leer m&aacute;s";
                                    if (currentIdioma=="ang") cadUrl="More Information...";  

                                    var idioma="";
                                    if (currentIdioma=="cat") idioma="2";
                                    if (currentIdioma=="cas") idioma="1";
                                    if (currentIdioma=="ang") idioma="3";  
                                    
                                    var url= "http://www.menorca.es/Publicacions/Publicacions.aspx?tipo=" + item.idpub + "&idioma=" + idioma;

                                    //content = content + "<p><div onclick=\"window.open('" + url + "', '_system')\"><a href='#'>" + cadUrl + "</a></div>";  
                                    //content = content + "<a data-role='button' data-iconpos='left' data-icon='info' onclick=\"window.open('" + url + "', '_system')\">" + cadUrl + "</a>";
                                    
                                    urlTurismeMore = "http://www.menorca.es/Publicacions/Publicacions.aspx?tipo=" + item.idpub + "&idioma=" + idioma;
                                    $("#lblBtnTurismeMore2").html(cadUrl);   
				    
				    $("#ContentBtnMore9").html("");
				    $("#ContentBtnMore9").append('<center><a href="#" onclick="fn_turismeMore()" data-role="button" data-theme="b" data-iconpos="left" data-icon="info" id="btnTurismeMore9" style="width:90%;">' + cadUrl + '</a></center>').trigger('create');
				    
                                    
                                    document.getElementById("mapTur").style.visibility = "hidden"; 
                                    document.getElementById("mapTur").style.height = '0px';

                                    $("#titolTurisme4").html('<h2>' + titol + '</h2>');
                                    document.getElementById("picTurisme4").src =  item.imatge;
                                    document.getElementById("picTurisme4").style.visibility = "visible"; 
                                    $("#contentTurisme4").html(content);
                                    idTurismeLlista=item.idpub;
                                    $.mobile.changePage("#pageTurisme4");                                                                
                                }                                
                            });
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                }
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
    $.mobile.hidePageLoadingMsg( 'Searching' );
}


function turismeLlista(valor)
{
    var idioma="";
    
    if (currentIdioma=="cat") idioma="ca";
    if (currentIdioma=="cas") idioma="es";
    if (currentIdioma=="ang") idioma="en";    

    
    url="http://ide.cime.es/infoIDE/turismeLlista.aspx?idPub="+ valor + "&idioma=" + idioma;
    //alert(url);
    
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) { 
            if(!data.error){
                $("#llistaTurisme4").empty();
                if(data.encerts!=null){
                    if(data.encerts.length==0){
                        alert("no hi ha encerts!");
                    }
                    else{
                        var numResultats=0;
                        try{
                            $.each(data.encerts, function(i, item) {
                                if (currentIdioma=="cat") idioma="2";
                                if (currentIdioma=="cas") idioma="1";
                                if (currentIdioma=="ang") idioma="3";  
                                var url="http://www.menorca.es/contingut.aspx?idpub=" + item.id + "&idioma=" + idioma;
                                
                                $("#llistaTurisme4").append('<li onclick="pubTur(\'' + url + '\')"><a href="#"><h3>' + item.titol +'</h3></a></li>');
                                                                
                            });
                        }
                        catch(e)
                        {
                            alert(e.toString());
                        }
                    }
                    //Actualiza la lista
                    try{
                       $("#llistaTurisme4").listview("refresh");    
                    }
                    catch(err)
                    {}                    
                    
                }
            }else{
                alert("Error carregant dades.");
            }
        },
        error: function(data) {
            alert("Error carregant dades JSON: "+data.responseText);
            $.mobile.hidePageLoadingMsg( 'Searching' );
        }
    });
    $.mobile.hidePageLoadingMsg( 'Searching' );
}

function fn_turismeMore()
{
	//alert("hola")
    window.open(urlTurismeMore, '_system');    
}
