<template>
  <div class="contenedor">


    <div class="superior">
      <div class="titulo">
        <span class="subtitulo">Gestion de clientes</span>
      </div>
      <div class="acciones">

        <div class="busqueda">

          <div class="container">
            <input id="input" v-model="buscado_v" type="number" placeholder="Buscar Cedula" class="input">
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
                <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>

            </span>
            Crear nuevo Cliente
          </a>
        </div>




      </div>
    </div>






    <div class="a" v-if="useclientes.lodin == true">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <div v-else class="tabladiv">
      <div class="tabla" style="overflow-y: scroll; max-height: 400px; position: relative">
        <table>
          <thead style="position: sticky; top: 0px; z-index: 1">
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>telefono</th>
              <th>Cambio de Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cliente, index) in clientes_filtra" :key="index">
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.cedula }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>
                <img id="estaimg" src="../assets/cancelar.png" alt="" v-if="cliente.estado == false" type="button"
                  class="estado true" @click="estado(false, cliente)" />
                <img id="estaimg" src="../assets/aceptar.png" alt="" v-else type="button" class="estado false"
                  @click="estado(true, cliente)" />
              </td>
              <td>
                <img data-bs-toggle="modal" data-bs-target="#modal"
                  @click="camtitulo('Editar cliente', cliente)" class="editar" src="../assets/editar.png" alt="">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ titulo_modal }}
            </h1>
            <button @click="quitar_val()" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input autocomplete="off" type="text" v-model="nombre_v" id="nombre" class="form-control" />
            </div>

            <div class="form-group">
              <label for="cedula">Cédula</label>
              <input autocomplete="off" type="number" v-model="cedula_v" id="cedula" class="form-control" />
            </div>

            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input autocomplete="off" type="text" v-model="telefono_v" maxlength="10" id="telefono"
                class="form-control" />
            </div>



            <div style="margin: 10px;" class="alert alert-danger d-flex align-items-center" role="alert" v-if="alerta_v">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="height: 20px; width: 20px;">
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
            <div style="margin: 10px;" v-if="validacion == true" class="alert alert-success d-flex align-items-center"
              role="alert">
              <svg style="height: 20px; width: 20px;" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill" />
              </svg>
              <div>Registro exitoso</div>
            </div>




          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="quitar_val()">
              Cancelar
            </button>
            <button v-if="titulo_modal == 'Crear cliente'" type="button" id="liveToastBtn" @click="crearCliente()"
              class="btn btn-primary">
              Crear cliente
            </button>
            <button v-else type="button" @click="actualizar()" class="btn btn-primary">
              Editar cliente
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Software Transporte</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <div>Edicion exitosa ✅.</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onDeactivated, computed } from "vue";
import { useClientStore } from "../stores/clientes";

let clientes_get = ref([]);
let titulo_modal = ref("Crear cliente");
let nombre_v = ref("");
let cedula_v = ref("");
let telefono_v = ref("");
let cliente_v = ref("");
let buscado_v = ref("");
let validacion = ref(false);
let alerta_v = ref("");
const useclientes = useClientStore();

// se ejecuta en el onMounted
async function traeclientes() {
  let cosa = await useclientes.pedirclientes();
  clientes_get.value = cosa.data;
  clientes_get.value.reverse()
}



// este se esta ejecutando en el boton que se encuentra en el modal  que dice crear nuevo
async function crearCliente() {
  if (validaciones() == true) {
    const nuevo_cliente = {
      nombre: nombre_v.value,
      cedula: cedula_v.value,
      telefono: telefono_v.value,
      estado: true,
    };

    const user_add = await useclientes.addClient(nuevo_cliente);

    await traeclientes();
    setTimeout(() => {
      validacion.value = false

      limpiar()
    }, 2000);
  }
}

// esto se ejecuta cada ves que oprimimos el boton de crear nuevo o el de editar uno ya existente
function camtitulo(titulo, cliente) {
  cliente_v.value = cliente._id;
  titulo_modal.value = titulo;
  if (titulo_modal.value == "Editar cliente") {
    traer(cliente);
  } else {
    limpiar();
  }
}

// este se esta ejecutando cada ves que oprimimos el boton del modal que dice editar
async function actualizar() {
  if (validaciones() == true) {
    const clienteactuali = await useclientes.actualiClient(
      cliente_v.value,
      nombre_v.value,
      cedula_v.value,
      telefono_v.value,
      true
    );

    await traeclientes();
    setTimeout(() => {
      validacion.value = false

      limpiar()
    }, 2000);
  }

}

function limpiar() {
  nombre_v.value = "";
  cedula_v.value = "";
  telefono_v.value = "";
}

function traer(cliente) {
  nombre_v.value = cliente.nombre;
  cedula_v.value = cliente.cedula;
  telefono_v.value = cliente.telefono;
}






let clientes_filtra = computed(() => {
  if (buscado_v.value === "") {
    traeclientes();
  }
  let cedulabuscada = buscado_v.value;
  let resultados = clientes_get.value.filter((cliente) =>
    cliente.cedula.includes(cedulabuscada)
  );
  return resultados;
});






async function estado(estado, cliente) {
  cliente_v.value = cliente._id;
  if (estado == true) {
    const clienteactuali = await useclientes.actuestado(cliente_v.value, false);
    await traeclientes();
  } else {
    const clienteactuali = await useclientes.actuestado(cliente_v.value, true);
    await traeclientes();
  }
}



function validaciones() {
  validacion.value = false;
  if (!nombre_v.value) {
    alerta_v.value = "El nombre es obligatorio";
  } else if (!cedula_v.value) {
    alerta_v.value = "La cedula es obligatoria";
  } else if (cedula_v.value.toString().length < 7) {
    alerta_v.value = "La cedula debe de tener mas de 9 caracteres";
  } else if (!telefono_v.value) {
    alerta_v.value = "El telefono es obligatorio";
  } else {
    alerta_v.value = "";
    return (validacion.value = true);
  }
}


function quitar_val() {
  alerta_v.value = "";
}

// propiedad que se encarga de ejecutar la funcion traeclientes una ves se carga el componente
onMounted(() => {
  traeclientes();
});
</script>



<style scoped>

</style>
