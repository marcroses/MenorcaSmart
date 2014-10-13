var buscadorToponimsId=sitmunProperties["reneix.buscadorToponimsId"]; 
var buscadorOfertaId=sitmunProperties["reneix.buscadorOfertaId"];
var buscadorAdrMunicipi=sitmunProperties["reneix.buscadorAdrMunicipi"];
var buscadorAdrNucli=sitmunProperties["reneix.buscadorAdrNucli"];
var buscadorAdrCarrer=sitmunProperties["reneix.buscadorAdrCarrer"];
var buscadorAdrPortal=sitmunProperties["reneix.buscadorAdrPortal"];
var buscadorAdrGeomCarrer=sitmunProperties["reneix.buscadorAdrGeomCarrer"];
var infoListConsulta=sitmunProperties["reneix.infoListConsulta"];
var infoRutaHabitat=sitmunProperties["reneix.infoRutaHabitat"];
var infoRutaEspecie=sitmunProperties["reneix.infoRutaEspecie"];

var msgError="";
var currentPage="";
var menuIniciat=false;
var refrescaInfo=true;
var buscadorCarrersInit=false;
var idTurisme="";
var idTurismeLlista="";
/**
 *  ????
 */
(function(window, $, PhotoSwipe){
	$(document).ready(function(){
		$('div.gallery-page')
			.on('pageshow', function(e){
				var 
				currentPage = $(e.target),
				options = {},
				photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
				return true;
				
			})
			.on('pagehide', function(e){
				var 
					currentPage = $(e.target),
					photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));

				if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
					PhotoSwipe.detatch(photoSwipeInstance);
				}
				return true;						
			});				
	});
}(window, window.jQuery, window.Code.PhotoSwipe));

//============================
//Capóaleres
//============================
$(document).on("pagebeforeshow","#pageAgendaCultural",function(event){
  document.getElementById("capAgenda").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageNoticies",function(event){
  document.getElementById("capNoticies").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageInfoMunicipal",function(event){
  document.getElementById("capInfoMunicipal").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageInfoMunicipalDetall",function(event){
  document.getElementById("capInfoMunicipalDetall").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pagePublicacio",function(event){
  document.getElementById("capPublicacio").innerHTML = document.getElementById("cap").innerHTML;
  document.getElementById("contentPublicacio").innerHTML ="";
});
$(document).on("pagebeforeshow","#pageTramits",function(event){
  document.getElementById("capTramit").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageTramits_Mat",function(event){
  document.getElementById("capTramit_Mat").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageTramits_Dest",function(event){
  document.getElementById("capTramit_Dest").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageTramits_Fets",function(event){
  document.getElementById("capTramit_Fets").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageTramits_Gestions",function(event){
  document.getElementById("capTramit_Gestions").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageTramits_Gestio",function(event){
  document.getElementById("capTramit_Gestio").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageComer",function(event){
  document.getElementById("capComer").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageComerDetall",function(event){
  document.getElementById("capComerDetall").innerHTML = document.getElementById("cap").innerHTML;
});
$(document).on("pagebeforeshow","#pageQueixes",function(event){
  document.getElementById("capQueixa").innerHTML = document.getElementById("cap").innerHTML;
});


// Assignem events d'inicialitzacio de pagines
//================================================================================
//PAGE SPLASH
//================================================================================
$(document).on ('pageinit', '#pageSplash', function (event) {
    $("#tabExit1a").bind('click', function(event, ui){
        navigator.app.exitApp();
    }); 
    
});

//================================================================================
//PAGE PAGEMAINMUNICIPI
//================================================================================
$(document).on ('pageinit', '#pageMainMunicipi', function (event) {
  currentPage="#pageMainMunicipi";
   
  // lllista de municipis
  $("#llistaMainMunicipis").on('click', 'li', function() {
		console.log("llistaMainMunicipis click");
		currentMunicipi=$(this).attr("key");
		//alert(currentMunicipi);
		preparaMenu(currentMunicipi);
  }) 
  
  $("#btnGoHome").bind('click', function(event, ui){
        position=new OpenLayers.LonLat(currentLon,currentLat);
        selectedMuni=false;
        if(position!=null)
        {
            map.setCenter(position, 12);
        }        
        setHeaderFixe();
        $.mobile.changePage("#home");
  });  
  menuIniciat=true;
});

$(document).on ('pageshow', '#pageMainMunicipi', function (event) {
	currentPage="#pageMainMunicipi";
	refrescaInfo=true;
	$("#lblMunicipi").html(textIdioma(21))
	//creaMenuPral();
});

//================================================================================
//PAGE PAGEMAINMUNICIPI2
//================================================================================
$(document).on ('pageinit', '#pageMainMunicipi2', function (event) {
currentPage="#pageMainMunicipi2";
$("#tabExit3a").bind('click', function(event, ui){
    navigator.app.exitApp()
}) 

// lllista de municipis
$("#llistaMainMunicipis2").on('click', 'li', function() {
		console.log("llistaMainMunicipis2 click");
		currentMunicipi=$(this).attr("key");
		//alert(currentMunicipi)
		preparaMenu(currentMunicipi);
}) 
//menuIniciat=true;
});

$(document).on ('pageshow', '#pageMainMunicipi2', function (event) {
	currentPage="#pageMainMunicipi2";
	refrescaInfo=true;
	//creaMenuPral();
});


//================================================================================
//PAGE HOME
//================================================================================
$(document).on ('pageinit', '#home', function (event) {
	currentPage="#hone";
    $("#tabExit1").bind('click', function(event, ui){
        navigator.app.exitApp()
    });
    $("#btnHomeMapa").bind('click', function(event, ui){
    	$.mobile.changePage("#mainContainer");
    })     
    
    menuIniciat=true;
});

$(document).on ('beforepageshow', '#home', function (event) {
    $("#llistaMenuPral").listview("refresh");
});

$(document).on ('pageshow', '#home', function (event) {
	currentPage="#hone";
	refrescaInfo=true;
	$("#llistaMenuPral").listview("refresh");
	//creaMenuPral();
});

//================================================================================
//PAGE SEARCH
//================================================================================
$(document).on ('pageinit', '#buscador', function (event) {
	initBuscador();
});
$(document).on ('pageinit', '#searchpageCarrers1', function (event) {
	initBuscadorCarrers();
});
$(document).on ('pageinit', '#searchpageCarrers2', function (event) {
    if (buscadorCarrersInit==false) initBuscadorCarrers();
});
$(document).on ('pageinit', '#infoList', function (event) {
	initInformacio();
});
$(document).on ('pageinit', '#searchpageOferta', function (event) {
	initBuscadorOferta();
});
$(document).on ('pageshow', '#buscador', function (event) {
	currentPage="#buscador";
});
$(document).on ('pageshow', '#searchpageCarrers1', function (event) {
	currentPage="#searchpageCarrers1";
});
$(document).on ('pageshow', '#infoList', function (event) {
	currentPage="#infoList";
});
$(document).on ('pageshow', '#searchpageOferta', function (event) {
	currentPage="#searchpageOferta";
});

