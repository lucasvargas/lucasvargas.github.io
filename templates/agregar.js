            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card text-white bg-success mb-3 mt-3">
                        <div class="card-header"><h4>Nuevo Recordatorio</h4></div>
                        <div class="card-body">
                            <form class="mt-3">
                              <fieldset>

                                <div class="form-group">
                                  <label for="titulo">Título de la tarea</label>
                                  <input type="text" class="form-control" id="titulo" aria-describedby="titulo" placeholder="Ingrese un título"/>
                                  <small id="tituloDescripcion" class="form-text text-muted">Título de la tarea a realizar.</small>
                                </div>

                                <div class="form-group">
                                  <label for="descripcion">Descripción</label>
                                  <textarea class="form-control" id="descripcion" placeholder="Ingrese una descripcion" rows="3"></textarea>
                                </div>

                                <buton class="btn btn-primary" onclick="javascript: return btnGuardarClick();">Submit</button>

                              </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
