var mapCanvas=null;
var vectorsCanvas=null;

var mapCanvas2=null;
var vectorsCanvas2=null;

var optionsMapaCanvas=null;
var centreMapaCanvas=null;
var comerX=null;
var comerY=null;

function initMap9()
{
    var proj='EPSG:25831';
    var resoluciones =[529.16772500211675,264.58386250105838,211.66709000084668,105.83354500042334,52.916772500211671,26.458386250105836,13.229193125052918,6.6145965625264589,5.2916772500211673,3.9687579375158752,2.6458386250105836,1.3229193125052918,0.52916772500211673,0.26458386250105836,0.13229193125052918];
    var layerResolutions = [529.16772500211675,264.58386250105838,211.66709000084668,105.83354500042334,52.916772500211671,26.458386250105836,13.229193125052918,6.6145965625264589,5.2916772500211673,3.9687579375158752,2.6458386250105836,1.3229193125052918,0.52916772500211673,0.26458386250105836,0.13229193125052918];
    var extentInicial = new OpenLayers.Bounds([562130, 4407407, 615999, 4440533]);

    var baseReferencia = new OpenLayers.Layer.ArcGISCache("Base referència", "http://ide.cime.es/Cache/IDEMenorca/baserefcatxe/_alllayers", {
        projection: new OpenLayers.Projection('EPSG:25831')
        //, maxExtent:new OpenLayers.Bounds(240000,4231160.131673529,655000,4698000)
        , maxExtent:new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
        , useArcGISServer:false
        , units: "m"
        , type: "jpg"
        , tileSize:new OpenLayers.Size(256,256)
        , tileOrigin: new OpenLayers.LonLat(240000, 4698000)
        , transitionEffect: 'resize'
        , buffer:1
        , resolutions: layerResolutions
    });
    
    var baseOrto = new OpenLayers.Layer.ArcGISCache("Orto 2012", "http://ideib.caib.es/arcgis/server/arcgiscache/public_Ortofoto/ORTOFOTO/_alllayers", {
        projection: new OpenLayers.Projection('EPSG:25831')
        , maxExtent:new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
        , useArcGISServer:false
        , units: "m"
        , type: "png"
        , tileSize:new OpenLayers.Size(256,256)
        , tileOrigin: new OpenLayers.LonLat(240000, 4698000)
        , transitionEffect: 'resize'
        , buffer:1
        , resolutions: layerResolutions
    });     
    
    vectorsCanvas = new OpenLayers.Layer.Vector(
        "markador",
        {
            styleMap: new OpenLayers.StyleMap({
                "default": {
                    externalGraphic: "${icon}",
                    graphicWidth: "${width}",
                    graphicHeight: "${height}",
                    labelYOffset: 25,
                    graphicYOffset: -19,
                    label: "${etiqueta}"
                }
            })
        }
    );    
    var options = { 
                    div: "mapCanvas",
                    maxExtent: new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
                    , restrictedExtent: new OpenLayers.Bounds(562130, 4397407, 615999, 4440533)
                    , projection: new OpenLayers.Projection('EPSG:25831')
                    , displayProjection: new OpenLayers.Projection('EPSG:25831')
                    , resolutions: resoluciones
                    , controls: [
                            new OpenLayers.Control.TouchNavigation({
                            dragPanOptions: {
                                enableKinetic: true
                            }
                            })
                        , new OpenLayers.Control.Zoom({zoomInText: "", zoomOutText: ""})
		    ]     
    };
    mapCanvas = new OpenLayers.Map(options);
    
    mapLon=593380;
    mapLat=4422249;
    mapZoom=1;

    mapCanvas.addLayers([baseReferencia,baseOrto,vectorsCanvas]);
    
    mapCanvas.setBaseLayer(mapCanvas.layers[0]);
    mapCanvas.layers[0].setIsBaseLayer(true);
    
    mapCanvas.setCenter(new OpenLayers.LonLat(mapLon, mapLat),5);
    
    
    
    
    
    
    
    
    
    
    
    
    
    var proj2='EPSG:25831';
    var resoluciones2 =[529.16772500211675,264.58386250105838,211.66709000084668,105.83354500042334,52.916772500211671,26.458386250105836,13.229193125052918,6.6145965625264589,5.2916772500211673,3.9687579375158752,2.6458386250105836,1.3229193125052918,0.52916772500211673,0.26458386250105836,0.13229193125052918];
    var layerResolutions2 = [529.16772500211675,264.58386250105838,211.66709000084668,105.83354500042334,52.916772500211671,26.458386250105836,13.229193125052918,6.6145965625264589,5.2916772500211673,3.9687579375158752,2.6458386250105836,1.3229193125052918,0.52916772500211673,0.26458386250105836,0.13229193125052918];
    var extentInicial2 = new OpenLayers.Bounds([562130, 4407407, 615999, 4440533]);

    var baseReferencia2 = new OpenLayers.Layer.ArcGISCache("Base referència", "http://ide.cime.es/Cache/IDEMenorca/baserefcatxe/_alllayers", {
        projection: new OpenLayers.Projection('EPSG:25831')
        //, maxExtent:new OpenLayers.Bounds(240000,4231160.131673529,655000,4698000)
        , maxExtent:new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
        , useArcGISServer:false
        , units: "m"
        , type: "jpg"
        , tileSize:new OpenLayers.Size(256,256)
        , tileOrigin: new OpenLayers.LonLat(240000, 4698000)
        , transitionEffect: 'resize'
        , buffer:1
        , resolutions: layerResolutions
    });
    
    var baseOrto2 = new OpenLayers.Layer.ArcGISCache("Orto 2012", "http://ideib.caib.es/arcgis/server/arcgiscache/public_Ortofoto/ORTOFOTO/_alllayers", {
        projection: new OpenLayers.Projection('EPSG:25831')
        , maxExtent:new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
        , useArcGISServer:false
        , units: "m"
        , type: "png"
        , tileSize:new OpenLayers.Size(256,256)
        , tileOrigin: new OpenLayers.LonLat(240000, 4698000)
        , transitionEffect: 'resize'
        , buffer:1
        , resolutions: layerResolutions
    });     
    
    vectorsCanvas2 = new OpenLayers.Layer.Vector(
        "markador",
        {
            styleMap: new OpenLayers.StyleMap({
                "default": {
                    externalGraphic: "${icon}",
                    graphicWidth: "${width}",
                    graphicHeight: "${height}",
                    labelYOffset: 25,
                    labelXOffset: -25,
                    graphicYOffset: 0,
                    label: "${etiqueta}"
                }
            })
        }
    );    
    var options2 = { 
                    div: "mapCanvasTur",
                    maxExtent: new OpenLayers.Bounds(562130, 4407407, 615999, 4440533)
                    , restrictedExtent: new OpenLayers.Bounds(562130, 4397407, 615999, 4440533)
                    , projection: new OpenLayers.Projection('EPSG:25831')
                    , displayProjection: new OpenLayers.Projection('EPSG:25831')
                    , resolutions: resoluciones
		    , controls: [
                            new OpenLayers.Control.TouchNavigation({
                            dragPanOptions: {
                                enableKinetic: true
                            }
                            })
                        , new OpenLayers.Control.Zoom({zoomInText: "", zoomOutText: ""})
		    ]                      
    };
    mapCanvas2 = new OpenLayers.Map(options2);
    
    mapLon2=593380;
    mapLat2=4422249;
    mapZoom2=1;

    mapCanvas2.addLayers([baseReferencia2,baseOrto2,vectorsCanvas2]);
    
    mapCanvas2.setBaseLayer(mapCanvas2.layers[0]);
    mapCanvas2.layers[0].setIsBaseLayer(true);
    
    mapCanvas2.setCenter(new OpenLayers.LonLat(mapLon2, mapLat2),5);    
}

function onFeatureSelectCanvas(feature){
	//Cidrem la funció detall quan fem un click al damunt
    for (var i=0; i<matriuPunts.length;i++)
    {
    	if (feature.id==matriuPunts[i].substr(0,matriuPunts[i].indexOf('#')))
    	{
	    	placeDetall(matriuPunts[i].substr(matriuPunts[i].indexOf('#')+1));
	    	break;	
    	}
    }
    
}
	
