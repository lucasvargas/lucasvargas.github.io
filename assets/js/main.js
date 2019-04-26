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

		cargarTarjetas(tareas);

		document.querySelector('#titulo').value = "";
		document.querySelector('#descripcion').value = "";

		alert("Tenes una nueva tarea!: \n\nTitulo: " + titulo + "\n\nDescripción: " + descripcion);

	}
}

var mostrarTarjetas = function(){
	
	let contenido = localStorage.tareas;
	if (contenido !== undefined){
		cargarTarjetas(JSON.parse(localStorage.tareas));
	}

}

var cargarTarjetas = function(tareas){

	document.getElementById('tarjetas').innerHTML = "";

	for (let tr in tareas) {
		let count = 1 + parseInt(tr);
	    let div = document.createElement('div');
	    div.className ="card text-white bg-warning mb-3";
	    div.innerHTML ="<div class='card-header'>Tarea " + count + "</div><div class='card-body'><h4 class='card-title'><span>" + tareas[tr].titulo + "</span></h4><p class='card-text'><span>" + tareas[tr].descripcion + "</span></p></div>"
		let div_col = document.createElement('div');
		div_col.className = "col-sm-6 col-md-4 col-lg-3";
		div_col.appendChild(div);
	    document.getElementById('tarjetas').appendChild(div_col);

    }
}