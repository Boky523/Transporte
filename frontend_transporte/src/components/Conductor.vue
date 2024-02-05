<template>
  <div class="contenedor">
    <div class="superior">
      <div class="titulo"><span class="subtitulo">Gestion de conductores</span></div>
    </div>
    <div class="acciones">

      <div class="busqueda">

        <div class="container">
          <input id="input" type="text" placeholder="buscar conductor" v-model="buscado_v" />
          <button class="search__btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                fill="#efeff1"></path>
            </svg>
          </button>
        </div>

      </div>

      <div class="boton-accion">
        <a style="--clr: #7808d0" class="button" data-bs-toggle="modal" data-bs-target="#modal"
          @click="camtitulo('Crear cliente', true)">
          <span class="button__icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          Crear nuevo Conductor
        </a>
      </div>
    </div>

    <div class="tabla" style="overflow-y: scroll; max-height: 400px; position: relative">
      <table>
        <thead style="position: sticky; top: 0px; z-index: 1">
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Fecha nacimiento</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Clase pase</th>
            <th>Vigencia pase</th>
            <th>Fecha fin contrato</th>
            <th>Categoria pase</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(conductor, index) in conductor_filtra" :key="index">
            <td>{{ conductor.nombre }}</td>
            <td>{{ conductor.cedula }}</td>
            <td>{{ conductor.date_nacimiento }}</td>
            <td>{{ conductor.telefono }}</td>
            <td>{{ conductor.direccion }}</td>
            <td>{{ conductor.clase_pase }}</td>
            <td>{{ conductor.vigencia_pase }}</td>
            <td>{{ conductor.date_fin_contra }}</td>
            <td>{{ conductor.categoria_pase }}</td>
            <td>
              <img id="estaimg" src="../assets/cancelar.png" alt="" v-if="conductor.estado == false" type="button"
                class="estado true" @click="estado(false, conductor)" />

              <img id="estaimg" src="../assets/aceptar.png" alt="" v-else type="button" class="estado false"
                @click="estado(true, conductor)" />
            </td>

            <td>
              <img data-bs-toggle="modal" data-bs-target="#modal" @click="camtitulo('Editar Conductor', conductor)"
                class="editar" src="../assets/editar.png" alt="">
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ titulo_modal }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="quitar_val()"></button>
          </div>
          <div class="modal-body">
            <div class="datos-personales">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input autocomplete="off" type="text" v-model="nombre_v" id="nombre" class="form-control" />
              </div>

              <div class="form-group">
                <label for="cedula">Cédula</label>
                <input autocomplete="off" type="number" v-model="cedula_v" id="cedula" class="form-control" />
              </div>

              <div class="form-group">
                <label for="date_nacimiento">Fecha de Nacimiento</label>
                <input autocomplete="off" type="date" v-model="date_nacimiento_v" id="date_nacimiento"
                  class="form-control" />
              </div>

              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input autocomplete="off" type="number" v-model="telefono_v" id="telefono" class="form-control" />
              </div>

              <div class="form-group">
                <label for="direccion">Dirección</label>
                <input autocomplete="off" type="text" v-model="direccion_v" id="direccion" class="form-control" />
              </div>

            </div>



            <div class="datos-pase">
              <div class="tipo-pase">
                <div class="form-group">
                  <label for="clase_pase">Clase de Pase</label>
                  <input autocomplete="off" type="text" v-model="clase_pase_v" id="clase_pase" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="categoria_pase">Categoría del Pase</label>
                  <input autocomplete="off" type="text" v-model="categoria_pase_v" id="categoria_pase"
                    class="form-control" />
                </div>

              </div>

              <div class="fecha-pase">

              <div class="form-group">
                <label for="vigencia_pase">Vigencia del Pase</label>
                <input autocomplete="off" type="date" v-model="vigencia_pase_v" id="vigencia_pase" class="form-control" />
              </div>

              <div class="form-group">
                <label for="fechafin_contrato">Fecha de Fin de Contrato</label>
                <input autocomplete="off" type="date" v-model="fechafin_contrato_v" id="fechafin_contrato"
                  class="form-control" />
              </div>
              </div>
            </div>


            <div style="margin: 10px" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px">
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div>{{ alerta_v }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
              <symbol id="check-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </symbol>
              <symbol id="info-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </symbol>
              <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <div style="margin: 10px" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="quitar_val()">
              Cancelar
            </button>
            <button v-if="titulo_modal == 'Crear Conductor'" type="button" @click="crearConductor()"
              class="btn btn-primary">
              Crear Conductor
            </button>
            <button v-else type="button" @click="actualizar()" class="btn btn-primary">
              Editar Conductor
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
  
  
<script setup>
import { ref, onMounted, computed } from "vue";
import { useConductore } from "../stores/conductores";

let titulo_modal = ref("Crear Conductor");
let conductor_v = ref("");
let conductores_get = ref([]);
let nombre_v = ref("");
let cedula_v = ref("");
let date_nacimiento_v = ref("");
let telefono_v = ref("");
let direccion_v = ref("");
let clase_pase_v = ref("");
let vigencia_pase_v = ref("");
let fechafin_contrato_v = ref("");
let categoria_pase_v = ref("");
let buscado_v = ref("");
let alerta_v = ref("");
let validacion = ref(false);

const useconductores = useConductore();

async function pedirConductor_aqui() {
  let cosa = await useconductores.pedirconductor();
  conductores_get.value = cosa.data;
  conductores_get.value.reverse();
}

async function crearConductor() {
  if (validaciones() == true) {
    const nuevo_conductor = {
      nombre: nombre_v.value,
      cedula: cedula_v.value,
      date_nacimiento: date_nacimiento_v.value,
      telefono: telefono_v.value,
      direccion: direccion_v.value,
      clase_pase: clase_pase_v.value,
      vigencia_pase: vigencia_pase_v.value,
      date_fin_contra: fechafin_contrato_v.value,
      categoria_pase: categoria_pase_v.value,
      estado: true,
    };

    await useconductores.addConductor(nuevo_conductor);
    await pedirConductor_aqui();
    setTimeout(() => {
      validacion.value = false;

      limpiar();
    }, 2000);
  }
}

function camtitulo(titulo, conductor) {
  conductor_v.value = conductor._id;
  titulo_modal.value = titulo;
  if (titulo_modal.value == "Editar Conductor") {
    traer(conductor);
  } else {
    limpiar();
  }
}

async function actualizar() {
  if (validaciones() == true) {
    const clienteactuali = await useconductores.actualiConductor(
      conductor_v.value,
      nombre_v.value,
      cedula_v.value,
      date_nacimiento_v.value,
      telefono_v.value,
      direccion_v.value,
      clase_pase_v.value,
      vigencia_pase_v.value,
      fechafin_contrato_v.value,
      categoria_pase_v.value,
      true
    );
    await pedirConductor_aqui();

    setTimeout(() => {
      validacion.value = false;

      limpiar();
    }, 2000);
  }
}

function limpiar() {
  nombre_v.value = "";
  cedula_v.value = "";
  date_nacimiento_v.value = "";
  telefono_v.value = "";
  direccion_v.value = "";
  clase_pase_v.value = "";
  vigencia_pase_v.value = "";
  fechafin_contrato_v.value = "";
  categoria_pase_v.value = "";
}

function traer(conductor) {
  nombre_v.value = conductor.nombre;
  cedula_v.value = conductor.cedula;
  date_nacimiento_v.value = conductor.date_nacimiento;
  telefono_v.value = conductor.telefono;
  direccion_v.value = conductor.direccion;
  clase_pase_v.value = conductor.clase_pase;
  vigencia_pase_v.value = conductor.vigencia_pase;
  fechafin_contrato_v.value = conductor.date_fin_contra;
  categoria_pase_v.value = conductor.categoria_pase;
}

async function estado(estado, conductor) {
  conductor_v.value = conductor._id;
  if (estado == true) {
    const conductoractuali = await useconductores.actuestado(
      conductor_v.value,
      false
    );
    await pedirConductor_aqui();
  } else {
    const conductoractuali = await useconductores.actuestado(
      conductor_v.value,
      true
    );
    await pedirConductor_aqui();
  }
}

let conductor_filtra = computed(() => {
  if (buscado_v.value === "") {
    pedirConductor_aqui();
  }

  let cedulabuscada = buscado_v.value;
  let resultados = conductores_get.value.filter((conductor) =>
    conductor.cedula.includes(cedulabuscada)
  );

  return resultados;
});

function validaciones() {
  validacion.value = false;
  if (!nombre_v.value) {
    alerta_v.value = "El nombre es obligatoro";
  } else if (!cedula_v.value) {
    alerta_v.value = "La cedula es obligatoria";
  } else if (cedula_v.value.toString().length < 7) {
    alerta_v.value = "La cedula debe de tener minimo 7 numeros";
  } else if (!date_nacimiento_v.value) {
    alerta_v.value = "La fecha de nacimiento es obligatoria";
  } else if (date_nacimiento_v.value) {
    const dieciochoAniosEnMilisegundos = 18 * 365 * 24 * 60 * 60 * 1000; // 18 años en milisegundos
    const fechaActual = new Date();
    const fechaNacimiento = new Date(date_nacimiento_v.value);
    const edadEnMilisegundos =
      fechaActual.getTime() - fechaNacimiento.getTime();
    if (edadEnMilisegundos < dieciochoAniosEnMilisegundos) {
      alerta_v.value = "Debes tener al menos 18 años";
    } else if (!telefono_v.value) {
      alerta_v.value = "El telefono es necesario";
    } else if (!direccion_v.value) {
      alerta_v.value = "La direccion es obligatoria";
    } else if (!clase_pase_v.value) {
      alerta_v.value = "El campo Clase pase es obligatorio";
    } else if (!vigencia_pase_v.value) {
      alerta_v.value = "El campo vigencia pase es obligatorio";
    } else if (vigencia_pase_v.value) {
      console.log("entra a vigencia pase");
      const fechaActual = new Date();
      const fechaVigenciaPase = new Date(vigencia_pase_v.value);
      if (fechaVigenciaPase < fechaActual) {
        alerta_v.value =
          "La fecha de vigencia debe ser igual o posterior a hoy.";
      } else if (!fechafin_contrato_v.value) {
        alerta_v.value = "La fecha de fin contrato es necesaria";
      } else if (fechafin_contrato_v.value) {
        console.log("si entra a validar fecha de fin de contrato");
        const fechaActual = new Date();
        const fechaFinContrato = new Date(fechafin_contrato_v.value);
        const seisMesesEnMilisegundos = 6 * 30 * 24 * 60 * 60 * 1000; // Seis meses en milisegundos
        const fechaMinima = new Date(
          fechaActual.getTime() + seisMesesEnMilisegundos
        );

        if (fechaFinContrato <= fechaMinima) {
          alerta_v =
            "La fecha de fin de contrato debe ser al menos seis meses.";
        } else if (!categoria_pase_v.value) {
          alerta_v.value = "El campo categoria pase es necesario";
        } else {
          alerta_v.value = "";
          return (validacion.value = true);
        }
      }
    }
  }
}

function quitar_val() {
  alerta_v.value = "";
}

onMounted(() => {
  pedirConductor_aqui();
});
</script>
  
  
  
  
  
  
<style scoped>
.tipo-pase {
  display: flex;
  gap: 10px;
}
.fecha-pase {
  display: flex;
  justify-content: space-between;
}
</style>
  