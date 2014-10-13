/*
	En el archivo visor/js/layers.js se definen las funciones utilizadas para la creaci�n de los layers de OpenLayers.
	
	Existe un vinculo entre el tipo disponible en el administrador (Servicios > tipo) y el nombre aqu�
	definido. El formato general consiste en: "createLayerXXXX" donde XXXX corresponde al tipo en el
	administrador en mayusculas. 
	
	As� encontramos la siguiente relaci�n de tipos y nombres de m�todo:
		WMS		>	createLayerWMS
		WFS		>	createLayerWFS
		AIMS	>	createLayerAIMS
		TC		>	createLayerTC
		
	Definir un nuevo tipo de servicio que sea visualizable en OpenLayers implica:
	1) Crear un nuevo tipo de servicio en la configuraci�n del administrador.
		IMPORTANTE: El tipo debe ser sin car�cteres especiales, puntos ni accentos.
	2) Definir el m�todo con el formato de nombre esperado en el archivo visor/js/layers.js
		
		- La implementaci�n del m�todo ser� la responsable de validar que los par�metros requeridos 
		  para la definici�n del layer esten definidos como par�metros del servicio en el administrador.
		- Los par�metros recibidos son siempre de tipo String. Si el layer OL espera un param. de otro
		  tipo, este debe ser transformado.
	
	 
*/

/**
 * Creaci�n de un layer WMS.
 * 
 * @param codigo
 * @param url la url del servidor WMS
 * @param layers las capas del servidor WMS a�adir a la url
 * @param layerUrlParams lista de par�metros a a�adir a la url
 * @param layerParams lista de par�metros a utilizar en la definici�n de la capa de OL.
 * @return
 */
function createLayerWMS(codigo,url,layers,layerUrlParams,layerParams) {
	// param. por defecto de la petici�n wms
	var urlParams={
			service: "WMS",
			request: "GetMap", 
			layers: layers,
			exceptions:null
	};
	// a�adimos los param de URL del service.
	for (param in layerUrlParams) urlParams[param]=(layerUrlParams[param]==null)?'':layerUrlParams[param];
	
	if (typeof(layerParams.opacity)!="undefined") layerParams.opacity=parseFloat(layerParams.opacity);
	
	console.log("layer WMS layerParams",layerParams);
	return new OpenLayers.Layer.WMS(
			codigo,
			url,
			urlParams,
			layerParams
	);
}


/**
 * Creaci�n de un layer para interrogar TC utilizando un layer WMS (no el layer tilecache que interroga directamente las imagenes)
 * 
 * @param codigo
 * @param url la url del servidor TC
 * @param layers las capas del servidor TC a�adir a la url
 * @param layerUrlParams lista de par�metros a a�adir a la url
 * @param layerParams lista de par�metros a utilizar en la definici�n de la capa de OL.
 * @return
 */
function createLayerTC(codigo,url,layers,layerUrlParams,layerParams) {
	
	// param. por defecto de la petici�n wms
	var urlParams={
			service: "WMS",
			request: "GetMap", 
			layers: layers,
			exceptions:null
	};
	
	var bounds = new OpenLayers.Bounds(parseFloat(layerParams["maxExtentX0"]),parseFloat(layerParams["maxExtentY0"]),
			parseFloat(layerParams["maxExtentX1"]),parseFloat(layerParams["maxExtentY1"])); 
	
	layerParams.maxExtent=bounds;
	layerParams.singleTile=false;
	if (typeof(layerParams.buffer)!="undefined") layerParams.buffer=parseInt(layerParams.buffer);
	console.log("layer TC layerParams",layerParams);
	
	// a�adimos los param de URL del service.
	for (param in layerUrlParams) urlParams[param]=(layerUrlParams[param]==null)?'':layerUrlParams[param];
	
	return new OpenLayers.Layer.WMS(
			codigo,
			url,
			urlParams,
			layerParams
	);
}