//================================================================================
//PAGE IDIOMA
//================================================================================
$(document).on ('pageinit', '#pageIdioma', function (event) {
    $("#btnAcceptarIdioma").bind('click', function(event, ui){
        doIdioma()
    }) 
    
});
$(document).on('pageshow', '#pageIdioma',  function(){
	currentPage="#pageIdioma";
	$("#radio-idioma" + currentIdioma).attr("checked", true).checkboxradio("refresh");
    $('input[name=radio-idioma]').checkboxradio("refresh");
});	

//================================================================================
//PAGE MUNICIPI
//================================================================================
$(document).on ('pageinit', '#pageMunicipi', function (event) {
    $("#btnAcceptarMunicipi").bind('click', function(event, ui){
        $("input[name*=radio-municipi]:checked").each(function() {
        	currentMunicipi = $(this).val();
        });    
        //alert(currentMunicipi)
    	preparaMenu(currentMunicipi)
    }) 
});

$(document).on ('pageshow', '#pageMunicipi', function (event) {
	currentPage="#municipi";
});
//================================================================================
//PAGE INFORMACIO MUNICIPAL
//================================================================================
$(document).on ('pageshow', '#pageInfoMunicipal', function (event) {
	if (refrescaInfo==true)
	{
		//Mirem que hi hagi connexió a Internet
		if (checkConnection()=="none")
		{
			msgError=textIdioma(0)
			$('#txtError').html(msgError)
			$.mobile.changePage("#dialegError");
		}
		else{
			currentPage="#pageInfoMunicipal";
			$("#contentMunicipi").html("<br>" + textIdioma(5));
		    $("#llistaInfoMunicipi").empty(); 
		    //alert(currentMunicipi)
		    webMunicipi(currentMunicipi)
		    refrescaInfo=false;
		}
	}
	
		
});
//================================================================================
//PAGE AGENDA
//================================================================================
$(document).on('pageshow', '#pageAgendaCultural',  function(){
	currentPage="#pageAgendaCultural";
	
	//alert("refrescaInfo: " + refrescaInfo)
	if (refrescaInfo==true)
	{
		//Mirem que hi hagi connexió a Internet
		if (checkConnection()=="none")
		{
			msgError=textIdioma(0)
			$('#txtError').html(msgError)
			$.mobile.changePage("#dialegError");
		}
		else{
		    $.mobile.showPageLoadingMsg('Searching');
			$("#contentAgenda").html("<br>" + textIdioma(5));
		    $("#llistaAgenda").empty(); 
		    //json_agenda()	
		    agenda()
		    refrescaInfo=false;
		    $.mobile.hidePageLoadingMsg('Searching');
		}
	}
});
$(document).on('pageinit', '#pageAgendaCultural',  function(){
		/*
	  	if ($("#contentAgenda").html()=="Carregant dades. Per favor, esperi...")
		{
	      $("#llistaAgenda").empty(); 
	      json_agenda()	
	      $("#contentAgenda").html("Actes previstos:");
		}
		*/
})  
//================================================================================
//PAGE NOTICIES
//================================================================================
$(document).on('pageshow', '#pageNoticies',  function(){
	currentPage="#pageNoticies";
	//alert("refrescaInfo: " + refrescaInfo)
	if (refrescaInfo==true)
	{
		//Mirem que hi hagi connexió a Internet
		if (checkConnection()=="none")
		{
			msgError=textIdioma(0)
			$('#txtError').html(msgError)
			$.mobile.changePage("#dialegError");
		}
		else{
		    $.mobile.showPageLoadingMsg('Searching');
			$("#contentNoticies").html("<br>" + textIdioma(5));
		    $("#llistaNoticies").empty(); 
		    //json_noticies()	
		    noticies();
		    refrescaInfo=false;
		    $.mobile.hidePageLoadingMsg('Searching');
		}
	}	
	
});

$(document).on('pageinit', '#pageNoticies',  function(){

});

//================================================================================
//PAGE COMER DETALL
//================================================================================
$(document).on('pageshow', '#pageComerDetall',  function(){
    currentPage="#pageComerDetall";
    if (comerX!="")
    {
        mapCanvas.setCenter(new OpenLayers.LonLat(comerX,comerY), 13);
    }
    else
    {
        //alert("Establiment no ubicat");
    }
    
});
$(document).on('pageinit', '#pageComerDetall',  function(){
    $("#tabMapa1").bind('click', function(event, ui){
            mapCanvas.setBaseLayer(mapCanvas.layers[0]);
            mapCanvas.layers[0].setIsBaseLayer(true);
            mapCanvas.layers[1].setVisibility(false);
    });
    $("#tabMapa2").bind('click', function(event, ui){
            mapCanvas.setBaseLayer(mapCanvas.layers[1]);
            mapCanvas.layers[1].setIsBaseLayer(true);
            mapCanvas.layers[0].setVisibility(false);
    });
})  




//================================================================================
//PAGE COMER
//================================================================================
$(document).on('pageshow', '#pageComer',  function(){
    currentPage="#pageComer";
    //alert("refrescaInfo: " + refrescaInfo)
    if (refrescaInfo==true)
    {
        if (checkConnection()=="none")
        {
            msgError=textIdioma(0)
            $('#txtError').html(msgError)
            $.mobile.changePage("#dialegError");
        }
        else{
            $("#contentComer").html(textIdioma(5));
            $("#Comer").empty(); 
            $("#llistaComer").empty();
            comercos();
            refrescaInfo=false;
        }
    }
});
	
//================================================================================
//PAGE QUEIXES
//================================================================================
$(document).on('pageshow', '#pageQueixes',  function(){
    currentPage="#pageQueixes";
    $("#IdArea").empty();
    getAreas(currentMunicipi);
    $("#Texte").val();
    $("#Nom").val();
    $("#Mail").val();
    document.getElementById('camera_status').innerHTML='';
});

//================================================================================
//PAGE TRAMITS
//================================================================================
$(document).on('pageinit', '#pageTramits',  function(){
        $("#btnHomeTramits_Tots").bind('click', function(event, ui){
                $("#p_Tramits_Gestions").html(textIdioma(5));
                $("#llistaTramits_Gestions_1").empty();
                DevolverGestiones('','');
                $.mobile.changePage("#pageTramits_Gestions");  
        });  
});


