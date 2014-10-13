var currentIdioma="cat";
var matIdioma=null;
var itemsIdima=null;

function initIdioma()
{
	matIdioma=new Array();
	/* 0 */ matIdioma.push("No hi ha connexi&oacute; a internet|No hay connexion a Internet|No Internet connection")
	/* 1 */ matIdioma.push("No s'ha pogut localitzar la teva posici&oacute;|No se ha podido localizar tu posici&oacute;n|It is not possible to locate you")
	/* 2 */ matIdioma.push("Aquest municipi no ofereix aquesta funcionalitat...|Este municipio no ofrece esta funcionalidad...|This function is not available in this town...")	
	/* 3 */ matIdioma.push("<center>Et trobes a:<br><font size=5><b>MUNICIPI</b></font></center>|<center>Te encuentras en:<br><font size=5><b>MUNICIPI</b></font></center>|<center>You are in:<br><font size=5><b>MUNICIPI</b></font></center>")
	/* 4 */ matIdioma.push("No hi ha informaci&oacute; disponible.|No hay informaci&oacute;n disponible|There is no information available")
	/* 5 */ matIdioma.push("Carregant dades. Per favor, esperi...|Actualizando datos. Por favor, espere...|Loading data. Please, wait...")
	/* 6 */ matIdioma.push("Actes previstos:|Actos previstos:|Events:");
	/* 7 */ matIdioma.push("Darreres not&iacute;cies:|&Uacute;ltimas noticias:|Last news:");
	/* 8 */ matIdioma.push("Selecciona una opci&oacute;:<p>|Selecciona una opci&oacute;n:<p>|Choose an option:<p>");
	/* 9 */ matIdioma.push("<center><font size=5><b>MUNICIPI</b></font></center>|<center><font size=5><b>MUNICIPI</b></font></center>|<center><font size=5><b>MUNICIPI</b></font></center>");
	/* 10*/ matIdioma.push("Llista de comer&ccedil;os|Lista de comercios|Shooping list");
    /* 11*/ matIdioma.push("Tr&agrave;mits mat&egrave;ries. Selecciona un tr&agrave;mit|Tr&aacute;mites materias. Selecciona un tr&aacute;mite|Material procedures. Select an procedure");
    /* 12*/ matIdioma.push("Tr&agrave;mits fets. Selecciona un tr&agrave;mit|Tr&aacute;mites hechos. Selecciona un tr&aacute;mite|Fact procedures. Select an procedure")
    /* 13*/ matIdioma.push("Tr&agrave;mits destinataris. Selecciona un tr&agrave;mit|Tr&aacute;mites destinatarios. Selecciona un tr&aacute;mite|People procedures. Select an procedure")
    /* 14*/ matIdioma.push("Selecciona un tr&agrave;mit|Selecciona un tr&aacute;mite|Select an procedure")
    
    /* 15*/ matIdioma.push("Informaci&oacute; rellevant|Informaci&oacute;n relevante|Main Information")
    /* 16*/ matIdioma.push("Agenda|Agenda|Schedule")
    /* 17*/ matIdioma.push("Not&iacute;cies|Noticias|News")
    /* 18*/ matIdioma.push("Tr&agrave;mits|Tr&aacute;mites|Electronic procedures")
    /* 19*/ matIdioma.push("Envia'ns la teva queixa|Env&iacute;anos tu queja|Let us know what's wrong")
    /* 20*/ matIdioma.push("Guia de comer&ccedil;os|Gu&iacute;a de comercios|Shopping guide")
    
    /* 21*/ matIdioma.push("Pots seleccionar informaci&oacute; d&apos;una d&apos;aquestes entitats:<p>|Puedes seleccionar informaci&oacute;n de una de estas entidades:<p>|You can select information from one of these entities:<p>")
    /* 22*/ matIdioma.push("Idioma|Idioma|Language")
    /* 23*/ matIdioma.push("Sortir|Salir|Exit")
    /* 24*/ matIdioma.push("Inici|Inicio|Home")
    /* 25*/ matIdioma.push("Men&uacute;|Men&uacute;|Menu")
    /* 26*/ matIdioma.push("Enrere|Volver|Back")

    /* 27*/ matIdioma.push("Info Municipal|Info Municipal|Info")
    /* 28*/ matIdioma.push("Selecciona un tipus de tr&agrave;mit|Selecciona un tipo de tr&aacute;mite|Choose a procedure type:")
    /* 29*/ matIdioma.push("Mat&egrave;ries|Materias|Material")
    /* 30*/ matIdioma.push("Fets Vitals|Hechos Vitales|Living facts")
    /* 31*/ matIdioma.push("Destinataris|Destinatarios|Recipient")
    
    /* 32*/ matIdioma.push("Omple el formulari i envia'ns la teva queixa:|Rellena el formulario y env&iacute;anos tu queja|Complete the form and submit your complaint");
	/* 33*/ matIdioma.push("Nom|Nombre|Name")
	/* 34*/ matIdioma.push("Area de l'ajuntament:|Area del ayuntamiento:|Town hall area")
	/* 35*/ matIdioma.push("Comentari|Comentario|Comment")
	/* 36*/ matIdioma.push("Fotografia|Fotograf&iacute;a|Photo")
	/* 37*/ matIdioma.push("Seleccionar una foto|Seleccionar una foto|Choose a photo")
	/* 38*/ matIdioma.push("Fer una foto|Hacer una foto|Take a photo")
	/* 39*/ matIdioma.push("Enviar|Enviar|Send")
	/* 40*/ matIdioma.push("Fotografia guardada correctament|Fotografia guardada correctamente|Photo saved successfully")
	/* 41*/ matIdioma.push("Incidencia guardada correctament|Incidencia guardada correctamente|Report saved successfully")
	/* 42*/ matIdioma.push("Mapa|Mapa|Map")
    /* 43*/ matIdioma.push("Capes|Capas|Layers")	
    /* 44*/ matIdioma.push("On Soc|D&oacute;nde estoy|Where I am")
    /* 45*/ matIdioma.push("Aplica|Aplica|Apply")
    /* 46*/ matIdioma.push("Guia de carrers|Callejero|Address finder")
    /* 47*/ matIdioma.push("Benvinguts a Menorca|Bienvenido a Menorca|Welcome to Menorca")
    /* 48*/ matIdioma.push("La informaci&oacute; de Menorca a la teva butxaca|La informaci&oacute;n de Menorca en tu bolsillo|Menorca in your pocket")        
    /* 49*/ matIdioma.push("Informaci&oacute; tur&iacute;stica|Informaci&oacute;n tur&iacute;stica|Tourism Information")
    /* 50*/ matIdioma.push("Informaci&oacute; dels ajuntaments i Consell|Informaci&oacute;n de ayuntamientos y Consell|Town Hall Information")
    /* 51*/ matIdioma.push("Entitats Locals|Entidades locales|Local entities")
    /* 52*/ matIdioma.push("Qu&egrave; tinc aprop?|Qu&eacute; hay cerca|What's around");
    /* 53*/ matIdioma.push("Cercar informaci&oacute; en un radi de (metres):|Buscar informaci&oacute;n en un radio de (metros):|What's around (in meters)");
    /* 54*/ matIdioma.push("Sobre:|Sobre:|About:");
    /* 55*/ matIdioma.push("Catal&agrave;|Catal&aacute;n|Catalan");
    /* 56*/ matIdioma.push("Castell&agrave;|Español|Spanish");
    /* 57*/ matIdioma.push("Angl&eagrave;s|Ingl&eacute;s|English");
    /* 58*/ matIdioma.push("Resultats|Resultados|Results");
    
    /* 59*/ matIdioma.push("Dist&agrave;ncia|Distancia|Distance");
    /* 60*/ matIdioma.push("Temps|Tiempo|How long");
    /* 61*/ matIdioma.push("Desnivell acum. positiu|Desnivel acum. positivo|Elevation gain positive");
    /* 62*/ matIdioma.push("Dificultat|Dificultad|Dificulty");
    /* 63*/ matIdioma.push("Trets d'inter&egrave;s|Puntos de inter&eacute;s|Points of interest");
    /* 64*/ matIdioma.push("Descripci&oacute;|Descripci&oacute;n|Description");
    
	
	
	itemsIdioma=new Array();
	itemsIdioma.push("#btnHomeMunicipi|L&apos;Ajuntament t&apos;informa|El Ayutamiento te informa|Town Information")
	itemsIdioma.push("#btnHomeAgenda|Agenda|Agenda|Events")
	itemsIdioma.push("#btnHomeNoticies|Not&iacute;cies|Noticias|News")
	itemsIdioma.push("#btnHomeMapa|Mapa de la ciutat|Mapa de la ciudad|Map of town")
	itemsIdioma.push("#btnHomeCarrerer|Carrers i top&ograve;nims|Callejero y top&oacute;nimos|Find streets")
	itemsIdioma.push("#btnHomeApropr|Qu&egrave;tinc a a vora|Qu&eacute; tengo cerca|What's around")
	itemsIdioma.push("#btnHomeQueixes|Envia la teva queixa|Env&iacute;a tu queja|Suggestions")
	
	
	
	//itemsIdioma.push("#tabMunicipi|Municipi|Env&iacute;a tu queja|Suggestions")
	
	$('#play-btn').find('.ui-btn-text').text('Play');
	
}

