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

    getUbicacion().then((objeto_position) => {
    	platitud = objeto_position.coords.latitude;
    	plongitud = objeto_position.coords.longitude;
    	let url = 'https://maps.google.com?saddr=' + platitud + ',' + plongitud + '&daddr=' + latitud + ',' + longitud + '';
		window.open (url,"maps");
	});

}

var loaderVisible = function(){
    let overlay = document.getElementById('loading');
    overlay.classList.add('visible');
}

var loaderInvisible = function(){
    let overlay = document.getElementById('loading');
    overlay.classList.remove('visible');
}

var solicitarPermisosPush = function(){
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

var getUbicacion = function(){
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

var llamadaafetch = function(){
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((result)=> result.json())
    .then(json => 
    			Swal.fire({
					type: "info",
					title: json.title,
					html: json.body,
					confirmButtonText: 'Continuar!',
				})
    	);
}

var btnGuardarPost = function(){
    fetch('https://jsonplaceholder.typicode.com/posts', 
    {
	  method: 'POST'
	})
    .then((result)=> 
			Swal.fire({
				type: "success",
				title: "¡Tus recordatorios están a salvo!",
				html: result.statusText,
				confirmButtonText: 'Continuar!',
			})
			); 
}