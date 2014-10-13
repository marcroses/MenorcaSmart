var pwdWebService="silme1988"
var matContentMuni;
var urlTramit="";

function webMunicipi(idmun)
{
	if (checkConnection()=="none")
	{
		msgError=textIdioma(0)
		$.mobile.changePage("#dialegError");	
	}
	else{
		$.mobile.showPageLoadingMsg( 'Searching' );
	    $('#lblInfo1').html(textIdioma(5));
	    
	    var idioma="";
	    if (currentIdioma=="cat") idioma=1;
	    if (currentIdioma=="cas") idioma=2;
	    if (currentIdioma=="ang") idioma=3;
	    
	    var soapMessage="";
	    
	    soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
	    soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
	    soapMessage += '	  <soap:Body>'
	    soapMessage += '    <DevolverOpcionesMenu xmlns="SilAdmin">'
	    soapMessage += '      <Password>' + pwdWebService + '</Password>'
	    soapMessage += '      <Idioma>' + idioma + '</Idioma>'
	    soapMessage += '      <IdPare></IdPare>'
	    soapMessage += '    </DevolverOpcionesMenu>'
	    soapMessage += '  </soap:Body>'
	    soapMessage += '</soap:Envelope>'   
	    
	    //alert(soapMessage);
	    var url=""
	    if (idmun=="07002") url="http://www.alaior.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"	
	    if (idmun=="07015") url="http://www.ajciutadella.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"
	    if (idmun=="07023") url="http://www.ajferreries.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"	
	    if (idmun=="07032") url="http://www.ajmao.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"
	    if (idmun=="07037") url="http://www.aj-esmercadal.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"
	    if (idmun=="07052") url="http://www.ajsantlluis.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"
	    if (idmun=="07064") url="http://www.aj-escastell.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"
	    if (idmun=="07067") url="http://www.ajmigjorngran.org/wsSilAdmin/GesWeb.asmx?op=DevolverOpcionesMenu"
	 
	    //alert(url)
	    
	    $.ajax({
	        url: url,
	        type: "POST",
	        dataType: "xml",
	        data: soapMessage,
	        complete: endWebMunicipi,
	        contentType: "text/xml; charset=\"utf-8\""
	    });
	    
	    return false;
		
	}
	
}

function goUrl(valor)
{
	//obreNavegador(matContentMuni[valor].replace("NOFRAMES=N", "NOFRAMES=S"))
    var idioma="";
    if (currentIdioma=="cat") idioma=1;
    if (currentIdioma=="cas") idioma=2;
    if (currentIdioma=="ang") idioma=3;
	json_detallMunicipal(matContentMuni[valor].replace("NOFRAMES=N", "NOFRAMES=S") + "&idioma=" + idioma);
}

function endWebMunicipi(xmlHttpRequest, status)
{
	//alert(xmlHttpRequest.responseText)
	$("#llistaInfoMunicipi").empty(); 
	var i=0;
	matContentMuni = new Array();
    $(xmlHttpRequest.responseXML).find('OpcionMenu').each(function(){
        
        var Descripcion = $(this).find('Descripcion').text();
        var URL = $(this).find('URL').text();
		//alert(Descripcion + " " + URL)
		matContentMuni.push(URL);
		$("#llistaInfoMunicipi").append('<li onclick="goUrl(\'' + i + '\')"><a href="#"><h3>' + Descripcion +'</h3></a></li>');
		//var html = '<li><a href="#" style="width:90%;" data-role="button" data-theme="b" id="btnMunicipi_' + i + '" onclick="goUrl(\'' + i + '\')">' + Descripcion + '</a></li>';
    	//$('#contentMunicipi').append(html).trigger('create');
    	i++;		

    });
    if (i>0)
    {
    	$('#contentMunicipi').html("<br>" + textIdioma(8))	
    }
    else{
    	$('#contentMunicipi').html("<br>" + textIdioma(4))
    }
	$.mobile.hidePageLoadingMsg( 'Searching' );        
    $("#llistaInfoMunicipi").listview("refresh");
}




