var currentMunicipi="07000";
var newMunicipi="";
var idTemporitzador=null; 
var watch_idGPS = null;    
var watch_idHTML5 = null;    

var currentLat=null
var currentLon=null
var currentAccuracy=null

var currentLatGPS=0
var currentLonGPS=0
var currentHeadingGPS=0
var currentSpeedGPS=0
var currentAccuracyGPS=0

var currentLatHTML5=0
var currentLonHTML5=0
var currentHeadingHTML5=0
var currentSpeedHTML5=0
var currentAccuracyHTML5=0

var tempsInicialCerca=0;
var tempsExcedit=false;

var sucessGPS=false;
var sucessHTML5=false;

var selectedLon=0
var selectedLat=0
var selectedMuni=false;


function startMonitor()
{
    //alert("startMonitor")
    if (idTemporitzador==null) 
    {
    	tempsInicialCerca = 0;
    	tempsExcedit = false;
        idTemporitzador = setInterval("getLoc()",5000)
    }
}

function stopMonitor()
{
    if (idTemporitzador!=null) clearInterval(idTemporitzador)
}

function getLoc()
{
	tempsInicialCerca = parseInt(parseInt(tempsInicialCerca) + 5);
	if (tempsInicialCerca>10)
	{
		if (tempsExcedit==false)
		{
			//alert("temps excedit")
			tempsExcedit=true
			initMunicipi();
			return;
		}
	}
	
	if (sucessGPS==true)
	{
		currentAccuracy = currentAccuracyGPS;

		var p1 = new OpenLayers.LonLat(currentLonGPS, currentLatGPS);
		p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));	
		currentLon = parseFloat(p1.lon).toFixed(0)
		currentLat = parseFloat(p1.lat).toFixed(0)
		
		//alert("GPS actiu: " + currentLat + "   " + currentLon + "   " + currentAccuracy)
	    dibuixaUbicacio(p1);	
		initMunicipi();
	}
	else{
		//alert("HTML5 " + sucessHTML5)
		if (sucessHTML5==true)
		{
			currentAccuracy = currentAccuracyHTML5;
			
			var p1 = new OpenLayers.LonLat(currentLonHTML5, currentLatHTML5);
			p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));	
			currentLon = parseFloat(p1.lon).toFixed(0)
			currentLat = parseFloat(p1.lat).toFixed(0)

			//alert("HTML5 actiu: " + currentLat + "   " + currentLon + "   " + currentAccuracy)
			dibuixaUbicacio(p1);	
			initMunicipi();
		}	
	}
	
}

function onSoc()
{
	sucessGPS=false;
	sucessHTML5=false;
	$('#lblInfo0').html("Iniciant geolocalitzaci&oacute...")
	initLocationHTML5();
	initLocationGPS();
	startMonitor();
}

function initLocationGPS()
{
    watch_idGPS = navigator.geolocation.watchPosition(
    
        // Success
        function(position){

            currentLatGPS = position.coords.latitude
            currentLonGPS = position.coords.longitude
            currentHeadingGPS = position.coords.heading
            currentSpeedGPS = position.coords.speed
            currentAccuracyGPS = position.coords.accuracy   
            
            try{
                if (parseFloat(currentAccuracyGPS)<50)
                {
                	sucessGPS=true;
                	/*
                	currentLat=currentLatGPS
                	currentLon=currentLonGPS
                	currentAccuracy=currentAccuracyGPS
                	*/
                	//alert("GPS: " + currentLatGPS.toFixed(8) + " " + currentAccuracyGPS)
                	/*
                	stopLocationGPS();
                	if ((sucessHTML5==false) || (currentMunicipi=="07000"))
                	{
                		//alert("ubicacio GPS")
                		ubica();	
                	}
                	*/
                	
                }
                else{
                	sucessGPS=false;
                }
            }
            catch(err)
            {
                console.log(err.toString())
            }
        },
        
        // Error
        function(error){
        	//alert("error loc GPS")
        	sucessGPS=false;
        	/*
        	initMunicipi();
        	stopLocationGPS();
        	*/
        },
        // Settings
        { frequency: 1000, enableHighAccuracy: true, timeout: 20000});
}

function stopLocationGPS()
{
	 if (watch_idGPS != null) {
         navigator.geolocation.clearWatch(watch_idGPS);
         watch_idGPS = null;
     }
}