//================================================================================
//PAGE TRAMITS_MAT
//================================================================================
$(document).on('pageshow', '#pageTramits_Mat',  function(){
    currentPage="#pageTramits_Mat";
        if (checkConnection()=="none")
        {
            msgError=textIdioma(0)
            $('#txtError').html(msgError)
            $.mobile.changePage("#dialegError");
        }
        else{
            $.mobile.showPageLoadingMsg('Searching');
            $("#p_Tramits_Mat1").html(textIdioma(5));
            $("#llistaTramits_Mat_1").empty();
            DevolverMaterias()
            $.mobile.hidePageLoadingMsg('Searching'); 
        }
});

//================================================================================
//PAGE TRAMITS_FETS
//================================================================================
$(document).on('pageshow', '#pageTramits_Fets',  function(){
    currentPage="#pageTramits_Fets";
        if (checkConnection()=="none")
        {
            msgError=textIdioma(0)
            $('#txtError').html(msgError)
            $.mobile.changePage("#dialegError");
        }
        else{
            $.mobile.showPageLoadingMsg('Searching');
            $("#p_Tramits_Fets1").html(textIdioma(5));
            $("#llistaTramits_Fets_1").empty();
            DevolverHechosVitales()
            $.mobile.hidePageLoadingMsg('Searching'); 
        }
});

//================================================================================
//PAGE TRAMITS_DEST
//================================================================================
$(document).on('pageshow', '#pageTramits_Dest',  function(){
    currentPage="#pageTramits_Dest";
        if (checkConnection()=="none")
        {
            msgError=textIdioma(0)
            $('#txtError').html(msgError)
            $.mobile.changePage("#dialegError");
        }
        else{
            $.mobile.showPageLoadingMsg('Searching');
            $("#p_Tramits_Dest1").html(textIdioma(5));
            $("#llistaTramits_Dest_1").empty();
            DevolverDestinatarios()
            $.mobile.hidePageLoadingMsg('Searching');    
        }
});

function uploadFile(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://www.troopha.com/phonegap/uploadFoto.php"), win, fail, options);
}

function win(r) {
	$.mobile.changePage("#dialegUpdate");
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    
    
}

function fail(error) {
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}


//================================================================================
//PAGE ERROR
//================================================================================
$(document).on('pageinit', '#dialegError',  function(){
    $("#btnQuitError").bind('click', function(event, ui){
    	if (currentPage == "")
    	{
    		navigator.app.exitApp()
    	}
    	else{
        	if (currentPage == "#pageHelp")
        	{
        		$.mobile.changePage("#pageHelp");
        	}
        	else{
        		$.mobile.changePage("#home");	
        	}
    		
    	}

    }) 
});


//================================================================================
//PAGE TURISME1
//================================================================================
$(document).on ('pageinit', '#pageTurisme1', function (event) {
  currentPage="#pageTurisme1";

  $("#llistaTurisme").on('click', 'li', function() {
        idTurisme = $(this).attr("key");
        $("#lbl_Tur3").html($(this).text());
        $.mobile.changePage("#pageTurisme2");

  }) 

});


//================================================================================
//PAGE TURISME2
//================================================================================
$(document).on('pageshow', '#pageTurisme2',  function(){
    $("#llistaTurisme2").empty(); 
    $.mobile.showPageLoadingMsg('Searching');
    turisme(idTurisme);
    $.mobile.hidePageLoadingMsg('Searching');    
});

//================================================================================
//PAGE TURISME4
//================================================================================
$(document).on('pageinit', '#pageTurisme4',  function(){
    $("#btnTurismeMore2").bind('click', function(event, ui){
		fn_turismeMore();
    })     
})  

$(document).on('pageshow', '#pageTurisme4',  function(){
    turismeLlista(idTurismeLlista);
});

//================================================================================
//PAGE TURISME3
//================================================================================
$(document).on('pageinit', '#pageTurisme3',  function(){
    $("#tabMapa1a").bind('click', function(event, ui){
            mapCanvas2.setBaseLayer(mapCanvas2.layers[0]);
            mapCanvas2.layers[0].setIsBaseLayer(true);
            mapCanvas2.layers[1].setVisibility(false);
    });
    $("#tabMapa2a").bind('click', function(event, ui){
            mapCanvas2.setBaseLayer(mapCanvas2.layers[1]);
            mapCanvas2.layers[1].setIsBaseLayer(true);
            mapCanvas2.layers[0].setVisibility(false);
    });
    
    
    $("#btnTurismeMore").bind('click', function(event, ui){
		fn_turismeMore();
    })     
    
})  


//================================================================================
//PAGE openlayermap_loaded
//================================================================================

$(document).on("openLayerMap_loaded", function () {
	//activamos capa de getFeatureInfo
	getFeatureInfoLayer.activate();
	if (currentLon==null) 
	{
		$('#lblInfo0').html("Iniciant geolocalitzaci&oacute...")
		//initGeolocate();
		onSoc()
	}
});

/**
 * 
 * @param olMap
 */
/*function fixContentHeight2(olMap) {
    var footer = $("div[data-role='footer']:visible"),
        content = $("div[data-role='content']:visible:visible"),
        viewHeight = $(window).height(),
        contentHeight = viewHeight - footer.outerHeight();

    if ((content.outerHeight() + footer.outerHeight()) !== viewHeight) {
        contentHeight -= (content.outerHeight() - content.height() + 1);
        content.height(contentHeight);
    }
    content.width($(window).width());
    olMap.updateSize();
}*/

/*
$( document ).on( "pageinit", "#mainContainer", function( event ) {
  alert( "mainContainer init" );
  //$.mobile.changePage($("#page2"));
});*/

//fix the content height AFTER jQuery Mobile has rendered the map page
/*$('#mainContainer').on('pageshow',function (){
    fixContentHeight();
});*/

/**
 * 
 */
function initBuscador() {

	$( "#autocomplete_topo" ).on( "listviewbeforefilter", function ( e, data ) {
		var $ul = $( this ),
			$input = $( data.input ),
			value = $input.val(),
			html = "";
		$ul.html( "" );
		if ( value && value.length > 2 ) {
			$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
			$ul.listview( "refresh" );
			$.ajax({
				url: "http://ide.cime.es/sitmun/rest/localizador",
				dataType: "jsonp",
				crossDomain: false,
				data: {
					id: buscadorToponimsId
					,valor: $input.val()
				}
			})
			.then( function ( response ) {
				console.log("response: ",response);
								
				if(response.data.length==0){
					html='<li>'+nls.MA_CAND_SENSE_CAND +'</li>';
				}
				else{
					$.each( response.data, function ( i, item ) {
						html += "<li THE_GEOM='"+item.THE_GEOM+"'>" + item.TEXT + "</li>";
					});
				}
				$ul.html( html );
				$ul.listview( "refresh" );
				$ul.trigger( "updatelayout");
				
			});
		}
	}).on("click", "li", function() {
		var text=$(this).text();
		var the_geom=$(this).attr("the_geom");
		
		console.log("li " ,text,the_geom); // id of clicked li by directly accessing DOMElement property
		if(the_geom) addMarker(the_geom);        
    });
}