function enviaQueixa(Texte, Nom, Mail, IdArea, Adjunt, Domicili, Poblacio, CPostal, Telefon, NIF)
{
	if ((currentMunicipi=="07002") || (currentMunicipi=="07015") || (currentMunicipi=="07023") || (currentMunicipi=="07037") || (currentMunicipi=="07052") || (currentMunicipi=="07064") || (currentMunicipi=="07067"))
	{
		alert("Servei pendent d'implementació")
	}
	else{
	    var soapMessage="";
	    
	    var idioma="";
	    if (currentIdioma=="cat") idioma="01";
	    if (currentIdioma=="cas") idioma="02";
	    if (currentIdioma=="ang") idioma="02";    
	    
	    soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
	    soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
	    soapMessage += '	<soap:Body>'
	    soapMessage += '    	<EnviarConsulta xmlns="SilAdmin">'
	    soapMessage += '      		<Password>' + pwdWebService + '</Password>'
	    soapMessage += '      		<Titol>Queixa App Mobil</Titol>'
	    soapMessage += '      		<Texte>' + Texte + '</Texte>'
	    soapMessage += '      		<Nom>' + Nom + '</Nom>'
	    soapMessage += '      		<Mail>' + Mail + '</Mail>'
	    soapMessage += '      		<IdArea>' + IdArea + '</IdArea>'
	    soapMessage += '      		<Adjunt></Adjunt>'
	    soapMessage += '      		<ExtensioImatge></ExtensioImatge>'    
	    soapMessage += '      		<Domicili>' + Domicili + '</Domicili>'
	    soapMessage += '      		<Poblacio>' + Poblacio + '</Poblacio>'    
	    soapMessage += '      		<CPostal>' + CPostal + '</CPostal>'    
	    soapMessage += '      		<Telefon>' + Telefon + '</Telefon>'
	    soapMessage += '      		<Idioma>' + idioma + '</Idioma>'  
	    soapMessage += '      		<CanalE>1</CanalE>'        
	    soapMessage += '      		<CanalR>4</CanalR>'
	    soapMessage += '      		<NIF>' + NIF + '</NIF>'    
	    soapMessage += '    	</EnviarConsulta>'
	    soapMessage += '  </soap:Body>'
	    soapMessage += '</soap:Envelope>'   

	    
	    var url=""
	    if (currentMunicipi=="07032") url="http://www.ajmao.org/wsSilAdmin/ConsOnLine.asmx?op=EnviarConsulta"
	    
	    //$("textarea#lblSOAP").val(url + "  " + soapMessage);	
	    //$("textarea#lblGET").val('http://www.ajmao.org/wsSilAdmin/ConsOnLine.asmx/EnviarConsulta?Password=' + pwdWebService + '&Titol=AppMobilstring&Texte=' + Texte + '&Nom=' + Nom + '&Mail=' + Mail + '&IdArea=' + IdArea + '&Adjunt=' + Adjunt + '&ExtensioImatge=JPEG&Domicili=' + Domicili + '&Poblacio=' + Poblacio + '&CPostal=' + CPostal + '&Telefon=' + Telefon + '&Idioma=' + idioma + '&CanalE=1&CanalR=4&NIF=' + NIF)
	    
	    $.mobile.showPageLoadingMsg( 'Searching' );	
	    
	    $.ajax({
	        url: url,
	        type: "POST",
	        dataType: "xml",
	        data: soapMessage,
	        complete: endEnviaQueixa,
	        contentType: "text/xml; charset=\"utf-8\"",
	        error: function (xhr, ajaxOptions, thrownError) {
	            alert(xhr.responseText);
	          }
	    });
	    		
	}
    

    return false;
}

function endEnviaQueixa(xmlHttpRequest, status)
{
	$.mobile.hidePageLoadingMsg( 'Searching' );
    
}



