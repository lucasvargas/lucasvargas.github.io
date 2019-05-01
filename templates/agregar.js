            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card text-white bg-success mb-3 mt-3">
                        <div class="card-header"><h4>Nuevo Tarea</h4></div>
                        <div class="card-body">
                            <form class="mt-3">
                              <fieldset>

                                <div class="form-group">
                                  <label for="titulo"><h4>Título de la tarea</h4></label>
                                  <input type="text" class="form-control text-black" id="titulo" aria-describedby="titulo" placeholder="Ingrese un título"/>
                                </div>

                                <div class="form-group">
                                  <label for="descripcion"><h4>Descripción</h4></label>
                                  <textarea class="form-control text-black" id="descripcion" placeholder="Ingrese una descripcion" rows="3"></textarea>
                                </div>

                                <buton class="btn btn-primary" onclick="javascript: return btnGuardarClick();">Submit</button>

                              </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
