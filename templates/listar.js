    		<div class="row mt-3">
    			<div class="col-12">
    				<button onclick="btnGuardarPost()" class="btn btn-success float-right">Guardar</button>
    			</div>
    		</div>
    		<div class="row mt-3" id="tarjetas">
    			{{#each this}}
    			<div class="col-sm-6 col-md-4 col-lg-3">
	    			<div class="card text-white bg-warning mb-3">
	    				<div class="card-header">
	    					Tarea
	    				</div>
						<div class="card-body">
							<h4 class="card-title">
								<span>{{titulo}}</span>
							</h4>
							<p class="card-text">
								<span>{{descripcion}}</span>
							</p>
							<p class="card-text">
								<a href='#' onclick='verUbicacion({{latitud}},{{longitud}})'>
								Ver Ubicación
								</a>
							</p>
							<p class="card-text">
								<span></span>
							</p>
						</div>
	    			</div>
    			</div>
    			{{/each}}
    		</div>