function initLocationHTML5()
{
    watch_idHTML5 = navigator.geolocation.watchPosition(
    
        // Success
        function(position){

            currentLatHTML5 = position.coords.latitude
            currentLonHTML5 = position.coords.longitude
            currentHeadingHTML5 = position.coords.heading
            currentSpeedHTML5 = position.coords.speed
            currentAccuracyHTML5 = position.coords.accuracy   
            //alert(currentAccuracyHTML5)
            
            try{
                if (parseFloat(currentLatHTML5)>0)
                {
                    if (parseFloat(currentAccuracyHTML5)<2500)
                    {
                    	sucessHTML5=true;
                    	/*
                    	alert("HTML5: " + currentLat.toFixed(8) + "  " + currentAccuracy)
                    	stopLocationHTML5();
                    	if ((sucessGPS==false) || (currentMunicipi=="07000"))
                    	{
                    		//alert("ubicacio HTML5")
                    		ubica();
                    	}                    	
                    	*/
                    }
                	
                }
                else{
                	sucessHTML5=false;
                }
            }
            catch(err)
            {
                console.log(err.toString())
            }
        },
        
        // Error
        function(error){
        	sucessHTML5=false;
        	//alert("error loc HTML5")
        	/*
        	initMunicipi();
        	stopLocationGPS();
        	stopLocationHTML5();
        	*/
        },
        // Settings
        { frequency: 1000, enableHighAccuracy: false});
}

function stopLocationHTML5()
{
	 if (watch_idHTML5 != null) {
         navigator.geolocation.clearWatch(watch_idHTML5);
         watch_idHTML5 = null;
     }
}

function dibuixaUbicacio(p1)
{
	//alert(p1)
	try {
		if (window.map && window.map instanceof OpenLayers.Map) {

		    vector.removeAllFeatures();
		    
		    if (!map.getMaxExtent().containsLonLat(new OpenLayers.LonLat(currentLon,currentLat))) {
		    	alert(nls.MA_GEOLOCATE_LIMITES);
		    	return;
		    }

		    var circle = new OpenLayers.Feature.Vector(
		        OpenLayers.Geometry.Polygon.createRegularPolygon(
		        	new OpenLayers.Geometry.Point(currentLon, currentLat),
		            currentAccuracy/2, //L'exactitud dividit per 2 pel radi
		            40,
		            0
		        ),
		        {},
		        { 
		          fillColor: '#000',
				  fillOpacity: 0.1,
				  strokeWidth: 0
		        }
		    );
		    
		    var punt = new OpenLayers.Geometry.Point(currentLon,currentLat);
		    var centreMapa = [new OpenLayers.Feature.Vector(punt, { icon:'img/icones/target32.png', etiqueta:'', width:32, height:32})];
		    vector.addFeatures(centreMapa);			    
		    vector.addFeatures(circle);	
			
			/*
			var pulsate = function(feature) {
			    var point = feature.geometry.getCentroid(),
			        bounds = feature.geometry.getBounds(),
			        radius = Math.abs((bounds.right - bounds.left)/2),
			        count = 0,
			        grow = 'up';

			    var resize = function(){
			        if (count>16) {
			            clearInterval(window.resizeInterval);
			        }
			        var interval = radius * 0.03;
			        var ratio = interval/radius;
			        switch(count) {
			            case 4:
			            case 12:
			                grow = 'down'; break;
			            case 8:
			                grow = 'up'; break;
			        }
			        if (grow!=='up') {
			            ratio = - Math.abs(ratio);
			        }
			        feature.geometry.resize(1+ratio, p1);
			        vector.drawFeature(feature);
			        count++;
			    };
			    window.resizeInterval = window.setInterval(resize, 50, p1, radius);
			};				
			*/
    
		    
		   /*
	    	try{
	    		  escala= parseFloat(sitmunProperties["reneix.escalaGeoLocalizacion"]);	
	    	}
		    catch(e)
		    {
		    	console.error("Falta definir una escala",e);
		    }
		    
		    console.log("\t escala: ",escala);
	    	if (escala>0)map.zoomToScale(escala, true);
	    	
	    	map.setCenter(vector.getDataExtent().getCenterLonLat());
		    */
	    	//pulsate(circle);
			//$.mobile.hidePageLoadingMsg( 'Searching' );
			
		}
		
	} 
	catch (e) {
		alert("Error en dibuixaUbicacio: " + e.toString(),e);
	}	
	
}

function ubica()
{
    var p1 = new OpenLayers.LonLat(currentLon, currentLat);
    dibuixaUbicacio(p1);	
	
	initMunicipi();
}

function centerMe()
{
        position=new OpenLayers.LonLat(currentLon,currentLat);
        if(position!=null)
        {
            map.setCenter(position, 12);
        }     
}