function getAreas(idmun)
{
    
    var soapMessage="";
    
    soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
    soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
    soapMessage += '	  <soap:Body>'
    soapMessage += '    <DevolverAreas xmlns="SilAdmin">'
    soapMessage += '      <Password>' + pwdWebService + '</Password>'
    soapMessage += '    </DevolverAreas>'
    soapMessage += '  </soap:Body>'
    soapMessage += '</soap:Envelope>'   
    
    //alert(soapMessage);
    var url=""
    if (idmun=="07002") url="http://www.alaior.org/wsSilAdmin"  
    if (idmun=="07015") url="http://www.ajciutadella.org/wsSilAdmin"
    if (idmun=="07023") url="http://www.ajferreries.org/wsSilAdmin" 
    if (idmun=="07032") url="http://www.ajmao.org/wsSilAdmin"
    if (idmun=="07037") url="http://www.aj-esmercadal.org/wsSilAdmin"
    if (idmun=="07052") url="http://www.ajsantlluis.org/wsSilAdmin"
    if (idmun=="07064") url="http://www.aj-escastell.org/wsSilAdmin"
    if (idmun=="07067") url="http://www.ajmigjorngran.org/wsSilAdmin"
    
    url += "/ConsOnLine.asmx?op=DevolverAreas" 
    
    $.ajax({
        url: url,
        type: "POST",
        dataType: "xml",
        data: soapMessage,
        complete: endGetAreas,
        contentType: "text/xml; charset=\"utf-8\""
    });
    
    return false;
}


function endGetAreas(xmlHttpRequest, status)
{
	//alert(xmlHttpRequest.responseText)
	$("#IdArea").empty(); 
	var i=0;
	matContentMuni = new Array();
    $(xmlHttpRequest.responseXML).find('Area').each(function(){
        
        var idArea = $(this).find('Id').text();
        var descripcionArea = $(this).find('Descripcion').text();
		
        $('#IdArea').append('<option value='+idArea+'>'+descripcionArea+'</option>');		

    });
    $('#IdArea').listview('refresh');
}






function testQueixa()
{
	//enviaQueixa('Texte', 'Nom', 'Mail@mail.com', '1', 'Adjunt', 'Domicili', 'Poblacio', 'CPostal', 'Telefon', 'NIF')
    var soapMessage="";
    
    var idioma="";
    if (currentIdioma=="cat") idioma="01";
    if (currentIdioma=="cas") idioma="02";
    if (currentIdioma=="ang") idioma="02";    
    
    soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
    soapMessage += '	<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
    soapMessage += ' <soap:Body>'
    soapMessage += '<EnviarConsulta xmlns="SilAdmin">'
    soapMessage += '	      <Password>silme1988</Password>'
    soapMessage += '<Titol>titol</Titol>'
    soapMessage += '	      <Texte>texte</Texte>'
    soapMessage += '	      <Nom>nom</Nom>'
    soapMessage += '      <Mail>marcroses@gmail.com</Mail>'
    soapMessage += '	      <IdArea>1</IdArea>'
    soapMessage += '	      <Adjunt>/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcG    	BwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwM    	DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACAAIADASIA    	AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA    	AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3    	ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm    	p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA    	AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx    	BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK   	U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3    	uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCTxb8b    	PHnhfx74m0rT9Za8urvVFvbDTbm5ktWubdWKSqBIQqyZAbMbAZXkENk8n4F+M/iD4y+LtWuI9Q1W    	Hxrp86vqej3N7cW80MDBtwigQ7CHwfm3nDKAMBudX9pTxBf+H/if4o1zwPbafrmlafcsuv6Xaefq    	SWoI/c3EdgGEsUm8kF7YkA8jIyBxWsR6f/Zt54kt9J8YeHfEmizGXUJtHjm1K3vLafIEixTAXVug    	7pIoIDEqxXFfm/tZxTbZ906MJSVkeofBH4tXF74FXxP4A/t68XTdQkn1DTrnWZ5IbQfKMwxsshDY    	+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</Adjunt>'
    soapMessage += '	      <ExtensioImatge>jpeg</ExtensioImatge>'
    soapMessage += '	      <Domicili>casa</Domicili>'
    soapMessage += '	      <Poblacio>maó</Poblacio>'
    soapMessage += '	      <CPostal>07701</CPostal>'
    soapMessage += '<Telefon>618368804</Telefon>'
    soapMessage += '	      <Idioma>1</Idioma>'
    soapMessage += '	     <CanalE>1</CanalE>'
    soapMessage += '	      <CanalR>4</CanalR>'
    soapMessage += '	      <NIF>40989282q</NIF>'
    soapMessage += '	   </EnviarConsulta>'
    soapMessage += '	  </soap:Body>'
    soapMessage += '	</soap:Envelope>'   
    	
    	//alert(soapMessage)
    
    var url="http://www.ajmao.org/wsSilAdmin/ConsOnLine.asmx?op=EnviarConsulta"
    
    	
    
    $.ajax({
        url: url,
        type: "POST",
        dataType: "xml",
        data: soapMessage,
        complete: endEnviaQueixa,
        contentType: "text/xml; charset=\"utf-8\"",
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
          }
    });
    
    return false;
}


