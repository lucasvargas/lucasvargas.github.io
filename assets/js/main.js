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

		// TODO cambiar a https://sweetalert.js.org/guides/
		alert("Tenes una nueva tarea!: \n\nTitulo: " + titulo + "\n\nDescripción: " + descripcion);

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
                    var template = Handlebars.compile(source);
                    let html = "";
                    if (archivoPagina == 'templates/listar.js'){
                    	let tareas = JSON.parse(localStorage.tareas)
						html = template(tareas);
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