/**
 * 
 */
function initBuscadorOferta() {

	$( "#autocomplete_oferta" ).on( "listviewbeforefilter", function ( e, data ) {
		var $ul = $( this ),
			$input = $( data.input ),
			value = $input.val(),
			html = "";
		$ul.html( "" );
		if ( value && value.length > 2 ) {
			$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
			$ul.listview( "refresh" );
			$.ajax({
				url: "http://ide.cime.es/sitmun/rest/localizador",
				dataType: "jsonp",
				crossDomain: false,
				data: {
					id: buscadorOfertaId
					,valor: $input.val()
					,lang:lang
				}
			})
			.then( function ( response ) {
				console.log("response: ",response);
								
				if(response.data.length==0){
					html='<li>'+nls.MA_CAND_SENSE_CAND +'</li>';
				}
				else{
					$.each( response.data, function ( i, item ) {
						if(item.THE_GEOM !=null)
							html += "<li THE_GEOM='"+item.THE_GEOM+"'>" + item.TEXT + "</li>";
						else html += "<li ID='"+item.ID+"' DSTIPUS='"+item.DSTIPUS+"'" +
								" ETRSXMIN='"+item.ETRSXMIN+"' ETRSYMIN='"+item.ETRSYMIN+"' ETRSXMAX='"+item.ETRSXMAX+"' ETRSYMAX='"+item.ETRSYMAX+"'> " + item.TEXT + "</li>"; 
					});
				}
				$ul.html( html );
				$ul.listview( "refresh" );
				$ul.trigger( "updatelayout");
				
			});
		}
	}).on("click", "li", function() {
		var text=$(this).text();
		var the_geom=$(this).attr("the_geom");
		var idRuta=$(this).attr("id");
		var dsTipus=$(this).attr("dstipus");
		var etrsxmin=$(this).attr("etrsxmin");
		var etrsymin=$(this).attr("etrsymin");
		var etrsxmax=$(this).attr("etrsxmax");
		var etrsymax=$(this).attr("etrsymax");
		
        if(the_geom) addMarker(the_geom); 
        else marcarRuta(idRuta, dsTipus, etrsxmin,etrsymin,etrsxmax,etrsymax);
    });
}


/**
 * Inicialitza els controls per la cerca de carrers.
 */
function initBuscadorCarrers() {
	try {
		console.log("initBuscadorCarrers");
		buscadorCarrersInit=true;
		// lllista de municipis
		$("#llistaMunicipis").on('click', 'li', function() {
			console.log("llistaMunicipis click");
			var id=$(this).attr("key");
			var ds=$(this).text();
			
			
			searchAdrecaGeneric(buscadorAdrNucli,id,"#llistaNuclis","#searchpageCarrers2");
			$("#btMunicipi1 .ui-btn-text").text(ds);
		});
		
		// llista de nuclis
		$("#llistaNuclis").on('click', 'li', function() {
			console.log("llistaNuclis click");
			var id=$(this).attr("key");
			var ds=$(this).text();
			
			searchAdrecaGeneric(buscadorAdrCarrer,id,"#llistaCarrers",'#searchpageCarrers3');
			$("#btMunicipi2 .ui-btn-text").text($("#btMunicipi1 .ui-btn-text").text());
			$("#btNucli1 .ui-btn-text").text(ds);
			
		});
		
		// llista de carrers
		$("#llistaCarrers").on('click', 'li', function() {
			console.log("llistaCarrers click");
			var id=$(this).attr("key");
			var ds=$(this).text();
			
			//searchLoadPortals(id);
			searchAdrecaGeneric(buscadorAdrPortal,id,"#llistaPortals",'#searchpageCarrers4');
			$("#btMunicipi3 .ui-btn-text").text($("#btMunicipi1 .ui-btn-text").text());
			$("#btNucli2 .ui-btn-text").text($("#btNucli1 .ui-btn-text").text());			
			$("#btCarrer1 .ui-btn-text").text(ds);
		});
		
		// llista de portals
		$("#llistaPortals").on('click', 'li', function() {
			var text=$(this).text();
			var the_geom=$(this).attr("the_geom");
			var carrer=$(this).attr("carrer");
						
			//Si indiquem geometria hi ha portal
			//Si indiquem carrer, no hi ha portal, hi ha carrer
			console.log("li " ,text,the_geom); 
	        if(the_geom) addMarkerIcon(the_geom,'img/pois/groc32.png');
	        else if (carrer)marcarCarrer(carrer);
		});
	} catch (e) {
		console.error("Error a initBuscadorCarrers()",e);
	}
}

/**
 * Executa la cerca del localitzador i emplena el listbox amb el resultats.
 * 
 * @param locId id del localitzador.
 * @param value valor a cercar.
 * @param listviewId identificador del listview. Ex: "#llistaNom".
 */
function searchAdrecaGeneric(locId,value,listviewId,targetPageId) {
	//$.mobile.showPageLoadingMsg( 'Searching' );
	$.ajax({
		type: "POST",
		url: "http://ide.cime.es/sitmun/rest/localizador",
		data: {
			id: locId
			,valor: value
		},
		cache: false,
		dataType: 'json',
		success: function(data) { //Si se ejecuta correctamente
			if(!data.error){
				//Inicializa la lista desplegable
				$(listviewId).empty();
				if(data.data!=null){
					//Inserta los valores recuperados en la lista desplegable
					if(data.data.length==0){
						//Si no hay portales, marcamos la calle directamente
						if(targetPageId=='#searchpageCarrers4'){
							$(listviewId).append('<li carrer="'+value+'">'+nls.MA_CAND_SENSE_PORTAL+'</li>');
							
						}
						else $(listviewId).append('<li>'+nls.MA_CAND_SENSE_CAND +'</li>');
					}
					else{
						$.each(data.data, function(i, item) {
							var geom="";
							if (item.THE_GEOM) geom=' the_geom="'+item.THE_GEOM+'"';
							
							$(listviewId).append('<li key="'+item.ID+'"'+geom+'>'+item.TEXT+'</li>');
						});
					}
					//Actualiza la lista
					$(listviewId).listview("refresh");
				}
			}else{
				//alert("Error carregant dades.");
			}
			$.mobile.hidePageLoadingMsg( 'Searching' );
		},
		error: function(data) {
			//En caso de error mostramos una ventan a de error.
			//alert("Error carregant dades: "+data.responseText);
			$.mobile.hidePageLoadingMsg( 'Searching' );
		}
	});
	// saltem a la plana amb els candidats sempre i quan sigui.
	console.log("searchAdrecaGeneric targetPageId: "+targetPageId);
	$.mobile.changePage(targetPageId/*,{ transition: "slideup"}*/);
}