function urlServidor()
{
        var url=""
        if (currentMunicipi=="07002") url="http://www.alaior.org/"  
        if (currentMunicipi=="07015") url="http://www.ajciutadella.org/"
        if (currentMunicipi=="07023") url="http://www.ajferreries.org/" 
        if (currentMunicipi=="07032") url="http://www.ajmao.org/"
        if (currentMunicipi=="07037") url="http://www.aj-esmercadal.org/"
        if (currentMunicipi=="07052") url="http://www.ajsantlluis.org/"
        if (currentMunicipi=="07064") url="http://www.aj-escastell.org/"
        if (currentMunicipi=="07067") url="http://www.ajmigjorngran.org/"
        if (currentMunicipi=="07070") url="http://www.cime.es/"
        return url; 
}


function DevolverMaterias()
{
    if (checkConnection()=="none")
    {
        msgError=textIdioma(0)
        $.mobile.changePage("#dialegError");    
    }
    else{
        $.mobile.showPageLoadingMsg( 'Searching' );
        
        var idioma="";
        if (currentIdioma=="cat") idioma=1;
        if (currentIdioma=="cas") idioma=2;
        if (currentIdioma=="ang") idioma=3;
        
        var soapMessage="";
        
        soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        soapMessage += '    <soap:Body>'
        soapMessage += '        <DevolverMaterias xmlns="http://tempuri.org/">'
        soapMessage += '            <Idioma>' + idioma + '</Idioma>'
        soapMessage += '        </DevolverMaterias>'
        soapMessage += '    </soap:Body>'
        soapMessage += '</soap:Envelope>'   
        
        //alert(soapMessage);
     
        var url=urlServidor() + "wsSilAdmin/GesServeis.asmx?op=DevolverMaterias";
        //alert(url);
        
        $.ajax({
            url: url,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            complete: endDevolverMaterias,
            contentType: "text/xml; charset=\"utf-8\""
        });
        
        return false;
        
    }
    
}


function endDevolverMaterias(xmlHttpRequest, status)
{
    //alert(xmlHttpRequest.responseText)
    $("#llistaTramits_Mat_1").empty(); 
    var i=0;

    $(xmlHttpRequest.responseXML).find('Materia').each(function(){
        var Descrip = $(this).find('Descrip').text();
        var Id = $(this).find('Id').text();
        //alert(Descrip + " " + Id)
        $("#llistaTramits_Mat_1").append('<li onclick="DevolverGestiones1(\'' + Id + '\')"><a href="#"><h3>' + Descrip +'</h3></a></li>');
        i++;        
    });
    if (i>0)
    {
        $('#p_Tramits_Mat1').html(textIdioma(11))    
    }
    else{
        $('#p_Tramits_Mat1').html(textIdioma(4))
    }
    $.mobile.hidePageLoadingMsg( 'Searching' );
    $("#llistaTramits_Mat_1").listview("refresh");        
    
}


