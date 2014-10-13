var pictureSource;   // picture source
var destinationType; // estableix el format del valor retornat
var fotoCapturada;
var codi64="";

function peraparaCamara()
{
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;   
}



function takePicture() {
    navigator.camera.getPicture(
        function(uri) {
            
            
            $.mobile.showPageLoadingMsg( 'Searching' );

            //Establim el factor de resize
            var currentWidth=0;
            var currentHeight=0;         
            codi64=0;   
           
            window.imageResizer.getImageSize(
                  function(data) { 
                    currentWidth = data.width;
                    currentHeight = data.height;
                    var factor = 1;
                    if (currentWidth >= currentHeight)
                    {
                        factor = parseFloat(1024 / currentWidth).toFixed(3);
                    }
                    else{
                        factor = parseFloat(1024 / currentHeight).toFixed(3);
                    }
                    //alert(currentWidth + " " + currentHeight + " " + factor);
                    
                    //Caviem la mida de la imatge
                    window.imageResizer.resizeImage(
                          function(data) { 
                            var image = document.getElementById('largeImage');
                            image.src = "data:image/jpeg;base64," + data.imageData; 
                            //alert(data.width);
                            //$('#codi64').val(data.imageData);
                            codi64=data.imageData;
                            $.mobile.hidePageLoadingMsg( 'Searching' );
                            
                          }, function (error) {
                            console.log("Error : \r\n" + error);
                          }, 
                            uri,factor,factor,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
                    );                
                    
                    
                  }, function (error) {
                    console.log("Error : \r\n" + error);
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                  }, 
                    uri,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
            );            
            
        },
        function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error fent la foto.";
        },
        { 
            quality: 50, 
            //destinationType: navigator.camera.DestinationType.FILE_URI, 
            destinationType: navigator.camera.DestinationType.DATA_URL,
            //saveToPhotoAlbum: true,
            //allowEdit : true,
            //encodingType: Camera.EncodingType.JPEG,           
            correctOrientation:true
            //,targetWidth: 800
            //,targetHeight: 600

        }
    );
};


/**
 * Select picture from library
 */
function selectPicture() {
    navigator.camera.getPicture(
        function(uri) {
            $.mobile.showPageLoadingMsg( 'Searching' );
            //Establim el factor de resize
            var currentWidth=0;
            var currentHeight=0;        
            codi64=0;    
            
            window.imageResizer.getImageSize(
                  function(data) { 
                    currentWidth = data.width;
                    currentHeight = data.height;
                    var factor = 1;
                    if (currentWidth >= currentHeight)
                    {
                        factor = parseFloat(1024 / currentWidth).toFixed(3);
                    }
                    else{
                        factor = parseFloat(1024 / currentHeight).toFixed(3);
                    }
                    //alert(currentWidth + " " + currentHeight + " " + factor);
                    
                    //Caviem la mida de la imatge
                    window.imageResizer.resizeImage(
                          function(data) { 
                            var image = document.getElementById('largeImage');
                            image.src = "data:image/jpeg;base64," + data.imageData; 
                            //alert(data.width);
                            //$('#codi64').val(data.imageData);
                            codi64=data.imageData
                            $.mobile.hidePageLoadingMsg( 'Searching' );
                            
                          }, function (error) {
                            console.log("Error : \r\n" + error);
                          }, 
                            uri,factor,factor,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
                    );                
                    
                    
                  }, function (error) {
                    console.log("Error : \r\n" + error);
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                  }, 
                    uri,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
            );
            
            

            
        },
        function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error getting picture.";
        },
        {   
            quality: 50, 
            destinationType: navigator.camera.DestinationType.DATA_URL, 
            //destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation:true
        }
    );
};

    

