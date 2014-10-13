
function preparaMenu(idmun)
{
	var welcome = "";
	selectedMuni=true;
    var position = null;

    $("#llistaMenuPral").empty();
    //$("#llistaMenuPral").append('<li ><a href="#pageInfoMunicipal"><img src="img/icones/info2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(15) +'</div></a></li>');
    $("#llistaMenuPral").append('<li data-icon="false"><a href="#pageAgendaCultural"><img src="img/icones/agenda2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(16) +'</div></a></li>');
    $("#llistaMenuPral").append('<li data-icon="false"><a href="#pageNoticies"><img src="img/icones/news.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(17) +'</div></a></li>');
    $("#llistaMenuPral").append('<li data-icon="false"><a href="#pageTramits"><img src="img/icones/tramit3.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(18) +'</div></a></li>');
	    
    
	if (idmun=="07002") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Alaior");	
		position=new OpenLayers.LonLat(597383,4421024);
		selectedLon=597383;
		selectedLat=4421024;
		//document.getElementById("btnHomeComer").style.visibility="hidden";

	}
	if (idmun=="07015") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Ciutadella")
		position=new OpenLayers.LonLat(571371,4428187);
        selectedLon=571371;
        selectedLat=4428187;
        //document.getElementById("btnHomeComer").style.visibility="hidden"; 		
	}
	if (idmun=="07023") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Ferreries");
		position=new OpenLayers.LonLat(586311,4426404);
		selectedLon=586311;
        selectedLat=4426404;
        //$("#llistaMenuPral").append('<li ><a href="#pageQueixes"><img src="img/icones/camara2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(19) +'</div></a></li>');
	}
	if (idmun=="07032") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Maó");
		position=new OpenLayers.LonLat(608237,4416191);
        selectedLon=608237;
        selectedLat=4416191;	
        //document.getElementById("btnHomeComer").style.visibility="hidden"; 
        
        
        //$("#llistaMenuPral").append('<li ><a href="#" onclick=\'window.open("http://www.liniaverdamao.com/Index.asp", "_system")\'><img src="img/liniaverda.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">Linia verda</div></a></li>');
        //$("#llistaMenuPral").append('<li ><a href="#pageQueixes"><img src="img/icones/camara2.png"/>' + textIdioma(19) +'</a></li>');        
        //$("#llistaMenuPral").append('<li ><a href="#pageComer"><img src="img/icones/comer.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(20) +'</div></a></li>');
	}
	if (idmun=="07037") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Es Mercadal");
		position=new OpenLayers.LonLat(593300,4427066);
        selectedLon=593300;
        selectedLat=4427066;
        //$("#llistaMenuPral").append('<li ><a href="#pageQueixes"><img src="img/icones/camara2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(19) +'</div></a></li>');
        //$("#llistaMenuPral").append('<li ><a href="#pageComer"><img src="img/icones/comer.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(20) +'</div></a></li>');
        //document.getElementById("btnHomeComer").style.visibility="visible";		
	}
	if (idmun=="07052") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Sant Lluís");
		position=new OpenLayers.LonLat(607611,4411770);
        selectedLon=607611;
        selectedLat=4411770;
        //$("#llistaMenuPral").append('<li ><a href="#pageQueixes"><img src="img/icones/camara2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(19) +'</div></a></li>');
        $("#llistaMenuPral").append('<li data-icon="false"><a href="#pageComer"><img src="img/icones/comer.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(20) +'</div></a></li>');
        //document.getElementById("btnHomeComer").style.visibility="visible";	
	}
	if (idmun=="07064") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Es Castell");
		position=new OpenLayers.LonLat(610367,4415212);
        selectedLon=597383;
        selectedLat=4421024;	
        //$("#llistaMenuPral").append('<li ><a href="#pageQueixes"><img src="img/icones/camara2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(19) +'</div></a></li>');
        $("#llistaMenuPral").append('<li data-icon="false"><a href="#pageComer"><img src="img/icones/comer.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(20) +'</div></a></li>');
        //document.getElementById("btnHomeComer").style.visibility="visible"; 
	}
	if (idmun=="07902") 
	{
		welcome=textIdioma(3).replace("MUNICIPI", "Es Migjorn");
		position=new OpenLayers.LonLat(589669,4422358);
        selectedLon=589669;
        selectedLat=4422358;	
        //$("#llistaMenuPral").append('<li ><a href="#pageQueixes"><img src="img/icones/camara2.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(19) +'</div></a></li>');
        $("#llistaMenuPral").append('<li data-icon="false"><a href="#pageComer"><img src="img/icones/comer.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(20) +'</div></a></li>');
        //document.getElementById("btnHomeComer").style.visibility="visible";
	}
    if (idmun=="07070") 
    {
        welcome=textIdioma(3).replace("MUNICIPI", "Consell Insular de Menorca");
        position=new OpenLayers.LonLat(607436,4415034);
        selectedLon=607436;
        selectedLat=4415034;     
        //document.getElementById("btnHomeComer").style.visibility="hidden"; 
    }	

    if (idmun!="07070") 
    {
        $("#llistaMenuPral").append('<li data-icon="false" data-theme="e"><a href="#mainContainer"><img src="img/icones/map-icon.gif" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(42) +'</div></a></li>');
        $("#llistaMenuPral").append('<li data-icon="false" data-theme="e" onclick="adrecaMuni()"><a href="#"><img src="img/icones/mapa.png" style="height:50px;top:15px;left:15px;"><div style="position:absolute;top:30px;">' + textIdioma(46) +'</div></a></li>');    
    }

	
	//$('#lbl_home_0').html(welcome)
	if(position!=null)
	{
		map.setCenter(position, 12);
	}
	try{
	   $("#llistaMenuPral").listview("refresh");    
	}
	catch(err)
	{}
	
	
	
	setHeaderFixe();
	$.mobile.changePage("#home");
}


function adrecaMuni()
{
    var id=currentMunicipi.substr(2);
    if (id=="067") id="902";
    searchAdrecaGeneric(buscadorAdrNucli,id,"#llistaNuclis","#searchpageCarrers2");
    //$.mobile.changePage("#searchpageCarrers1");
    //$("#btMunicipi1 .ui-btn-text").text(ds);    
    
}