function DevolverHechosVitales()
{
    if (checkConnection()=="none")
    {
        msgError=textIdioma(0)
        $.mobile.changePage("#dialegError");    
    }
    else{
        $.mobile.showPageLoadingMsg( 'Searching' );
        
        var idioma="";
        if (currentIdioma=="cat") idioma=1;
        if (currentIdioma=="cas") idioma=2;
        if (currentIdioma=="ang") idioma=3;
        
        var soapMessage="";
        
        soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        soapMessage += '    <soap:Body>'
        soapMessage += '        <DevolverHechosVitales xmlns="http://tempuri.org/">'
        soapMessage += '            <Idioma>' + idioma + '</Idioma>'
        soapMessage += '        </DevolverHechosVitales>'
        soapMessage += '    </soap:Body>'
        soapMessage += '</soap:Envelope>'   
        
        //alert(soapMessage);
     
        var url=urlServidor() + "wsSilAdmin/GesServeis.asmx?op=DevolverHechosVitales";
        //alert(url);
        
        $.ajax({
            url: url,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            complete: endDevolverHechosVitales,
            contentType: "text/xml; charset=\"utf-8\""
        });
        
        return false;
        
    }
    
}


function endDevolverHechosVitales(xmlHttpRequest, status)
{
    //alert(xmlHttpRequest.responseText)
    $("#llistaTramits_Fets_1").empty(); 
    var i=0;

    $(xmlHttpRequest.responseXML).find('HechoVital').each(function(){
        var Descrip = $(this).find('Descrip').text();
        var Id = $(this).find('Id').text();
        //alert(Descrip + " " + Id)
        $("#llistaTramits_Fets_1").append('<li onclick="DevolverGestiones2(\'' + Id + '\')"><a href="#"><h3>' + Descrip +'</h3></a></li>');
        i++;        
    });
    if (i>0)
    {
        $('#p_Tramits_Fets1').html(textIdioma(12))    
    }
    else{
        $('#p_Tramits_Fets1').html(textIdioma(4))
    }
    $.mobile.hidePageLoadingMsg( 'Searching' );
    $("#llistaTramits_Fets_1").listview("refresh");        
    
}


function DevolverDestinatarios()
{
    if (checkConnection()=="none")
    {
        msgError=textIdioma(0)
        $.mobile.changePage("#dialegError");    
    }
    else{
        $.mobile.showPageLoadingMsg( 'Searching' );
        
        var idioma="";
        if (currentIdioma=="cat") idioma=1;
        if (currentIdioma=="cas") idioma=2;
        if (currentIdioma=="ang") idioma=3;
        
        var soapMessage="";
        
        soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        soapMessage += '    <soap:Body>'
        soapMessage += '        <DevolverDestinatarios xmlns="http://tempuri.org/">'
        soapMessage += '            <Idioma>' + idioma + '</Idioma>'
        soapMessage += '        </DevolverDestinatarios>'
        soapMessage += '    </soap:Body>'
        soapMessage += '</soap:Envelope>'   
        
        //alert(soapMessage);
     
        var url=urlServidor() + "wsSilAdmin/GesServeis.asmx?op=DevolverDestinatarios";
        //alert(url);
        
        $.ajax({
            url: url,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            complete: endDevolverDestinatarios,
            contentType: "text/xml; charset=\"utf-8\""
        });
        
        return false;
        
    }
    
}


