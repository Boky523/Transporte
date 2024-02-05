<template>
  <div class="contenedor">

    <div class="superior">
      <div class="titulo"><span class="subtitulo">Gestion de Buses</span></div>
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
        <a style="--clr: #7808d0" class="button" data-bs-toggle="modal" data-bs-target="#bus"
          @click="camtitulo('Crear Bus', true)">
          <span class="button__icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          Registrar Nuevo Bus
        </a>
      </div>
    </div>

    <div class="tabla" style="overflow-y:scroll; max-height: 400px;position: relative;">
      <table>
        <thead style="position: sticky; top: 0px;z-index: 1;">
          <tr>
            
            <th>nombre conductor</th>
            <th>placa vehiculo</th>
            <th>Num puestos</th>
            <th>marca</th>
            <th>modelo</th>
            <th>Estado</th>
            <th>Editar</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(vehiculo, index) in buses_filtra" :key="index">
            
            <td>{{ vehiculo.id_chofer.nombre }}</td>
            <td>{{ vehiculo.placa_vehiculo }}</td>
            <td>{{ vehiculo.cantidad_puestos }}</td>
            <td>{{ vehiculo.marca }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>


                
              <img id="estaimg" src="../assets/cancelar.png" alt="" v-if="vehiculo.estado == false"  type="button"
                  class="estado true"  @click="estado(false , vehiculo)"/>


              <img id="estaimg" src="../assets/aceptar.png" alt="" v-else type="button" class="estado false"
                @click="estado(true, vehiculo)"/>

                
              </td>

            <td>
              <img data-bs-toggle="modal" data-bs-target="#modal" @click="camtitulo('Editar Conductor', conductor)"
                class="editar" src="../assets/editar.png" alt="">
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="bus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ titulo_modal }}
            </h1>
            <button @click="quitar_val()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
  
  <div class="form-group">
    <label for="nombre_conductor">Conductor</label>
    <select v-model="id_conductor_v"  @click="pedirConductor_aqui()">
        <option v-for="conductor in conductores_get" :key="conductor._id" :value="conductor._id">{{ conductor.nombre}}</option>
    </select>
  </div>
  

  
  <div class="form-group">
    <label for="placa_vehiculo">Placa del Vehículo</label>
    <input autocomplete="off" type="text" v-model="placa_vehiculo_v"  id="placa_vehiculo" class="form-control">
  </div>
  
  <div class="form-group">
    <label for="cantidad_puestos">Cantidad de Puestos</label>
    <input autocomplete="off" type="number" v-model="cantidad_puestos_v"  id="cantidad_puestos" class="form-control">
  </div>
  
  <div class="form-group">
    <label for="marca">Marca del Vehículo</label>
    <input autocomplete="off" type="text" v-model="marca_v"  id="marca" class="form-control">
  </div>
  
  <div class="form-group">
    <label for="modelo">Modelo del Vehículo</label>
    <input autocomplete="off" type="text" v-model="modelo_v"   id="modelo" class="form-control">
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
            <button  @click="quitar_val()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button v-if="titulo_modal == 'Crear Bus'" type="button" @click="CrearBus()" class="btn btn-primary">
              Crear Bus
            </button>
            <button v-else type="button" @click="actualizar()" class="btn btn-primary">
              Editar Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
  
  
<script setup>
import { ref, onMounted, computed } from "vue";
import { useBUStore } from "../stores/buses.js";
import {useConductore} from "../stores/conductores.js"
const useconductores = useConductore()
let id_conductor_v = ref("")
let usebuses = useBUStore();
let buses_get = ref([]);
let titulo_modal = ref("Crear Bus");
let placa_vehiculo_v = ref("");
let cantidad_puestos_v = ref("");
let marca_v = ref("");
let modelo_v = ref("");
let bus_v = ref("");
let buscado_v = ref("")
let conductores_get = ref("")
let alerta_v = ref("")
let validacion = ref(false)
let key_vali = ref({
  placa_vehiculo : false,
  cantidad_puestos : false,
  marca : false,
  modelo : false,
})
// se ejecuta en el onMounted 
async function traerbuses() {
  let bus = await usebuses.pedirBuses();
  buses_get.value = bus.data;
  buses_get.value.reverse()
}

async function pedirConductor_aqui() {

let cosa = await useconductores.pedirconductor()
conductores_get.value = cosa.data
conductores_get.value =  conductores_get.value.filter(conductor => conductor.estado === true);
console.log(conductores_get.value);
}








// este se ejecuta cada ves que oprmimos el boton de crear bus  que se encuentra en el modal
async function CrearBus (){
if(validaciones()==true){
const nuevo_bus = {

placa_vehiculo:placa_vehiculo_v.value.toUpperCase(),
cantidad_puestos:cantidad_puestos_v.value,
marca:marca_v.value,
modelo:modelo_v.value,
estado: true,
id_chofer: id_conductor_v.value

}

console.log(nuevo_bus);
await usebuses.addBuses(nuevo_bus)
await traerbuses()

setTimeout(() => {
      validacion.value = false

      limpiar()
    }, 2000);


  }

}





// esto se ejecuta cada ves que oprimimos el boton de crear nuevo o el de editar uno ya existente
function camtitulo(titulo, bus) {
  console.log(bus);
  bus_v.value = bus._id;
  titulo_modal.value = titulo;
  console.log(bus_v.value);

  if(titulo_modal.value == "Editar Bus"){
    traer(bus)
  }else{
    limpiar()
  }
}


// este se esta ejecutando cada ves que oprimimos el boton del modal que dice editar
async function actualizar (){
if (validaciones()==true) {
const busactualizado = await usebuses.actualizarbus
(
bus_v.value, 
id_conductor_v.value,
placa_vehiculo_v.value,
cantidad_puestos_v.value,
marca_v.value,
modelo_v.value,
true
)
console.log("aqui esta el bus que se va a enviar");
console.log(busactualizado);
await traerbuses()

setTimeout(() => {
      validacion.value = false

      limpiar()
    }, 2000);

}

}


function quitar_val(){
  alerta_v.value = "";
}


function limpiar(){

 placa_vehiculo_v.value = ""
 cantidad_puestos_v.value = ""
 marca_v.value = ""
 modelo_v.value = ""

}



function traer(bus){
placa_vehiculo_v.value = bus.placa_vehiculo
 cantidad_puestos_v.value = bus.cantidad_puestos
 marca_v.value = bus.marca
 modelo_v.value = bus.modelo
}



async function estado(estado , bus){
  bus_v.value = bus._id;
  if(estado == true){
    const busactuuali = await usebuses.actuestado(
      bus_v.value,
    false
  );
  await traerbuses();

  }else{
    const busactuuali = await usebuses.actuestado(
      bus_v.value,
    true
  );
  await traerbuses();
  }
}




let buses_filtra = computed(() => {

if (bus_v.value === "") {
  traerbuses()
}

let placabuscada = buscado_v.value;
let resultados = buses_get.value.filter(bus =>
  bus.placa_vehiculo.includes(placabuscada)
);

return resultados;
});


function validaciones (){
  validacion.value = false
  if (!id_conductor_v.value) {
    alerta_v.value = "Por favor selecione un conductor"
  }else if (!placa_vehiculo_v.value){
    alerta_v.value = "Ingrese la placa del vehiculo"
  }else if(!cantidad_puestos_v.value){
    alerta_v.value = "Ingrese la candidad de puestos"
  }else if (!marca_v.value){
    alerta_v.value = "Ingrese la marca del vehiculo"
  }else if(!modelo_v.value){
    alerta_v.value = "Ingrese el modelo del vehiculo"
  }else{
    alerta_v.value = "";
    return (validacion.value = true);
  }
}


onMounted(() => {
  traerbuses();
  pedirConductor_aqui()
});
</script>
  
  
  
  
  
  
<style scoped>

</style>
  