/**
 * Inicialitza els controls per la cerca de candidats
 */
function initInformacio() {
	try {
		console.log("initInformacio");
		$.ajax({
			type: "POST",
			url: "http://ide.cime.es/sitmun/rest/consulta",
			data: {
				id: infoListConsulta
				,valor: ""
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				if(!data.error){
					if(data.data!=null){
						//Inserta los valores recuperados en la lista desplegable
						$.each(data.data, function(i, item) {
							
							var dataIconClass=nls[item.TEXT+"_IMG"];
                            
                            var cadena=""
                            
                            if(currentIdioma=="cat") cadena=nls[item.TEXT]
                            if(currentIdioma=="cas") cadena=nls_es[item.TEXT]
                            if(currentIdioma=="ang") cadena=nls_es[item.TEXT]

							$("#infoListButtons").append('<a id="infoItem_'+item.CANDID+'" data-role="button" data-iconpos="left" data-icon="'+dataIconClass+'">'+cadena+'</a>');
							$("#infoItem_"+item.CANDID).button().on("click",function() {
								$.mobile.showPageLoadingMsg( 'Searching' );
								//HACEMOS LA INFO Pasando el tipo de ruta, para saber si es de tipologia ruta o no
								infoSearch(item.CANDID,item.FITXAID, item.FITXATIP);								
							});
						});
					}
				}else{
					//alert("Error carregant dades.");
				}
				//$.mobile.hidePageLoadingMsg( 'Searching' );

			},
			error: function(data) {
				//En caso de error mostramos una ventan a de error.
				//alert("Error carregant dades: "+data.responseText);
				$.mobile.hidePageLoadingMsg( 'Searching' );
			}
		});
	} catch (e) {
		console.error("Error a initInformacio()",e);
	}
}

/**
 * Executa la consulta que ha de carregar els candidats de informació.
 * @param idConsulta
 */
function infoSearch(idConsultaCand,idConsultaDetall, tipologia) {
	try {
		console.log("infoSearch init");
		//alert(idConsultaCand + " " + lang);
		 
		var posX = map.getCenter().lon;
		var posY = map.getCenter().lat;
		
		if (currentLon>0)
		{
		  posX = currentLon;
		  posY = currentLat;
		}
		
		$.ajax({
			type: "POST",
			url: "http://ide.cime.es/sitmun/rest/consulta",
			data: {
				id: idConsultaCand
				,valor: $("#infoListDistance").val()
				,x: posX
				,y: posY
				,lang:lang
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				if(!data.error){
					console.log("infoSearch success",data);
					if(data.data!=null){
						//Inserta los valores recuperados en la lista desplegable
						var listview=$("#infoCandListview");
                        var cadenaTitol=""
                        if(currentIdioma=="cat") cadenaTitol="Resultats";
                        if(currentIdioma=="cas") cadenaTitol="Resultados";
                        if(currentIdioma=="ang") cadenaTitol="Results"			
                        			
						listview.empty();
						listview.append('<li data-role="list-divider" role="heading">' + cadenaTitol + '</li>');
						if (data.data.length==0) {
							listview.append('<li>'+nls.MA_CAND_SENSE_CAND+'</li>');
						} else {
							$.each(data.data, function(i, item) {
								
						
								
								//console.log("candidat:",item);
								//listview.append('<li detallid="'+idConsultaDetall+'" poiid="'+item.ID+'" tipologia="'+tipologia+'"><a class="footerMenuItem">'+item.TEXT+'</a></li>');
								var dstipus ="";
								var nom ="";
								if (item.TEXT.indexOf("(")>0)
								{
									dstipus = item.TEXT.substr(item.TEXT.indexOf("(")) + " - a " + parseInt(item.DIST).toFixed(0) + " m.";
									nom = item.TEXT.substr(0, item.TEXT.indexOf("("));
								}
								else{
									dstipus = item.TEXT ;
									nom = item.TEXT;
									if (nom.substr(0,14)=="ITINERARI FLOR") 
									{
										nom = nom.substr(19);
									}									
								}
								
								listview.append('<li detallid="'+idConsultaDetall+'" poiid="'+item.ID+'" tipologia="'+tipologia+'"><a class="footerMenuItem">' + nom + '<br><font size=2>' + dstipus + '</font></a></li>');
							});
							// asignamos evento de click a la lista, primero desactivar pues al hacer el empty los eventos aun se quedan en el <li>
							listview.off('click','li').on("click","li",infoCandClick);
						}
						// vamos a la pagina de candidatos
						$.mobile.changePage('#infoCand');
						listview.listview("refresh");
					}
				}else{
					//alert("Error carregant dades.");
				}
				$.mobile.hidePageLoadingMsg( 'Searching' );
			},
			error: function(data) {
				console.log("infoSearch error",data);
				//En caso de error mostramos una ventan a de error.
				//alert("Error carregant dades: "+data.responseText);
				$.mobile.hidePageLoadingMsg( 'Searching' );
			}
		});
	} catch (e) {
		console.error("Error a infoSearch()",e);
		$.mobile.hidePageLoadingMsg( 'Searching' );
	}	
}

/**
 *	Carga la ficha de información del cadidato.
 */
function infoCandClick() {
		var detallid=$(this).attr("detallid");
		var poiid=$(this).attr("poiid");
		var tipologia=$(this).attr("tipologia");
		infoCandidato(detallid, poiid, tipologia);
}
	
/**
 * Carrega la fitxa del candidat. Utilitzat en GFI i a l'aprop d'aquó.
 * 
 * @param detallid id de la consulta a executar.
 * @param poiid codi de poi a carregar.
 * @param tipologia tipus de fitxa a mostrar. Ara mateix hi ha POI i RUTA.
 */	