/**
 * Par�metros m�nimos necesarios en el servicio de este tipo:
 *	-buffer: 0
 *	-format: image/jpeg
 *	-tileSize: 256
 *	-tileExtentX0: 567000
 *	-tileExtentY0: 4406000
 *	-tileExtentX1: 614000
 *	-tileExtentY1: 4439000
*/
function createLayerTILECACHE(codigo,url,layers,layerUrlParams,layerParams) {// param. por defecto de la petici�n wms

	// definimos param. del layer segun config. en bdd.
	var tileSizeValue=parseFloat(layerParams["tileSize"]);
	if (isNaN(tileSizeValue)) {
		tileSizeValue=256;
		console.error("Layer TileCache sin el par�metro tileSize. Revisa la configuraci�n.");
	}
	var tileSize=new OpenLayers.Size(parseFloat(layerParams["tileSize"]),parseFloat(layerParams["tileSize"]));
	layerParams.tileSize=tileSize;
	layerParams.serverResolutions=map.resolutions;
	
	// si el layer tiene definido la extensi�n, se define esta. Cuando no venga definida en el layer tilecache, entonces
	// la extensi�n del mapa debe ser la del tilecache, de lo contrario no se mostrar� correctamente.
	var x0=parseFloat(layerParams["tileExtentX0"]);
	var y0=parseFloat(layerParams["tileExtentY0"]);
	var x1=parseFloat(layerParams["tileExtentX1"]);
	var y1=parseFloat(layerParams["tileExtentY1"]);
	if (!isNaN(x0) && !isNaN(y0) && !isNaN(x1) && !isNaN(y1)) layerParams.maxExtent=new OpenLayers.Bounds(x0,y0,x1,y1);

	layerParams.singleTile=false;
	if (layerParams.buffer)layerParams.buffer=parseInt(layerParams.buffer);

	console.log("layer TILECACHE layerParams",layerParams);
	
	// a�adimos los param de URL del service.
	for (param in layerUrlParams) urlParams[param]=(layerUrlParams[param]==null)?'':layerUrlParams[param];
	
	return new OpenLayers.Layer.TileCache(
			codigo,
			url,
			layers,
			layerParams
	);
}


/**
 * Creaci�n de un layer de cache de arcgis.
 * 
 * @param codigo
 * @param url la url del servidor
 * @param layers 
 * @param layerUrlParams lista de par�metros a a�adir a la url
 * @param layerParams lista de par�metros a utilizar en la definici�n de la capa de OL.
 * @return
 */
function createLayerARCGISCACHE(codigo,url,layers,layerUrlParams,layerParams) {

	// validaci�n de los param. requeridos.
	if (layerParams["tileOriginX"]==null || layerParams["tileOriginY"]==null || layerParams["type"]==null)
		console.error("Error en la definici�n del layer de ARCGISCACHE con c�digo='"+codigo+"'. Revisa los par�metros del servicio.");
	
	/* Tile Origin is required unless it is the same as the implicit map origin
     * which can be affected by several variables including maxExtent for map or base layer */
    var agsTileOrigin = new OpenLayers.LonLat(parseFloat(layerParams["tileOriginX"]),parseFloat(layerParams["tileOriginY"]));
	//console.log("createLayerARCGISCACHE tileOrigin ",agsTileOrigin);
    
    // si el layer tiene definido la extensi�n, se define esta. Cuando no venga definida en el layer tilecache, entonces
	// la extensi�n del mapa debe ser la del tilecache, d	mente.
	var x0=parseFloat(layerParams["tileExtentX0"]);
	var y0=parseFloat(layerParams["tileExtentY0"]);
	var x1=parseFloat(layerParams["tileExtentX1"]);
	var y1=parseFloat(layerParams["tileExtentY1"]);
	
    var layerP={
	        tileOrigin: agsTileOrigin,
	        resolutions: map.resolutions,
	        sphericalMercator: false,
	        maxExtent: map.getMaxExtent(),
	        useArcGISServer: false,
	        isBaseLayer: false,
	        type: layerParams["type"] // la extensi�n de la imagen.
	        //projection: map.getProjection();
    };
    
	if (!isNaN(x0) && !isNaN(y0) && !isNaN(x1) && !isNaN(y1)) layerP.maxExtent=new OpenLayers.Bounds(x0,y0,x1,y1);
	
	return new OpenLayers.Layer.ArcGISCache(
			codigo,
			url+layers, 
			layerP);
}



