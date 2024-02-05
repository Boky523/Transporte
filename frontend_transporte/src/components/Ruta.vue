<template>
  <div class="contenedor">

    <div class="superior">
      <div class="titulo"><span class="subtitulo">Gestion de Rutas</span></div>
    </div>
    <div class="acciones">

      <div class="busqueda">

        <div class="container">
          <input id="input" type="text" placeholder="buscar Bus" v-model="buscado_v" />
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
        <a style="--clr: #7808d0" class="button" data-bs-toggle="modal" data-bs-target="#rutas"
          @click="camtitulo('Crear Ruta', true)">
          <span class="button__icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          Registrar Nueva Ruta
        </a>
      </div>
    </div>

    <div class="tabla" style="overflow-y:scroll; max-height: 400px;position: relative;">
      <table>
        <thead style="position: sticky; top: 0px;z-index: 1;">
          <tr>
            <th>origen</th>
            <th>destino</th>
            <th>Hora salida</th>
            <th>observaciones</th>
            <th>Estado</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ruta, index) in rutas_get" :key="index">
            <td>{{ ruta.origen }}</td>
            <td>{{ ruta.destino }}</td>
            <td>{{ ruta.hora_salida }}</td>
            <td>{{ ruta.observaciones }}</td>

            <td>
              <img id="estaimg" src="../assets/cancelar.png" alt="" v-if="ruta.estado == false" type="button"
                class="estado true" @click="estado(false, ruta)" />
              <img id="estaimg" src="../assets/aceptar.png" alt="" v-else type="button" class="estado false"
                @click="estado(true, ruta)" />
            </td>
            <td>
              <img data-bs-toggle="modal" data-bs-target="#rutas" @click="camtitulo('Editar Ruta', ruta)" class="editar"
                src="../assets/editar.png" alt="">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->



    <!-- Modal -->
    <div class="modal fade" id="rutas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ titulo_modal }}</h1>
            <button @click="quitar_val()" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="origen">Origen</label>
              <input autocomplete="off" type="text" v-model="origen_v" id="origen" class="form-control">
            </div>

            <div class="form-group">
              <label for="destino">Destino</label>
              <input autocomplete="off" type="text" v-model="destino_v" id="destino" class="form-control">
            </div>

            <div class="form-group">
              <label for="destino">Hora salida</label>
              <input autocomplete="off" type="time" v-model="hora_v" id="destino" class="form-control">
            </div>


            <div class="form-group">
              <label for="destino">Valor puesto</label>
              <input autocomplete="off" type="text" v-model="valor_v" id="destino" class="form-control">
            </div>


            <div class="form-group">
              <label for="observaciones">Observaciones</label>
              <input autocomplete="off" type="text" v-model="observaciones_v" id="observaciones" class="form-control">
            </div>
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









          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              @click="quitar_val()">Cancelar</button>
            <button v-if="titulo_modal == 'Crear Ruta'" type="button" @click="crearRuta()" class="btn btn-primary">Crear
              ruta</button>
            <button v-else type="button" @click="actualizar()" class="btn btn-primary">Editar Ruta</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
  
  
  
  
<script setup>

import { ref, onMounted } from 'vue'
import { useRutaStore } from "../stores/rutas.js"
let titulo_modal = ref("")
let rutas_get = ref([])
let origen_v = ref("")
let valor_v = ref("")
let destino_v = ref("")
let observaciones_v = ref("")
let hora_v = ref("")
let ruta_v = ref("")
const useRutas = useRutaStore()
let validacion = ref(false)
let alerta_v = ref("");
async function traerutas() {

  let cosa = await useRutas.pedirRutas()
  console.log(cosa.data);
  rutas_get.value = cosa.data
}

async function crearRuta() {
  if (validaciones() == true) {
    const nueva_ruta = {
      origen: origen_v.value,
      destino: destino_v.value,
      valor_puesto: valor_v.value,
      observaciones: observaciones_v.value,
      hora_salida: hora_v.value,
      estado: true
    }
    console.log(nueva_ruta);
    await useRutas.addRutas(nueva_ruta)
    await traerutas()

    setTimeout(() => {
      validacion.value = false

      limpiar()
    }, 2000);

  }
}


async function actualizar() {

  const rutactializa = await useRutas.actualiRuta
    (
      ruta_v.value,
      origen_v.value,
      destino_v.value,
      hora_v.value,
      observaciones_v.value,
      true
    )

  console.log("aqui esta el cliente");
  console.log(rutactializa);
  await traerutas()

}

function quitar_val() {
  alerta_v.value = "";
}



function camtitulo(titulo, ruta) {
  ruta_v.value = ruta._id
  titulo_modal.value = titulo

  if (titulo_modal.value == "Editar Ruta") {
    traer(ruta)
  } else {
    limpiar()
  }

}


function limpiar() {
  origen_v.value = ""
  destino_v.value = ""
  observaciones_v.value = ""

}



function traer(ruta) {
  origen_v.value = ruta.origen
  destino_v.value = ruta.destino
  valor_v.value = ruta.valor_puesto
  observaciones_v.value = ruta.observaciones
}



function validaciones() {
  if (!origen_v.value) {
    alerta_v.value = "Por favor ingrese el origen"
  } else if (!destino_v.value) {
    alerta_v.value = "por favor ingrese el destino"
  } else if (!hora_v.value) {
    alerta_v.value = "por favor ingrese la hora de salida"
  } else {
    alerta_v.value = "";
    return (validacion.value = true);
  }
}

async function estado(estado, ruta) {
  ruta_v.value = ruta._id;
  if (estado == true) {
    const rutaactuali = await useRutas.actuestado(ruta_v.value, false);
    await traerutas();
  } else {
    const rutaactuali = await useRutas.actuestado(ruta_v.value, true);
    await traerutas();
  }
}

onMounted(() => {
  traerutas()
})










</script>
  
  
  
  
  
  
<style scoped></style>
  