function infoCandidato(detallid, poiid, tipologia){
	console.log("init del infoCandidato");
	if (typeof(detallid)=="undefined") {
		// capa que no te configurada una fitxa.
		//alert(nls.MA_SENSE_DADES);
		return;
	}
	
	$.mobile.showPageLoadingMsg( 'Searching' );
	try{	
	    //alert(detallid);
		$.ajax({
			type: "POST",
			url: "http://ide.cime.es/sitmun/rest/consulta",
			data: {
				id: detallid
				,valor: poiid
				,lang:lang
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				if(!data.error){
					if(data.data!=null){
						//Inserta los valores recuperados en la lista desplegable
						console.log("data:",data.data);
						var item=data.data[0];
						//TIPOLOGIA RUTAS, mostramos una info totalmente separada
						if (typeof(item)=="undefined") {
							// capa que no te configurada una fitxa.
							//alert(nls.MA_SENSE_DADES);
						} else if(tipologia=='RUTA'){
							$("#infoFitxaRUTAImg").css("display", "inline");
							$("#infoFitxaRUTAImg").one('error', function() {  this.style.display = 'none'; });
							$("#infoFitxaRUTAImg").attr("src",item.FOTO+"");
							
							if(item.ETRSXMIN !=null){
								$("#infoFitxaRUTAMarker").closest('.ui-btn').show();
								$("#infoFitxaRUTAMarker").off('click').on("click",function(){
									marcarRuta(poiid,item.DSTIPUS,item.ETRSXMIN, item.ETRSYMIN, item.ETRSXMAX, item.ETRSYMAX);
								});
							}
							else{
								$("#infoFitxaRUTAMarker").closest('.ui-btn').hide();
							}
							
							$("#infoFitxaRUTAImg").off('click').on("click",function(){
								mostrarFotosCand(poiid,tipologia);
							});
							
							//cambiamos textos especificos de cada RUTA
							$("#infoFitxaRUTAHeader").html(item.NOM);
							$("#infoFitxaRUTANombre").html(item.NOM);
							$("#infoFitxaRUTADesc").html(item.DSRUTA);
							$("#infoFitxaRUTADistancia").html(item.DISTANCIA);
							$("#infoFitxaRUTATiempo").html(item.TEMPSMIG);
							$("#infoFitxaRUTADesnivel").html(item.DESNIVELL);
							$("#infoFitxaRUTADificultad").html(item.DIFICULTAT);
							$("#infoFitxaRUTAInteres").html(item.TRETS_INTERES);
							
							var btnHabitats=$("#infoFitxaRUTAToHabitats");
							var btnEspecies=$("#infoFitxaRUTAToEspecies");
							
							btnHabitats.off("click");
							btnEspecies.off("click");							
							/*Nomes es mostra els botons de reneix si la ruta es de tipus reneix*/
							if(item.DSTIPUS=="RENEIX"){
								btnHabitats.closest('.ui-btn').show();
								btnEspecies.closest('.ui-btn').show();
								btnHabitats.on("click",function(){
									buscarHabitats(poiid);
								});
								btnEspecies.on("click",function(){
									buscarEspecies(poiid);
								});
							}
							else {
								btnHabitats.closest('.ui-btn').hide();
								btnEspecies.closest('.ui-btn').hide();
							}
							// vamos a la pagina de ficha
							$.mobile.changePage('#infoFitxaRUTA');
						}else if(tipologia=='POI'){
							$("#infoFitxaPOIImg").css("display", "inline");
							$("#infoFitxaPOIImg").one('error', function() {  this.style.display = 'none'; });
							$("#infoFitxaPOIImg").attr("src",item.FOTO+"");		
							
							if(item.THE_GEOM !=null){
								$("#infoFitxaPOIMarker").closest('.ui-btn').show();
								$("#infoFitxaPOIMarker").off('click').on("click",function(){
									addMarker(item.THE_GEOM);
								});
							}
							else{
								$("#infoFitxaPOIMarker").closest('.ui-btn').hide();
							}
							$("#infoFitxaPOIImg").off('click').on("click",function(){
								mostrarFotosCand(poiid,tipologia);
							});
							//cambiamos textos especificos de cada POI
							$("#infoFitxaPOIHeader").html(item.NOM);
							$("#infoFitxaPOINombre").html(item.NOM);
							$("#infoFitxaPOIDesc").html(item.DESC);
							
							
							// vamos a la pagina de ficha de POI
							$.mobile.changePage('#infoFitxaPOI');
						}
					}
				}else{
					//alert("Error carregant dades.");
				}
				$.mobile.hidePageLoadingMsg( 'Searching' );
			},
			error: function(data) {
				//En caso de error mostramos una ventan a de error.
				//alert("Error carregant dades: "+data.responseText);
				$.mobile.hidePageLoadingMsg( 'Searching' );
			}
		});
	} catch (e) {
		console.error("Error a infoCandClick()",e);
		$.mobile.hidePageLoadingMsg( 'Searching' );
	}
}

/**
 * Mostramos todas las fotos del candidato
 */
function mostrarFotosCand(Id, tipologia){
	try{
	//Mostramos la pagina de infoFitxaImatges
    console.log("mostrarFotosCand");
    $.mobile.showPageLoadingMsg( 'Searching' );
	
    var infoFotosConsulta=sitmunProperties["reneix.infoFotosConsulta" + tipologia.toUpperCase()];
	$.ajax({
		type: "POST",
		url: "http://ide.cime.es/sitmun/rest/consulta",
		data: {
			id: infoFotosConsulta
			,valor: Id
		},
		cache: false,
		dataType: 'json',
		success: function(data) { //Si se ejecuta correctamente
			if(!data.error){
				if(data.data!=null){
					//Inserta los valores recuperados en la lista desplegable
					console.log("data:",data.data);
					if(data.data.length>0){
						var fotosPetites=new Array();
						var fotosGrans=new Array();
						
						for(var i=0;i< data.data.length; i++){
							fotosPetites.push(data.data[i].RUTA_FOTO_PETITES);
							fotosGrans.push(data.data[i].RUTA_FOTO_GRAN);
							
						}
						var html='';
						var nomFoto='';
						var $ul=$("#gallery");
						for(var i=0;i< fotosPetites.length; i++){
							//nomFoto=fotosGrans[i].substring(fotosGrans[i].lastIndexOf("/")+1);
							html += '<li><a href="'+fotosGrans[i]+'" rel="external"><img src="'+fotosPetites[i]+'" alt="'+nomFoto+'" /></a></li>';
						}
						$ul.html( html );
						$.mobile.changePage('#infoFitxaImatges');
					}
				}
			}else{
				//alert("Error carregant dades.");
			}
			$.mobile.hidePageLoadingMsg( 'Searching' );
		},
		error: function(data) {
			//En caso de error mostramos una ventan a de error.
			//alert("Error carregant dades: "+data.responseText);
			$.mobile.hidePageLoadingMsg( 'Searching' );
		}
	});
	
	} catch (e) {
	console.error("Error a infoCandClick()",e);
	$.mobile.hidePageLoadingMsg( 'Searching' );
	}
}

/**
 * Funcio que a partir de la ruta la remarca i la centra en el mapa
 */