function upload() {
    if (validarNif($("#NIF").val().toUpperCase())!="ok")
    {
        alert(validarNif($("#NIF").val().toUpperCase()));
        return;
    }
    
    if (validarEmail($("#Mail").val().toUpperCase())!="ok")
    {
        alert(validarEmail($("#Mail").val().toUpperCase()));
        return;
    }
    
    if (currentMunicipi=="")
    {
        alert("No s'ha escollit cap municipi");
        return;
    }    
    
    if ($("#IdArea").val()==null)
    {
        alert("No s'ha escollit cap àrea de l'ajuntament");
        return;
    }      
  

    // Get URI of picture to upload
    //var img = document.getElementById('canvasImg');
    //var imageURI = img.src;
    
    //imageURI=$('#codi64').val();
    imageURI = codi64;
    
    var totOk=true;
    if (!imageURI ) {
        totOk=false;
        var r = confirm("No s'ha escollit cap fotografia... Segur que vols enviar la sol·licitiud?");
        if (r == true) totOk=true;
    }
    
    if (totOk==true)
    {
        try {
            
            var url="http://ide.cime.es/test/";
            
            if (currentMunicipi=="07002") url='http://www.aj-alaior.org/';
            if (currentMunicipi=="07015") url='http://www.ajciutadella.org/';
            if (currentMunicipi=="07023") url='http://www.ajferreries.org/';
            if (currentMunicipi=="07032") url='http://www.ajmao.org/wssaveimage/';
            if (currentMunicipi=="07037") url='http://www.aj-esmercadal.org/';
            if (currentMunicipi=="07052") url='http://www.ajsantlluis.org/';
            if (currentMunicipi=="07064") url='http://www.aj-escastell.org/';
            if (currentMunicipi=="07067") url='http://www.ajmigjorngran.org/';              
    
            url += "/wssaveimage/saveImage.aspx";
            
            $.mobile.showPageLoadingMsg( 'Searching' );
            
            var vTexte = $("#Texte").val();
            var vMunicipi = currentMunicipi;
            var vNom = $("#Nom").val();
            var vMail = $("#Mail").val();
            var vIdArea = $("#IdArea").val();
            /*
            var vDomicili = $("#Domicili").val();
            var vPoblacio = $("#Poblacio").val();
            var vCPostal = $("#CPostal").val();
            var vTelefon = $("#Telefon").val();
            */
            var vNIF = $("#NIF").val();

                
                $.ajax({
                    type: "POST",
                    //url: "http://ide.cime.es/test/saveImage.aspx",
                    url : url,
                    data: { 
                        app: "sitmunmobil"
                        , image: imageURI
                        , opcio: "queixa"
                        , vNom: vNom 
                        , vMail: vMail 
                        , vIdArea: vIdArea 
                        //, vDomicili: vDomicili 
                        //, vPoblacio: vPoblacio 
                        //, vCPostal: vCPostal 
                        //, vTelefon: vTelefon 
                        , vNIF: vNIF 
                        , vTexte: vTexte
                        , vMunicipi: vMunicipi
                        , vLongitud: currentLon
                        , vLatitud: currentLat
                    }
                }).done(function (msg) {
                    //alert(msg);
                    var resultat = msg.split("|");
                    var res1 = "Fotografia NO guardada correctament";
                    var res2 = "Incidència NO reportada correctament";
                    if (resultat[0].trim()=="true")
                    {
                        res1 = textIdioma(40);
                    }
                    if (resultat[1].trim()=="true")
                    {
                        var res2 = textIdioma(41);
                    }
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                    document.getElementById('camera_status').innerHTML = res1 + '<br>' + res2;
                }).fail(function (a, b) {
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                    document.getElementById('camera_status').innerHTML = "Errada en guardar:" + b;
                });
                
    
        }
        catch (ex) {
            alert(ex);
        }
    }
}


function validarNif(dni) {
  //alert(dni);
  var numero;
  var let;
  var letra;
  var expresion_regular_dni;
  var resposta="ok";
 
  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
 
  if(expresion_regular_dni.test (dni) == true){
     numero = dni.substr(0,dni.length-1);
     let = dni.substr(dni.length-1,1);
     numero = numero % 23;
     letra='TRWAGMYFPDXBNJZSQVHLCKET';
     letra=letra.substring(numero,numero+1);
     if (letra!=let) {
       resposta ='Dni incorrecte, la lletra del NIF no es correspon';
     }else{
       resposta="ok";
     }
  }else{
     resposta= 'Dni incorrecte, format no vàlid';
   }
   return resposta
}


function validarEmail(email) {
    var resposta="ok";
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        resposta="Email incorrecte";
    }
    return resposta;
}




/*
var pictureSource;   // picture source
var destinationType; // estableix el format del valor retornat
var fotoCapturada;
var fotoBase64="";

function peraparaCamara()
{
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;	
}

function onPhotoDataSuccess(imageData) {	
    var smallImage = document.getElementById('smallImage');
    //mostrant les imatges
    smallImage.style.display = 'block';
    //mostra la imatge feta
    smallImage.src = "data:image/jpeg;base64," + imageData;
    fotoBase64= "data:image/jpeg;base64," + imageData;
    fotoCapturada = imageData[0];
  }

//quan la foto s'ha retornat correctament
function onPhotoURISuccess(imageURI) {
 
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
}


function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

// Funció cridada amb el botó Fer foto
function capturePhoto() {
	// Fa sa foto amb la cà mara del dispositiu i la recupera com una cadena codificada en base 64
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	    destinationType: Camera.DestinationType.DATA_URL
	});	
}

//Funció cridada amb el botó fer una foto editable
function capturePhotoEdit() {
    // Fa una foto amb la cà mara del dispositiu, permet editar-la, la retorna com una cadena en base 64
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL });
}

// Funció cridada amb el botó tria una imatge
function getPhoto(source) {
	// Podem triar una foto guardada
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });
}

*/