function createLayerWFS(codigo,url,layers,layerUrlParams,layerParams, cartografia, addToMap) {
	console.log("createLayerWFS");
	var geometryName="";
	var featureNS="";
	
	
	geometryName=typeof(layerParams["gn_"+layers]) !="undefined" ? layerParams["gn_"+layers]: "";
	featureNS=typeof(layerParams["fns_"+layers]) !="undefined" ? layerParams["fns_"+layers]: "";
	
	
	//Si la geometria o el feature son nullos tenemos que recorrer a consultarlo en el DescribeFeature
	if(geometryName=="" || featureNS==""){
		ConfigManager.getDescriptionFeature(url, layers,function(json) {
			try{
				var data=dojo.fromJson(json);
				console.log("El json con el describeFeatureContainer=", data);
				if(typeof(data.featureNS) != "undefined") featureNS=data.featureNS;
				for(var i=0; i<data.items.length; i++){
					//Hemos encontrado el campo de geometria
					if(data.items[i].type.indexOf("gml:")==0){
						geometryName=data.items[i].name;
						var l=crearLayerDescrito(codigo,url,layers,layerUrlParams,layerParams, featureNS, geometryName);
						l.carNombre=cartografia.carNombre;// a�adimos nombre para mostrarlo en el layer switcher
						l.order=cartografia.carOrden;//importante!
						map.addLayer(l);
						raiseLayerOrder(l);
						
						if (l.CLASS_NAME=="OpenLayers.Layer.Vector") {
							// workaround: al a�adir por 1a vez un layer vector, no lo dibuja correctamente.
							l.redraw();
						}
						break;
					}
				}
			}
			catch(e){window.top.console.log("error",e);}
    	});
		return null;
	}

	var l= crearLayerDescrito(codigo,url,layers,layerUrlParams,layerParams, featureNS, geometryName);
	return l;
}

/**
 * Creamos un layer WFS a partir de la informaci�n sacada de la base de datos o de la peticion describeFeatureContainer
 * @param codigo cartoId a anadir
 * @param url url del servicio
 * @param layers layer a anadir
 * @param layerUrlParams parametros del servicio
 * @param layerParams parametros del layer
 * @param featureNS el featureNameSpace del layer
 * @param geometryName el nombre de la geometria
 * @returns el layer a anadir
 */
function crearLayerDescrito(codigo,url,layers,layerUrlParams,layerParams, featureNS, geometryName){
	var styleMap;
	var layer=layers.indexOf(":") >= 0 ? layers.substring(layers.indexOf(":") +1): layers;
	var prefix=layers.indexOf(":") >= 0 ? layers.substring(0, layers.indexOf(":")): layers;
	
	// allow testing of specific renderers via "?renderer=Canvas", etc
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    
	var l=new OpenLayers.Layer.Vector(codigo, {
        strategies: [new OpenLayers.Strategy.BBOX()],
        protocol: new OpenLayers.Protocol.WFS({
        	url: url,
        	featureType: layer,
        	featurePrefix:prefix,
        	featureNS:featureNS,
            geometryName: geometryName,
            maxFeatures:layerUrlParams.MAXFEATURES
        }),
      
        renderers: renderer,
        projection:new OpenLayers.Projection(layerParams.projection)
    });
	
	
	//Aplicamos un estilo definido
	if(typeof(layerUrlParams.STYLES) != "undefined"){
		styleMap=getVectorStyles(layerUrlParams.STYLES);
		  l.styleMap=styleMap;
	}
	else if(typeof(sitmunProperties["wfs.estilo."+ codigo +".strokeWidth"]) != "undefined"){
		styleMap=getVectorStyles("wfs.estilo."+ codigo);
	    l.styleMap=styleMap;
	}
	
	return l;
}

