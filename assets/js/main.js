var template;

var handlebarsCompile = function(source){
	return Handlebars.compile(source);
}

var btnGuardarClick = function () {

	let titulo = document.querySelector('#titulo').value;
	let descripcion = document.querySelector('#descripcion').value;

	if (titulo.trim() == "" || descripcion.trim() == "" ){

		alert("Por favor complete los campos vacios.");

	}else{

		var tareas = localStorage.tareas;
		let tarea = {'titulo': titulo , 'descripcion': descripcion};

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