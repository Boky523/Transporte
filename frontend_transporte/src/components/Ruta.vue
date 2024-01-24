<template>
  <div class="contenedor">
    <span class="subtitulo">Gestion de Rutas</span>
    <button class="clienew" data-bs-toggle="modal" data-bs-target="#rutas" @click="camtitulo('Crear Ruta', true)">Crear
      nueva Ruta</button>
    <div class="busqueda">
      <input type="text" placeholder="buscar Ruta"><img class="lupa" src="../assets/lupa.png" alt="">
    </div>

    <div class="tabla" style="overflow-y:scroll; max-height: 400px;position: relative;">
      <table>
        <thead style="position: sticky; top: 0px;z-index: 1;">
          <tr>
            <th>origen</th>
            <th>destino</th>
            <th>Hora salida</th>
            <th>observaciones</th>
            <th>estado</th>
            <th>opciones</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ruta, index) in rutas_get" :key="index">
            <td>{{ ruta.origen }}</td>
            <td>{{ ruta.destino }}</td>
            <td>{{ ruta.hora_salida }}</td>
            <td>{{ ruta.observaciones }}</td>
            <td>
              <span v-if="ruta.estado == 1" style="color: #25e40b;font-size: 1.1rem;">activo</span>
              <span v-else style="color: #e4240b;font-size: 1.1rem;">Inactivo</span>
            </td>
            <td><button type="button" @click="camtitulo('Editar Ruta', ruta)" class="btn btn-dark" data-bs-toggle="modal"
                data-bs-target="#rutas">
                Editar
              </button></td>
              <td>
                <img id="estaimg" src="../assets/cancelar.png" alt="" v-if="ruta.estado == true" type="button"
                  class="estado true" @click="estado(true, ruta)" />
                <img id="estaimg" src="../assets/aceptar.png" alt="" v-else type="button" class="estado false"
                  @click="estado(false, ruta)" />
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
            <button @click="quitar_val()"  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="quitar_val()">Cancelar</button>
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
 if(validaciones()==true){
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

function quitar_val(){
  alerta_v.value = "";
}



function camtitulo(titulo, ruta) {
  ruta_v.value = ruta._id
  titulo_modal.value = titulo

  if(titulo_modal.value == "Editar Ruta" ){
    traer(ruta)
  }else{
    limpiar()
  }

}


function limpiar(){
 origen_v.value = ""
 destino_v.value = ""
 observaciones_v.value = ""

}



function traer(ruta){
 origen_v.value = ruta.origen
 destino_v.value = ruta.destino
 valor_v.value = ruta.valor_puesto
 observaciones_v.value = ruta.observaciones
}



function validaciones(){
  if(!origen_v.value){
    alerta_v.value = "Por favor ingrese el origen"
  }else if(!destino_v.value){
    alerta_v.value = "por favor ingrese el destino"
  }else if(!hora_v.value){
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
  
  
  
  
  
  
<style scoped>
.subtitulo {
  font-size: 2.1rem;
  font-weight: 600;
  font-family: 'Times New Roman', Times, serif;
  position: relative;
  left: 40%;
  top: 30px;
}

/* Estilos para la tabla */
table {
  width: 95%;
  position: relative;
  border-collapse: collapse;
  margin-bottom: 20px;
  left: 2.5%;
}

/* Estilos para los encabezados de la tabla */
th {
  background-color: #252966;
  border: 2px solid #ffffff;
  text-align: center;
  padding: 8px;
  color: #dddddd;
}

/* Estilos para las celdas de la tabla */
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

/* Estilos para las filas pares de la tabla */
tbody tr:nth-child(even) {
  background-color: rgb(238, 238, 255);
}

/* Estilos para el resaltado al pasar el mouse por una fila */
tbody tr:hover {
  background-color: #1a4c973f;
}

.clienew {
  position: relative;
  width: 150px;
  height: 50px;
  left: 65%;
  top: 20px;
  background-color: #000000;
  color: white;
  transition: all 0.4s;
  border: solid 3px rgb(204, 204, 255);
  font-size: 15px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 700;
}

.clienew:hover {
  scale: 1.02;
  background-color: #000000;
  border-radius: 5px;
}

.clienew:active {
  background-color: #000000;
  scale: 0.9;
  border-radius: 25px;

}

.edi {
  width: 30px;
}

.btedi {
  top: -7px;
}

.lupa {
  width: 40px;
  height: 40px;
  position: relative;
  top: 5px;
}

.busqueda {
  display: flex;
  top: -10px;
  position: relative;
  margin: 20px;
}

.busqueda input {
  width: 250px;
  height: 40px;
  outline: none;
  border: 3px solid rgb(224, 224, 255);
  font-size: 16px;
  margin: 5px;
}

.busqueda input::placeholder {
  text-align: center;
  /* Centra el placeholder */
  /* Opcionalmente, puedes ajustar otros estilos, como color o tamaño de fuente */
}


.tabla {
  position: relative;
  right: 10px;
}

.tabla::-webkit-scrollbar {
  width: 5px;
}

.tabla::-webkit-scrollbar-thumb {
  background-color: #252966;
  border-radius: 20px;

}





/* Estilos generales */
.modal-body {
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.modal input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Estilos adicionales para mejorar la visualización */
/* Puedes ajustar estos estilos según tus preferencias */

/* Cambiar el color de fondo del formulario */
.modal-body {
  background-color: #f9f9f9;
}

/* Alinear los campos del formulario al centro */
.form-group {
  width: 80%;
  margin: 0 auto;
}

/* Estilos para los botones de estado */
.estado {
  margin-top: 15px;
}

.estado-buttons {
  display: flex;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
}

.btn-activo {
  background-color: #28a745; /* Color verde para estado activo */
}

.btn-inactivo {
  background-color: #dc3545; /* Color rojo para estado inactivo */
}



.estado {
  width: 30px;
  height: 30px;
  border-radius: 5px;
}




























</style>
  