function createLayerGML(codigo,url,layers,layerUrlParams,layerParams) {
	console.log("createLayerGML");
	 var layer = new OpenLayers.Layer.Vector(codigo, {
	     strategies: [new OpenLayers.Strategy.Fixed()],
	     protocol: new OpenLayers.Protocol.HTTP({
	         url:url,
	         format: new OpenLayers.Format.GML({gmlns:"*"})
	     })
	 });
	 styleMap=getVectorStyles("capas.estilo.gml");
	 layer.styleMap=styleMap;
	 return layer;
}

function createLayerKML(codigo,url,layers,layerUrlParams,layerParams) {
	console.log("createLayerKML");
	 var layer = new OpenLayers.Layer.Vector(codigo, {
	     strategies: [new OpenLayers.Strategy.Fixed()],
	     protocol: new OpenLayers.Protocol.HTTP({
	         url:url,
	         format: new OpenLayers.Format.KML({
	        	  extractStyles: true, 
                  extractAttributes: false,
                  maxDepth: 0
                  ,internalProjection:new OpenLayers.Projection(map.projection)
              })
	     })
	 });
	 return layer;
};


function createLayerGEOJSON(codigo,url,layers,layerUrlParams,layerParams) {
	console.log("createLayerGeoJSON");
	 var layer = new OpenLayers.Layer.Vector(codigo, {
	     strategies: [new OpenLayers.Strategy.Fixed()],
	     protocol: new OpenLayers.Protocol.HTTP({
	         url:url,
	         format: new OpenLayers.Format.GeoJSON()
	     })
	 });
	 return layer;
}

function createLayerGEORSS(codigo,url,layers,layerUrlParams,layerParams) {
	console.log("createLayerGeoRSS");
	var layer = new OpenLayers.Layer.GeoRSS(codigo,url,{useFeedTitle:false, projection:new OpenLayers.Projection("EPSG:4326"), icon:new OpenLayers.Icon("img/poi.gif", new OpenLayers.Size(32,32))});
	return layer;
}


/**
 * Creamos capa especifica de DILLE que utiliza un KML con estilos propios.
 * Mantenemos en versi�n comuna por si algun socio necesita una solucion parecida.
 *
 */
function createLayerGEOMAPA(codigo,url,layers,layerUrlParams,layerParams) {
	console.log("createLayerKML");
	
	var myStyles = new OpenLayers.StyleMap({ 
	    "default": new OpenLayers.Style({ 
							externalGraphic: "http://www.geomapa.cat/images/gm-icones/"+layers+".png",
							//labelYOffset: 15,
							//label:"${name}",
							graphicWidth: 27,
							graphicHeight: 27
		}),
		"temporary": new OpenLayers.Style({ 
							externalGraphic: "http://www.geomapa.cat/images/gm-icones/"+layers+".png",
							//labelYOffset: 15,
							//label:"${name}",
							graphicWidth: 27,
							graphicHeight: 27
		}),
		"selected": new OpenLayers.Style({ 
							externalGraphic: "http://www.geomapa.cat/images/gm-icones/"+layers+".png",
							//labelYOffset: 15,
							//label:"${name}",
							graphicWidth: 27,
							graphicHeight: 27
		})
	});

	// creamos el layer.
	var layer = new OpenLayers.Layer.Vector(codigo, {
		strategies: [new OpenLayers.Strategy.Fixed()],
		styleMap:myStyles,
		protocol: new OpenLayers.Protocol.HTTP({
			url:url+layers,
			format: new OpenLayers.Format.KML({
				extractStyles: false, 
				extractAttributes: true,// para que extraiga nombre y link del kml.
				maxDepth: 1
				,internalProjection:new OpenLayers.Projection(map.projection)
			})
		})
	});

	// event added no ens el gestiona correctament, fem al moveend la 1a vegada.
	layer.events.register("moveend",layer,onKMLMoveEnd);
	
	return layer;
};