function marcarRuta(valor, tipus, xmin, ymin, xmax, ymax){
	console.log("Inicio del marcar ruta");
	console.log("Valor",valor);
	console.log("Tipus",tipus);
	
	var cartoId=sitmunProperties["reneix.rutas." + tipus.toUpperCase()];
	
	//NO existeix la cartografia relacionada amb aquesta ruta
	if(!cartoId) {
		console.error("No existeix cap carto relacionada amb aquesta ruta");
		return;
	}
	
	var rutaRemarcada= map.getLayersByName("RUTA_REMARCADA");
	
	//Si ja hi ha un layer remarcat l'eliminem
	if (rutaRemarcada.length>0){
		console.log("destruimos la rutaRemacada");
		rutaRemarcada[0].destroy();
	}	
	
	var layerOrig=map.getLayersByName(cartoId)[0];
	console.log("layerOrig", layerOrig);
	var layer;
	if (!layerOrig){
		var cartografia=getCartografiaByCodigo(cartoId);
		layer=createLayerOL(cartografia, false, false);
		layer.setVisibility(true);
	}
	else
		layer=layerOrig.clone();
	
	layer.setName("RUTA_REMARCADA");
	var pathSld=sitmunProperties["rutas.sld"];
	console.log("pathSld", pathSld);
	var field=sitmunProperties["reneix.rutas.campoId"];
	var value=valor;
	
	layer.params.SLD=pathSld+"?params="+layer.params.LAYERS+"~"+field+"~"+value;
	layer.params.STYLES="linebyfield";
	layer.redraw();
	map.addLayer(layer);
	//Afegim mes ordre perque el layer no quedi per sota
	layer.order = layer.order + 500;
	raiseLayerOrder(layer);

	//centrem el mapa
	console.log("A continuacio centrem la  ruta");
	console.log("minx", xmin);
	console.log("miny", ymin);
	console.log("xmax", xmax);
	console.log("ymax", ymax);
	if (xmin != "" && ymin != "" && xmax != "" && ymax != "")
		map.zoomToExtent(new OpenLayers.Bounds(xmin,ymin,xmax, ymax));
	
	//Carreguem el mapa
	$.mobile.changePage('#mainContainer');
	console.log("Fin del marcar ruta");
}

/**
 * 
 * @param value
 */
function marcarCarrer(value){
	console.log("init del marcarCarrer");
	try{
		$.ajax({
			type: "POST",
			url: "http://ide.cime.es/sitmun/rest/localizador",
			data: {
				id: buscadorAdrGeomCarrer
				,valor: value
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				if(!data.error){
					//Inicializa la lista desplegable
					var item=data.data[0];
					addMarkerCarrer(item.THE_GEOM);						
				}else{
					//alert("Error carregant dades.");
				}
				$.mobile.hidePageLoadingMsg( 'Searching' );
			},
			error: function(data) {
				//En caso de error mostramos una ventan a de error.
				//alert("Error carregant dades: "+data.responseText);
				$.mobile.hidePageLoadingMsg( 'Searching' );
			}
		});
	}catch(e) {
		console.error("Error a marcarCarrer()",e);
		$.mobile.hidePageLoadingMsg( 'Searching' );
	}
}
/**
 * 
 * @param value
 */
function buscarHabitats(idRuta){
	console.log("init del buscarHabitats");
	$.mobile.showPageLoadingMsg( 'Searching' );
	try{
		$.ajax({
			type: "GET",
			url: "http://ide.cime.es/sitmun/rest/localizador",
			data: {
				id: infoRutaHabitat
				,valor: idRuta
				,lang:lang
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				//Anadimos todos los habitats encontrados
				var listview=$("#GFICandidatsHabitats");
				listview.empty();
				var fitxaHabitat='';
				if(!data.error){
					//Inicializa la lista desplegable
					if(data.data.length>0){
						for(var i=0;i< data.data.length; i++){
							var item=data.data[i];
							
							fitxaHabitat='<p class="fitxa_nom"><b>'+nls.MA_FITXA_NOM +'</b><span> '+item.NOM+'</span></p>';
							fitxaHabitat+='<p class="fitxa_desc"><b>'+nls.MA_FITXA_DESC +'</b><span> '+item.DESCRIPCIO+'</span></p>';
							fitxaHabitat+='<div class="fitxa_img"><img src="'+item.FOTO+'" /></div>';
								
							listview.append('<li data-role="list-divider">'+item.NOM+'</li>');
							listview.append('<li>'+ fitxaHabitat+'</li>');
						}
					}
					else{
						listview.append('<li data-role="list-divider" >'+nls.MA_FITXA_HABITATS+'</li>');
						listview.append('<li>'+nls.MA_SENSE_DADES+'</li>');
					}
					$.mobile.changePage('#infoFitxaRUTAHabitats');
					//Enviamos al top de la pagina para que si anteriormente habia muchos elementos y habian bajado 
					//la pagina vuelva a aparecer al principio de todo
					$("#infoFitxaRUTAHabitats").scrollTop(0);
					listview.listview("refresh");
				}else{
					//alert("Error carregant dades.");
				}
				$.mobile.hidePageLoadingMsg( 'Searching' );
			},
			error: function(data) {
				//En caso de error mostramos una ventan a de error.
				//alert("Error carregant dades: "+data.responseText);
				$.mobile.hidePageLoadingMsg( 'Searching' );
			}
		});
	}catch(e) {
		console.error("Error a buscarHabitats()",e);
		$.mobile.hidePageLoadingMsg( 'Searching' );
	}
}

/**
 * 
 * @param value
 */
function buscarEspecies(idRuta){
	console.log("init del buscarEspecies");
	$.mobile.showPageLoadingMsg( 'Searching' );
	try{
		$.ajax({
			type: "GET",
			url: "http://ide.cime.es/sitmun/rest/localizador",
			data: {
				id: infoRutaEspecie
				,valor: idRuta
				,lang:lang
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				//Anadimos todas las especies encontradas
				var listview=$("#GFICandidatsEspecies");
				var fitxaEspecie='';
				listview.empty();
				if(!data.error){
					//Inicializa la lista desplegable
					if(data.data.length>0){
						for(var i=0;i< data.data.length; i++){
							var item=data.data[i];
							
							fitxaEspecie='<p class="fitxa_nom"><b>'+nls.MA_FITXA_NOM_CIENTIFIC +'</b><span> '+item.NOM+'</span></p>';
							fitxaEspecie+='<p class="fitxa_desc"><b>'+nls.MA_FITXA_DESC +'</b><span> '+item.DESCRIPCIO+'</span></p>';
							fitxaEspecie+='<div class="fitxa_img"><img src="'+item.FOTO+'" /></div>';
								
							listview.append('<li data-role="list-divider">'+item.NOM_POPULAR+'</li>');
							listview.append('<li>'+ fitxaEspecie+'</li>');
							
						}
					}
					else{
						listview.append('<li data-role="list-divider" >'+nls.MA_FITXA_ESPECIES+'</li>');
						listview.append('<li>'+nls.MA_SENSE_DADES+'</li>');
					}
					$.mobile.changePage('#infoFitxaRUTAEspecies');
					//Enviamos al top de la pagina para que si anteriormente habia muchos elementos y habian bajado 
					//la pagina vuelva a aparecer al principio de todo
					$("#infoFitxaRUTAEspecies").scrollTop(0);
					listview.listview("refresh");
				}else{
					//alert("Error carregant dades.");
				}
				$.mobile.hidePageLoadingMsg( 'Searching' );
			},
			error: function(data) {
				//En caso de error mostramos una ventan a de error.
				//alert("Error carregant dades: "+data.responseText);
				$.mobile.hidePageLoadingMsg( 'Searching' );
			}
		});
	}catch(e) {
		console.error("Error a buscarEspecies()",e);
		$.mobile.hidePageLoadingMsg( 'Searching' );
	}
}

