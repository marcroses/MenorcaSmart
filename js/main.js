function main() {
		getSize();
		document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
		//document.addEventListener("deviceready", testQueixa, false); // Al inciar la app
		document.addEventListener("pause", aplicacionPausada, false);        // Al pausar la app
		document.addEventListener("resume", aplicacionReiniciada, false);    // Al reiniciar la app
		document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
		document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
		document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
		document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqued
}


function initSITMUN()
{
	/**
	 * Accions a realitzar quan el doc estigui carregat.
	 */
	$(document).ready(function () {
		initIdioma();
		
		//Mirem que hi hagi connexi� a Internet
		if (checkConnection()=="none")
		{
			msgError=textIdioma(0)
			$('#lblInfo0').html(msgError)
			$('#txtError').html(msgError)
			$.mobile.changePage("#dialegError");
		}
		else{
			$.mobile.showPageLoadingMsg( 'Searching' );
			//onSoc()
			setTimeout(fixContentHeight2,1000);
			//Evento de los sliders
			console.log("--> transparencySliders = " + transparencySliders);
			if(transparencySliders) {
				$(".carto-slider-transparency").slider({
					highlight: true,
					stop: function (ev, ui) {
						var cartoId = $(this).attr("cartoid");
						var opacity = $(this).val() / 100;
						var transparency = 100 - $(this).val(); 
							
						console.log("\t --> cartoid [" + cartoId + "]: opacity = " + opacity + ", transparency = " + transparency);
						
						var layer = map.getLayersByName(cartoId)[0];
					    if (layer != null) layer.setOpacity(opacity);
					    
					    // modifiquem transp. de l'objecte carto.
					    var carto = getCartografiaByCodigo(cartoId);
					    if (carto != null) carto.carTransp = transparency;
					}
				});
			}
						
			
		}

	});
	
	/**
	 * Refem el heigh en canviar orientaci� de m�bil.
	 */
	$(window).bind("orientationchange resize", fixContentHeight2);
		
}

function aplicacionIniciada()
{
	FastClick.attach(document.body);
	initMap9();
	initSITMUN()
	doIdioma(currentIdioma);
    document.addEventListener("backbutton", atrasPulsado, false);        // Se ha pulsado la tecla atr�s
}
 
function aplicacionPausada()
{
}
 
function aplicacionReiniciada()
{
}
 
function phonegapOnline()
{
}
 
function phonegapOffline()
{
}
 
function atrasPulsado()
{
    if ( $.mobile.activePage.is('#pageSplash') ) {
        navigator.app.exitApp();
    }
    else {
    	//alert($.mobile.activePage.attr('id'))
        //navigator.app.backHistory()
    }    
}
 
function menuPulsado()
{
}
 
function busquedaPulsado()
{
}