/*
*	Funcion utilizada el GEOMAPA DILLE.
*	scope del metodo: layer
*/
function onKMLMoveEnd(event) {
	console.log("onKMLMoveEnd");
	if (!this.eventsAfegits) {
		console.log("onKMLMoveEnd: afegim events...");

		var report = function(e) {
            console.log("REPORT: ",e);
        };

		// Metodo llamado en click a feature.
		var onKMLFeatureSelect=function(event) {
			console.log(onKMLFeatureSelect);
		    var feature = event.feature;
		    
		    var content = "<h3>"+feature.attributes.name + "</h3>" + feature.attributes.description;
		    /*if (content.search("<script") != -1) {
		        content = "Content contained Javascript! Escaped content below.<br>" + content.replace(/</g, "&lt;");
		    }*/
		    var popup = new OpenLayers.Popup.FramedCloud("GeomapaPopup", 
		                             feature.geometry.getBounds().getCenterLonLat(),
		                             new OpenLayers.Size(100,100),
		                             content,
		                             null, true/*, onKMLPopupClose*/);
		    feature.popup = popup;
		    map.addPopup(popup);
		};
		// No utilizado
		var onKMLPopupClose=function(event) {
		            select.unselectAll();
		        };
		// Metodo llamado en deselecionar feature.
		var onKMLFeatureUnselect=function(event) {
		    var feature = event.feature;
		    if(feature.popup) {
		        map.removePopup(feature.popup);
		        feature.popup.destroy();
		        delete feature.popup;
		    }
		};

		// Metodo ejecutado en eliminar el layer del mapa. Elimina los controles a�adidos.
		var onLayerRemoved = function(e) {
			try {
				console.log("onLayerRemoved");
				this.events.unregister("featureselected",this,onKMLFeatureSelect);
				this.events.unregister("featureunselected",this,onKMLFeatureUnselect);

				var selectCtrl=map.getControlsBy("name","selectCtrlGeomapa"+this.name);
				if (selectCtrl.length>0) {
					map.removeControl(selectCtrl[0]);
					selectCtrl[0].destroy();
				}

			} catch (e) {
				console.warn("Error eliminando layer de GEOMAPA",e);
			}
		};
		//----------------------------------
		// events feature selected --> s�n de layer
		this.events.register("featureselected",this,onKMLFeatureSelect);
		this.events.register("featureunselected",this,onKMLFeatureUnselect);
		this.map.events.register("removelayer",this,onLayerRemoved);

		// A�adimos el SelectFeature para este layer.
     
     	/*var selectCtrlArray=map.getControlsBy("name","selectCtrlGeomapa"+this.name);
     	debugger;
        if (selectCtrlArray.length>0) {// controlamos que se cargue solo 1 vez.
			selectCtrlArray[0].destroy();
        }*/
		var selectCtrl = new OpenLayers.Control.SelectFeature(this,{
			name:"selectCtrlGeomapa"+this.name,
			clickout: true //Unselect features when clicking outside any feature.
		});
		map.addControl(selectCtrl);
		selectCtrl.activate();
		//}

		// events hover --> cal control de tipus SelectFeature
		/*var select = new OpenLayers.Control.SelectFeature(this, {
                hover: false,
                highlightOnly: false,
                renderIntent: "temporary",// style a utilitzar
                eventListeners: {
                	beforefeaturehighlighted: report,
                    featurehighlighted: onKMLFeatureSelect,
                    //featureunhighlighted: onKMLFeatureUnselect
                }
            });

		this.map.addControl(select);
		select.activate();*/
		
		this.eventsAfegits=true;
		// unregister event, so be sure not calling again.
		this.events.unregister("moveend",this,onKMLMoveEnd);
	}
}