/*Asignamos el callback del feature info aqui*/
function asignarListener(){
	var getfeatureinfo=function(event) {
		$.mobile.hidePageLoadingMsg( 'Searching' );
		console.log("GFI: ",event.features);
		var features=event.features;
		//Una vez tenemos las features las tratamos para agrupar los features encontrados
		var listview=$("#GFICandidats");
		listview.empty();
		
		if (features.length==0) {
			listview.append('<li data-role="list-divider" role="heading">'+nls.MA_CAND_RESULTATS+'</li>');
			listview.append('<li>'+nls.MA_CAND_NO_CAND+'</li>');
			listview.off('click','li');
		}
		else{
			var cartos=new Object();                		
			/*Clasificacion de los features encontrados*/
			for (var i=0; i < features.length; i++){
				var carto=features[i].carCodigo;
				if (!(carto in cartos)) {
					cartos[carto]=new Array();
				}
				cartos[carto].push(features[i]);
			}
			/*Impresion de los elementos encontrados*/
			for(var cartoId in cartos){
				idText=sitmunProperties["reneix."+ cartoId +".grupo"];
				// comprovem que te configuració.
				if (typeof(idText)!="undefined") {
					listview.append('<li data-role="list-divider">'+nls[idText]+'</li>');
					
					for(var i=0; i < cartos[cartoId].length; i++){
						var feature=cartos[cartoId][i];
						var idConsulta=sitmunProperties["reneix."+ feature.carCodigo +".consultaId"];
						var poiid=feature.attributes[sitmunProperties["reneix."+ feature.carCodigo +".id"]];
						var texto=feature.attributes[sitmunProperties["reneix."+ feature.carCodigo +".texto"]];
						var tipologia=sitmunProperties["reneix."+ feature.carCodigo +".tipologia"];
					
						listview.append('<li detallid="'+idConsulta+'" poiid="'+poiid+'" tipologia="'+tipologia+'"><a class="footerMenuItem">'+texto+'</a></li>');
						// asignamos evento de click a la lista, primero desactivar pues al hacer el empty los eventos aun se quedan en el <li>
						listview.off('click','li').on("click","li",infoCandClick);
					
					}
				} else {
					console.error("Capa amb info activada peró sense configurar.");
					listview.append('<li data-role="list-divider" role="heading">CartoId:'+cartoId+'</li>');
					listview.append('<li>Capa amb info activada peró sense configurar</li>');
					//listview.off('click','li');
				}
			}
			
		}
		$.mobile.changePage('#dialog-info');
		listview.listview("refresh");
	};
	var beforegetfeatureinfo=function(){
		$.mobile.showPageLoadingMsg( 'Searching' );
	};
	
	var nogetfeatureinfo=function(){
		$.mobile.showPageLoadingMsg( 'Searching' );
		var event=new Object();
		event.features=new Array();
		getfeatureinfo(event);
	};
	
	
	var obj=new Object();
	obj['getfeatureinfo']=getfeatureinfo;
	obj['beforegetfeatureinfo']=beforegetfeatureinfo;
	obj['nogetfeatureinfo']=nogetfeatureinfo;
	return obj;
}


/**
 * Afegeix un marcador a la geometria WKT passada i torna a la plana del mapa.
 * 
 * @param the_geom
 */
function addMarkerCarrer(the_geom) {
	try{
		if(!the_geom) return;
		// convertimos wkt a feature
	    var wkt = new OpenLayers.Format.WKT();
	    var features = wkt.read(the_geom);
	    
	    //volvemos a mapa
	    $.mobile.changePage('#mainContainer');
	    //mostramos resultado en OL
	    var localizadorLayer=getLayerBuscador();
	    localizadorLayer.addFeatures(features);

		map.zoomToExtent(features.geometry.getBounds());					
		map.setCenter(features.geometry.getBounds().getCenterLonLat());		
	}catch(e){console.error("Error en addMarkerCarrer",e);}
}

/**
 * Función que devuelve una URL donde esta el servidor de formateo de los GetFeatureInfo WMS.
 * Si devoldevos 'null' o '' se lanzaró la URL directamenta al servidor WMS para recibir el XML.
 * 
 * @returns {String}: URL del servidor de formateo o NULL
 */
function getServiceInfoURL() {
	return null;
}




//================================================================
//SILME
//================================================================
/**
 * Inicialitza els controls per la cerca de candidats
 */
function initMunicipi() {
	//alert("initMuni")
	try {
		console.log("initMunicipi");
		//alert(currentLon + " " + currentLat)
		$.ajax({
			type: "POST",
			url: "http://ide.cime.es/sitmun/rest/consulta",
			data: {
				id: 61
				,valor: currentLon
				,valor2: currentLat
			},
			cache: false,
			dataType: 'json',
			success: function(data) { //Si se ejecuta correctamente
				if(!data.error){
					if(data.data!=null){
						//alert(data.data)
						//Inserta los valores recuperados en la lista desplegable
						$.each(data.data, function(i, item) {
							//currentMunicipi=item.IDMUN
							newMunicipi=item.IDMUN
							//alert("initMunicipi--> newMunicipi: " + newMunicipi)
							//setHeader();
						});
						setHeader();
					}
					else{
						/*
						msgError=textIdioma(1)
						$('#txtError').html(msgError)
						$.mobile.hidePageLoadingMsg( 'Searching' );
						currentPage="#pageMainMunicipi";
						currentMunicipi="07032"
						setHeader();
						$.mobile.changePage("#dialegError");						
						*/
						setHeader();
					}
				}else{
					/*
					msgError=textIdioma(1)
					$('#txtError').html(msgError)
					$.mobile.hidePageLoadingMsg( 'Searching' );
					currentPage="#pageMainMunicipi";
					currentMunicipi="07032"
					$.mobile.changePage("#dialegError");
					*/
					setHeader();
				}
				//$.mobile.hidePageLoadingMsg( 'Searching' );

			},
			error: function(data) {
				//alert(data.error)
				/*
				msgError=textIdioma(1)
				$('#txtError').html(msgError)
				$.mobile.hidePageLoadingMsg( 'Searching' );
				currentPage="#pageMainMunicipi";
				$.mobile.changePage("#dialegError");
				*/
				setHeader();
			}
		});
	} catch (e) {
		console.error("Error a initMunicipi()",e);
	}
	

}



function fn_error(cadError)
{
    msgError = cadenaTemps("soap") + " :" + cadError
}