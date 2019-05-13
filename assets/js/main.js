var template;
let latitud, longitud;

var handlebarsCompile = function(source){
	return Handlebars.compile(source);
}

var btnGuardarClick = function () {

	let titulo = document.querySelector('#titulo').value;
	let descripcion = document.querySelector('#descripcion').value;
	let latitud = document.querySelector('#latitud').value != '' ? document.querySelector('#latitud').value : 0;
	let longitud = document.querySelector('#longitud').value != '' ? document.querySelector('#longitud').value : 0;

	if (titulo.trim() == "" || descripcion.trim() == "" ){

		Swal.fire({
			type: "error",
			title: "¡Hay datos que faltan!",
			html: "Por favor completá los campos vacios, titulo y/o descripción.",
			confirmButtonText: 'Cerrar!',
		});

	}else{

		var tareas = localStorage.tareas;
		let tarea = {
					 'titulo': titulo , 
					 'descripcion': descripcion, 
					 'latitud': latitud, 
					 'longitud': longitud
					};

		if (tareas === undefined){
			let array = [];
			array.push(tarea)
			localStorage.setItem('tareas', JSON.stringify(array));
			tareas = JSON.parse(localStorage.tareas);
		}else{
			tareas = JSON.parse(localStorage.tareas);
			tareas.push(tarea);
			localStorage.setItem('tareas', JSON.stringify(tareas));
		}

		document.querySelector('#titulo').value = "";
		document.querySelector('#descripcion').value = "";

		Swal.fire({
			type: "success",
			title: "¡Nueva tarea creada!",
			html: "<p>Titulo: " + titulo + "</p><p>Descripción: " + descripcion + "</p>",
			confirmButtonText: 'Continuar!',
		});
	}
}

var cargarPagina = function (archivoPagina){
    var misCabeceras = new Headers();
    var miInit = { method: 'GET',
                   headers: misCabeceras,
                   mode: 'cors',
                   cache: 'default' };
    fetch(archivoPagina, miInit)
    .then((response)=>{
        response.text()
            .then((source)=>{
                    template = handlebarsCompile(source);
                    let html = "";
                    if (archivoPagina == 'templates/listar.js'){
						html = template(listarTareas());
                    }else{
                    	html = template();
                    }
                    $('#contenido').html(html);

                    if (archivoPagina == 'templates/agregar.js'){

	                    getUbicacion().then((objeto_position, error) => {
		                	latitud = objeto_position.coords.latitude;
		                	longitud = objeto_position.coords.longitude;
		                	document.getElementById('latitud').value = latitud;
		                	document.getElementById('longitud').value = longitud;
		            	});

                    }
            })
    })
    .catch((error)=>{
        console.log(error);
    });
}

var traerTareas = function(archivoPagina){

	var misCabeceras = new Headers();
    var miInit = { method: 'GET',
                   headers: misCabeceras,
                   mode: 'cors',
                   cache: 'default' };
    fetch(archivoPagina, miInit)
    .then((response)=>{
        response.text()
            .then((source)=>{
				template = handlebarsCompile(source);
				$('#contenido').html(template(listarTareas()));
            })
    })
    .catch((error)=>{
        console.log(error);
    });

}

var listarTareas = function(buscar){
	let lsTareas = localStorage.tareas;
	let tareas = [];
	if (lsTareas !== undefined){
		tareas = JSON.parse(localStorage.tareas);
		let buscar = document.querySelector("#buscar").value;
		if (buscar.trim() != ""){
			tareas = tareas.filter(x => ((x.titulo.toLowerCase().includes(buscar.toLowerCase())) ||
			(x.descripcion.toLowerCase().includes(buscar.toLowerCase()))));
		}
	}
	return tareas;
}

var verUbicacion = function(latitud, longitud){

	let url = 'https://maps.google.com?saddr=Current+Location&daddr=' + latitud + ',' + longitud + '';
	console.log(url);
	window.open (url,"maps");

}

function loaderVisible(){
    let overlay = document.getElementById('loading');
    overlay.classList.add('visible');
}

function loaderInvisible(){
    let overlay = document.getElementById('loading');
    overlay.classList.remove('visible');
}

function solicitarPermisosPush(){
    loaderVisible();
    return new Promise(
    	(resolve) => {
    		Notification.requestPermission()
		    .then(
		    	(function(respuesta_del_usuario){resolve(respuesta_del_usuario)})
    		)
		}
	)
	}

function getUbicacion(){
    return new Promise( (resolve, reject) => {
        if("geolocation" in navigator){
            navigator.geolocation
                .getCurrentPosition(
                    function(coordenadas){ resolve(coordenadas)}, 
                    function(error){ reject(error)}
                )
        }
    })
}

getUbicacion()
	.then(
		(objeto_position) => {}
		)
	.catch(
		(error) => {
			Swal.fire({
				type: "info",
				title: "¡Geolocalización desactivada!",
				html: "Para tener una mejor experiencia con <strong>Memorex</strong>, active la geolocalización.",
				confirmButtonText: 'Continuar!',
			});
		}
		);

solicitarPermisosPush()
	.then(	
		(permisos) => {
			if (permisos != 'granted'){
				Swal.fire({
				type: "info",
				title: "¡Notificaciones desactivadas!",
				html: "Para tener una mejor experiencia con <strong>Memorex</strong>, active las notificaciones.",
				confirmButtonText: 'Continuar!',
				});
			}
			loaderInvisible();
		}
		);