function endDevolverDestinatarios(xmlHttpRequest, status)
{
    //alert(xmlHttpRequest.responseText)
    $("#llistaTramits_Fets_1").empty(); 
    var i=0;

    $(xmlHttpRequest.responseXML).find('Destinatario').each(function(){
        var Descrip = $(this).find('Descrip').text();
        var Id = $(this).find('Id').text();
        //alert(Descrip + " " + Id)
        $("#llistaTramits_Dest_1").append('<li onclick="DevolverGestiones3(\'' + Id + '\')"><a href="#"><h3>' + Descrip +'</h3></a></li>');
        i++;        
    });
    if (i>0)
    {
        $('#p_Tramits_Dest1').html(textIdioma(13))    
    }
    else{
        $('#p_Tramits_Dest1').html(textIdioma(4))
    }
    $.mobile.hidePageLoadingMsg( 'Searching' );
    $("#llistaTramits_Dest_1").listview("refresh");        
    
}



function DevolverGestiones1(valor)
{
    DevolverGestiones(valor, 'IdMateria');
}
function DevolverGestiones2(valor)
{
    DevolverGestiones(valor, 'IdHechoVital');
}
function DevolverGestiones3(valor)
{
    DevolverGestiones(valor, 'IdDestinatario');
}

function DevolverGestiones(valor,tipus)
{
    if (checkConnection()=="none")
    {
        msgError=textIdioma(0)
        $.mobile.changePage("#dialegError");    
    }
    else{
        $.mobile.showPageLoadingMsg( 'Searching' );
        
        var idioma="";
        if (currentIdioma=="cat") idioma=1;
        if (currentIdioma=="cas") idioma=2;
        if (currentIdioma=="ang") idioma=3;
        
        var IdMateria='';
        var IdHechoVital='';
        var IdDestinatario='';
        
        if (tipus=='IdMateria') IdMateria=valor;
        if (tipus=='IdHechoVital') IdHechoVital=valor;
        if (tipus=='IdDestinatario') IdDestinatario=valor;
        
        var soapMessage="";
        
        soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        soapMessage += '    <soap:Body>'
        soapMessage += '        <DevolverGestiones xmlns="http://tempuri.org/">'
        soapMessage += '            <Idioma>' + idioma + '</Idioma>'
        soapMessage += '            <IdMateria>' + IdMateria + '</IdMateria>'
        soapMessage += '            <IdHechoVital>' + IdHechoVital + '</IdHechoVital>'
        soapMessage += '            <IdDestinatario>' + IdDestinatario + '</IdDestinatario>'
        soapMessage += '        </DevolverGestiones>'
        soapMessage += '    </soap:Body>'
        soapMessage += '</soap:Envelope>'   
        
        //alert(soapMessage);
     
        var url=urlServidor() + "wsSilAdmin/GesServeis.asmx?op=DevolverGestiones";
        //alert(url);
        
        $.ajax({
            url: url,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            complete: endDevolverGestiones,
            contentType: "text/xml; charset=\"utf-8\""
        });
        
        return false;
        
    }
    
}


function endDevolverGestiones(xmlHttpRequest, status)
{
    //alert(xmlHttpRequest.responseText)
    $.mobile.changePage("#pageTramits_Gestions");  
    $("#llistaTramits_Gestions_1").empty(); 
    var i=0;

    $(xmlHttpRequest.responseXML).find('ListadoGestion').each(function(){
        var Descrip = $(this).find('Descrip').text();
        var Id = $(this).find('Id').text();
        //alert(Descrip + " " + Id)
        $("#llistaTramits_Gestions_1").append('<li onclick="DevolverGestion(\'' + Id + '\')"><a href="#"><h3>' + Descrip +'</h3></a></li>');
        i++;        
    });
    if (i>0)
    {
        $('#p_Tramits_Gestions1').html(textIdioma(14))    
    }
    else{
        $('#p_Tramits_Gestions1').html(textIdioma(4))
    }
    $.mobile.hidePageLoadingMsg( 'Searching' );
    $("#llistaTramits_Gestions_1").listview("refresh");   
}