function textIdioma(valor)
{
	var etiqueta="";
	for (var i=0;i<matIdioma.length;i++)
	{
		if (i==valor)
		{
			if (currentIdioma=="cat") etiqueta=matIdioma[i].split("|")[0];
			if (currentIdioma=="cas") etiqueta=matIdioma[i].split("|")[1];
			if (currentIdioma=="ang") etiqueta=matIdioma[i].split("|")[2];
			break;
		}
	}
	return etiqueta;
}

function doIdioma(valor)
{
	var icona="";
    if(currentIdioma=="cat") icona="ui-icon-idioma-cat";
    if(currentIdioma=="cas") icona="ui-icon-idioma-cas";
    if(currentIdioma=="ang") icona="ui-icon-idioma-eng";


    if (valor=="cat") 
    {
    	$('#tabIdioma0a').attr('data-icon','ui-icon-idioma-cat');
    	$('#tabIdioma0a').children().children().next().removeClass(icona).addClass('ui-icon-idioma-cat');
    }
    if (valor=="cas") 
    {
    	$('#tabIdioma0a').attr('data-icon','ui-icon-idioma-cas');
    	$('#tabIdioma0a').children().children().next().removeClass(icona).addClass('ui-icon-idioma-cas');
    }
    if (valor=="ang") 
    {
    	$('#tabIdioma0a').attr('data-icon','ui-icon-idioma-eng');
    	$('#tabIdioma0a').children().children().next().removeClass(icona).addClass('ui-icon-idioma-eng');
    }
    	    
	//$('#tabIdioma0a').attr('data-icon','idioma-eng');
	//$('#tabIdioma0a').children().children().next().removeClass(icona).addClass('ui-icon-idioma-eng');	

	currentIdioma=valor;    

    /*
    $("input[name*=radio-idioma]:checked").each(function() {
    	currentIdioma = $(this).val();
    });
    */
   
   //Splash
   $("#splash_lblIdioma").html(textIdioma(22));
   $("#splash_lblIdioma2").html(textIdioma(23));
   
   
    //PageMainMunicipi
    $("#lblIdioma0").html(textIdioma(22));
    $("#muni_lblTitol").html(textIdioma(51));
    $("#muni_lblInici").html(textIdioma(26));
    

    //PageMainMunicipi2
    $("#lblIdioma0").html(textIdioma(22));
    $("#muni2_lblInici").html(textIdioma(26));

    
    //Home
    $("#lblListMenu").html(textIdioma(8) + "<p>");
    $("#muni2_lblTitol").html(textIdioma(24));
    $("#home_lblTitol").html(textIdioma(27));
    
    //pageInfoMunicipal
    $("#Info_lblInici").html(textIdioma(26));
    $("#InfoMunicipal_lblTitol").html(textIdioma(15));

    //pageInfoMunicipalDetall
    $("#InfoDetall_lblBack").html(textIdioma(26));
    $("#InfoDetall_lblMenu").html(textIdioma(25));
    $("#InfoMunicipalDetall_lblTitol").html(textIdioma(15));
    
    //pageAgenda
    $("#Agenda_lblInici").html(textIdioma(26));
    $("#Agenda_lblTitol").html(textIdioma(16));

    //pagePublicacio
    $("#Publicacio_lblBack").html(textIdioma(26));
    $("#Publicacio_lblMenu").html(textIdioma(25));        

    //pageNoticies
    $("#Noticies_lblInici").html(textIdioma(26));
    $("#Noticies_lblTitol").html(textIdioma(17));

    //pageTramits
    $("#Tramits_lblInici").html(textIdioma(26));
    $("#Tramits_lblTitol").html(textIdioma(18));
    $("#p_Tramits1").html(textIdioma(28));
    $("#lblBtnTram_1").html(textIdioma(29));
    $("#lblBtnTram_2").html(textIdioma(30));
    $("#lblBtnTram_3").html(textIdioma(31));
    
    //pageTramitsMat
    $("#TramitsMat_lblInici").html(textIdioma(26));
    $("#TramitsMat_lblMenu").html(textIdioma(25));
    $("#TramitsMat_lblTitol").html(textIdioma(18));    

    //pageTramitsFets
    $("#TramitsFets_lblInici").html(textIdioma(26));
    $("#TramitsFets_lblMenu").html(textIdioma(25));
    $("#TramitsFets_lblTitol").html(textIdioma(18));     

    //pageTramitsDest
    $("#TramitsDest_lblInici").html(textIdioma(26));
    $("#TramitsDest_lblMenu").html(textIdioma(25));
    $("#TramitsDest_lblTitol").html(textIdioma(18));  
   
    //pageTramitsGest
    $("#TramitsGest_lblInici").html(textIdioma(26));
    $("#TramitsGest_lblMenu").html(textIdioma(25));
    $("#TramitsGest_lblTitol").html(textIdioma(18));  

    //pageTramits_Gestio
    $("#Tramit_lblInici").html(textIdioma(26));
    $("#Tramit_lblMenu").html(textIdioma(25));
    $("#Tramit_lblTitol").html(textIdioma(18));  
            
    //pageComer
    $("#comer_lblInici").html(textIdioma(26));
    $("#titolPageComer").html(textIdioma(20));

    //pageComerDet
    $("#comerDet_lblInici").html(textIdioma(26));
    $("#comerDet_lblMenu").html(textIdioma(25));
    $("#titolPageComer2").html(textIdioma(20));
    
    //pageQueixes
    $("#Queixes_lblInici").html(textIdioma(26));
    $("#Queixes_lblTitol").html(textIdioma(19));
    $("#Queixes_p1").html(textIdioma(32));
    $("#Queixes_nom").html(textIdioma(33));
    $("#Queixes_area").html(textIdioma(34));               
    $("#Queixes_comentari").html(textIdioma(35));
    $("#Queixes_foto").html(textIdioma(36));
    $("#Queixes_select").html(textIdioma(37));
    $("#Queixes_take").html(textIdioma(38));
    $("#Queixes_send").html(textIdioma(39));
    
    //mainContainer
    $("#Map_lblInici").html(textIdioma(26));
    $("#Map_lblTitol").html(textIdioma(42));
    $("#Map_lblCapes").html(textIdioma(43));
    $("#Map_lblOnSoc").html(textIdioma(44));
       
    //capes
    $("#capes_lblInici").html(textIdioma(26));
    $("#capes_lblTitol").html(textIdioma(42));
    $("#capes_lblAplica").html(textIdioma(43));

    //pageSplash
    $("#splash_lbl1").html(textIdioma(47));
    $("#splash_lbl2").html(textIdioma(48));
    $("#splash_peu_1").html(textIdioma(49));
    $("#splash_peu_2").html(textIdioma(50));

    //pageTurisme1
    $("#tur1_lblInici").html(textIdioma(25));
    $("#tur_lblTitol").html(textIdioma(49));
    $("#lbl_Tur1").html(textIdioma(49));
    $("#lbl_Tur2").html(textIdioma(8) + "<br>");
    $("#lbl_aprop1").html(textIdioma(52));
    

    //pageTurisme2
    $("#tur2_lblInici").html(textIdioma(26));
    $("#tur2_lblTitol").html(textIdioma(49));
    $("#lbl_Tur3").html(textIdioma(49));
    $("#lbl_Tur4").html(textIdioma(8) + "<br>");                        

    //pageTurisme3
    $("#tur3_lblInici").html(textIdioma(26));
    $("#tur3_lblTitol").html(textIdioma(49));
    $("#lbl_Tur5").html(textIdioma(49));

    //pageTurisme4
    $("#tur4_lblInici").html(textIdioma(26));
    $("#tur4_lblTitol").html(textIdioma(49));
    $("#lbl_Tur6").html(textIdioma(49));
    $("#lbl_Tur7").html(textIdioma(8) + "<br>");        
    
    //infoList
    $("#InfoList_lblInici").html(textIdioma(26));
    $("#InfoList_lblTitol").html(textIdioma(52));
    $("#lbl_InfoList1").html(textIdioma(52));
    $("#lblSlider").html(textIdioma(53));
    $("#lbl_InfoList2").html(textIdioma(54));
                    
    //infoCand
    $("#InfoCand_lblInici").html(textIdioma(26));
    $("#InfoCand_lblTitol").html(textIdioma(52));
    $("#InfoCad_lblResultats").html(textIdioma(58));

    //infoFitxaRUTA
    $("#lblFitxaRuta0").html(textIdioma(26));
    $("#titolFitxaRuta").html(textIdioma(52));
    $("#lblFitxaRuta1").html(textIdioma(59));
    $("#lblFitxaRuta2").html(textIdioma(60));
    $("#lblFitxaRuta3").html(textIdioma(61));
    $("#lblFitxaRuta4").html(textIdioma(62));
    $("#lblFitxaRuta5").html(textIdioma(63));
    $("#lblFitxaRuta6").html(textIdioma(64));
                        
    setHeaderFixe();
    //if (apkTurisme==true) $.mobile.changePage($("#splash"));
    $.mobile.changePage('#pageSplash');
    
    /*
	for (var i=0;i<itemsIdioma.length;i++)
	{
		if (currentIdioma=="cat") 
		{
			$(itemsIdioma[i].split("|")[0] + " span").text(itemsIdioma[i].split("|")[1])
		}
		if (currentIdioma=="cas") $(itemsIdioma[i].split("|")[0] + " span").text(itemsIdioma[i].split("|")[2])
		if (currentIdioma=="ang") $(itemsIdioma[i].split("|")[0] + " span").text(itemsIdioma[i].split("|")[3])
	}
	*/
	//setHeader()
    //$.mobile.changePage("#home");
}
