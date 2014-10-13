var styleMapWidth;
var apkTurisme=true;


function getSize()
{
    document.getElementById('menuSplash').style.bottom = $("div[data-role='footer']:visible").outerHeight() + 'px';
    //alert(document.getElementById('imgAdmin').height);
    document.getElementById('splash_peu_1').style.bottom = (document.getElementById('imgAdmin').height + 20) + 'px'; 
    document.getElementById('hand2').style.bottom = (document.getElementById('imgAdmin').height + 20) + 'px';
    
    document.getElementById('imgLogoIni').style.width = ((window.innerWidth) - (window.innerWidth /2)) + 'px';
    var logoWidth = parseInt(document.getElementById('imgLogoIni').style.width);
    var centre = (window.innerWidth - logoWidth) / 2;
    document.getElementById('imgLogoIni').style.left= centre + 'px';
    document.getElementById('imgLogoIni').style.visibility = 'visible';
    document.getElementById('imgLogo').style.width = window.innerWidth + 'px';
    document.getElementById('mapCanvas').style.height = (window.innerHeight/2) + 'px';
    document.getElementById('mapCanvas').style.width = (window.innerWidth) + 'px';
    
    document.getElementById('mapCanvasTur').style.height = (window.innerHeight/2) + 'px';
    document.getElementById('mapCanvasTur').style.width = (window.innerWidth-10) + 'px';    
}

function setHeader()
{
    if (apkTurisme==true) {
        $.mobile.hidePageLoadingMsg('Searching');
        $('#lblInfo0').html("")    
    }
    
	if ((newMunicipi != currentMunicipi) && (menuIniciat==false)) 
	{
		//alert("setHeader-->\nnewMunicipi: " + newMunicipi + "\ncurrentMunicipi: " + currentMunicipi)
		if (newMunicipi=="") newMunicipi="07000"
		currentMunicipi = newMunicipi
		setHeaderFixe();
	}	
}

function setHeaderFixe() 
{
        //alert(textIdioma(3))
		if(currentMunicipi=="07902") currentMunicipi="07067";
		//document.getElementById('imgLogoMuni').src="img/fons/" + currentMunicipi + ".jpg"
		document.getElementById('imgLogoMuni').src="img/fons/" + newMunicipi + ".jpg"
		document.getElementById('imgLogoMuni').style.width = window.innerWidth + 'px';
		
		document.getElementById('imgLogoMuni2').src="img/fons/" + currentMunicipi + ".jpg"
		document.getElementById('imgLogoMuni2').style.width = window.innerWidth + 'px';

		document.getElementById('imgLogo').src="img/fons/" + currentMunicipi + ".jpg"
		document.getElementById('imgLogo').style.width = window.innerWidth + 'px';

		if (currentMunicipi!="07000")
		{
			if (currentMunicipi=="07002") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Alaior"))
			if (currentMunicipi=="07015") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Ciutadella"))
			if (currentMunicipi=="07023") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Ferreries"))
			if (currentMunicipi=="07032") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Ma&oacute;"))
			if (currentMunicipi=="07037") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Es Mercadal"))
			if (currentMunicipi=="07052") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Sant Llu&iacute;s"))
			if (currentMunicipi=="07064") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Es Castell"))
			if (currentMunicipi=="07067") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Es Migjorn Gran"))
			if (currentMunicipi=="07070") $('#lbl_home_0').html(textIdioma(9).replace("MUNICIPI", "Consell Insular de Menorca"))

            if (currentMunicipi=="07002") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Alaior"))
            if (currentMunicipi=="07015") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Ciutadella"))
            if (currentMunicipi=="07023") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Ferreries"))
            if (currentMunicipi=="07032") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Ma&oacute;"))
            if (currentMunicipi=="07037") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Es Mercadal"))
            if (currentMunicipi=="07052") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Sant Llu&iacute;s"))
            if (currentMunicipi=="07064") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Es Castell"))
            if (currentMunicipi=="07067") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Es Migjorn Gran"))
            if (currentMunicipi=="07070") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Consell Insular de Menorca"))

			if (newMunicipi=="07002") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Alaior"))
			if (newMunicipi=="07015") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Ciutadella"))
			if (newMunicipi=="07023") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Ferreries"))
			if (newMunicipi=="07032") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Ma&oacute;"))
			if (newMunicipi=="07037") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Es Mercadal"))
			if (newMunicipi=="07052") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Sant Llu&iacute;s"))
			if (newMunicipi=="07064") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Es Castell"))
			if (newMunicipi=="07067") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Es Migjorn Gran"))		
            if (newMunicipi=="07070") $('#lbl_Muni_0').html(textIdioma(3).replace("MUNICIPI", "Consell Insular de Menorca"))       

            if (apkTurisme==false) $.mobile.changePage($("#pageMainMunicipi"));

		}
		else{
			if (apkTurisme==false) $.mobile.changePage($("#pageMainMunicipi2"));
		}		
		
		
}

function goAdmin()
{
    if (currentMunicipi!="07000"){
        $.mobile.changePage($("#pageMainMunicipi"));
    }
    else{
        $.mobile.changePage($("#pageMainMunicipi2"));
    }
}