function DevolverGestion(valor)
{
    if (checkConnection()=="none")
    {
        msgError=textIdioma(0)
        $.mobile.changePage("#dialegError");    
    }
    else{
        $.mobile.showPageLoadingMsg( 'Searching' );
        
        var idioma="";
        if (currentIdioma=="cat") idioma=1;
        if (currentIdioma=="cas") idioma=2;
        if (currentIdioma=="ang") idioma=3;
        
        var soapMessage="";
        
        soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        soapMessage += '    <soap:Body>'
        soapMessage += '        <DevolverGestion xmlns="http://tempuri.org/">'
        soapMessage += '            <Idioma>' + idioma + '</Idioma>'
        soapMessage += '            <IdGestion>' + valor + '</IdGestion>'
        soapMessage += '        </DevolverGestion>'
        soapMessage += '    </soap:Body>'
        soapMessage += '</soap:Envelope>'   
        
        //alert(soapMessage);
     
        var url=urlServidor() + "wsSilAdmin/GesServeis.asmx?op=DevolverGestion";
        //alert(url);
        
        $.ajax({
            url: url,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            complete: endDevolverGestion,
            contentType: "text/xml; charset=\"utf-8\""
        });
        
        return false;
        
    }
    
}


function endDevolverGestion(xmlHttpRequest, status)
{
    //alert("1");
    try{
        xmlDoc=xmlHttpRequest.responseXML;
        $("#gestio_Titulo").html("");
        $("#gestio_AmbitoResponsabilidad").html("");
        $("#gestio_Objeto").html("");
        $("#gestio_QuienPuedeSolicitar").html("");
        $("#gestio_Requisitos").html("");
        $("#gestio_Documentacion").html("");
        $("#gestio_TramitacionPresencial").html("");
        $("#gestio_Correo").html("");
        
        $("#gestio_Fax").html("");
        $("#gestio_Mail").html("");
        $("#gestio_Otros").html("");
        $("#gestio_Web").html("");
        $("#gestio_Web").html("");
        $("#gestio_Telefono").html("");
        $("#gestio_QuePreguntar").html("");        
        $("#gestio_PlazosCiudadanos").html("");                                                        
        $("#gestio_PlazosEntidad").html("");
        $("#gestio_PlazosCiudadanos").html("");
        $("#gestio_Tarifas").html("");
        $("#gestio_Respuesta").html("");
        $("#gestio_MarcoLegal").html("");
        $("#gestio_SilencioAdministrativo").html("");
        $("#gestio_Observaciones").html("");
        
        
        
        $("#gestio_Titulo").html("<h3>" + xmlDoc.getElementsByTagName("Titulo")[0].childNodes[0].nodeValue + "</h3>");
        
        if (xmlDoc.getElementsByTagName("Link")[0].childNodes.length>0)
        {
            document.getElementById("btnDoTramit").style.visibility="visible";
            urlTramit = xmlDoc.getElementsByTagName("Link")[0].childNodes[0].nodeValue;
        }
        else{
            document.getElementById("btnDoTramit").style.visibility="hidden";
            urlTramit="";
        } 
        
        
        if (xmlDoc.getElementsByTagName("Objeto")[0].childNodes.length>0) $("#gestio_Objeto").html( xmlDoc.getElementsByTagName("Objeto")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("AmbitoResponsabilidad")[0].childNodes.length>0) $("#gestio_AmbitoResponsabilidad").html( xmlDoc.getElementsByTagName("AmbitoResponsabilidad")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("QuienPuedeSolicitar")[0].childNodes.length>0) $("#gestio_QuienPuedeSolicitar").html( xmlDoc.getElementsByTagName("QuienPuedeSolicitar")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Requisitos")[0].childNodes.length>0) $("#gestio_Requisitos").html( xmlDoc.getElementsByTagName("Requisitos")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Documentacion")[0].childNodes.length>0) $("#gestio_Documentacion").html( xmlDoc.getElementsByTagName("Documentacion")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("TramitacionPresencial")[0].childNodes.length>0) $("#gestio_TramitacionPresencial").html( xmlDoc.getElementsByTagName("TramitacionPresencial")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Correo")[0].childNodes.length>0) $("#gestio_Correo").html( xmlDoc.getElementsByTagName("Correo")[0].childNodes[0].nodeValue + "</strong>");
        
        if (xmlDoc.getElementsByTagName("FAX")[0].childNodes.length>0) $("#gestio_Fax").html( "Fax:" + xmlDoc.getElementsByTagName("FAX")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Mail")[0].childNodes.length>0) $("#gestio_Mail").html( "email: " + xmlDoc.getElementsByTagName("Mail")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Otros")[0].childNodes.length>0) $("#gestio_Otros").html( xmlDoc.getElementsByTagName("Otros")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Web")[0].childNodes.length>0) $("#gestio_Web").html( "web: " + xmlDoc.getElementsByTagName("Web")[0].childNodes[0].nodeValue + "</strong>");                                
        if (xmlDoc.getElementsByTagName("Telefono")[0].childNodes.length>0) $("#gestio_Telefono").html( "Tel: <a href=\"tel:" + xmlDoc.getElementsByTagName("Telefono")[0].childNodes[0].nodeValue + "\">" + xmlDoc.getElementsByTagName("Telefono")[0].childNodes[0].nodeValue + "</a></strong>");
        if (xmlDoc.getElementsByTagName("QuePreguntar")[0].childNodes.length>0) $("#gestio_QuePreguntar").html( xmlDoc.getElementsByTagName("QuePreguntar")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("PlazosCiudadanos")[0].childNodes.length>0) $("#gestio_PlazosCiudadanos").html( xmlDoc.getElementsByTagName("PlazosCiudadanos")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("PlazosEntidad")[0].childNodes.length>0) $("#gestio_PlazosEntidad").html( xmlDoc.getElementsByTagName("PlazosEntidad")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Tarifas")[0].childNodes.length>0) $("#gestio_Tarifas").html( xmlDoc.getElementsByTagName("Tarifas")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Respuesta")[0].childNodes.length>0) $("#gestio_Respuesta").html( xmlDoc.getElementsByTagName("Respuesta")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("MarcoLegal")[0].childNodes.length>0) $("#gestio_MarcoLegal").html( xmlDoc.getElementsByTagName("MarcoLegal")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("SilencioAdministrativo")[0].childNodes.length>0) $("#gestio_SilencioAdministrativo").html( xmlDoc.getElementsByTagName("SilencioAdministrativo")[0].childNodes[0].nodeValue + "</strong>");
        if (xmlDoc.getElementsByTagName("Observaciones")[0].childNodes.length>0) $("#gestio_Observaciones").html( xmlDoc.getElementsByTagName("Observaciones")[0].childNodes[0].nodeValue + "</strong>");
        
    }
    catch(Err)
    {
        alert(Err.toString());
    }

    $.mobile.hidePageLoadingMsg( 'Searching' );
    $.mobile.changePage("#pageTramits_Gestio");  
    
    
    var i=0;
    $("#llista_gestio_Documents").empty();
    
    $(xmlHttpRequest.responseXML).find('Documento').each(function(){
        var Descrip = $(this).find('Descrip').text();
        var URL = $(this).find('URL').text();
        URL = URL.replace(/\\/g, "/");
        $("#llista_gestio_Documents").append('<li onclick="fn_Document(\'' + URL + '\')"><a href="#"><h3>' + Descrip +'</h3></a></li>');
        i++;
    });    
    $("#llista_gestio_Documents").listview("refresh");   

    if (i>0)
    {
        document.getElementById("gestio_Documents").style.visibility="visible";
    }
    else{
        document.getElementById("gestio_Documents").style.visibility="hidden";
    }
  
}

function fn_tramitar()
{
    window.open(urlTramit, '_system');   
}

function fn_Document(urlDocument)
{
    window.open(urlDocument, '_system');   
}
