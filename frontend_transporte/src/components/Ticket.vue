<template>
  <div class="padre" style="margin-top: 10px;">
    <div class="filtros" style="background-color: rgb(201, 231, 231);margin: 10px;border-radius: 20px;padding: 5px;">
      <span style="font-weight: 600;font-size: 18px;">Rutas</span>
      <select v-model="ruta_v" @click="traerutas()" @change="cambio_ruta()" class="select">
        <option v-for="ruta in rutas_get" :key="ruta._id" :value="ruta">
          {{ ruta.origen + " " + "➡️" + " " + ruta.destino }}
        </option>
      </select>
      <span style="font-weight: 700;font-size: 20px;">Hora salida</span>
      <span style="font-size: 15px;border-bottom: 1px solid black;margin: 10px;">{{ hora_v }}</span>

      <span style="font-weight: 700;font-size: 20px;">Bus</span>
      <select v-model="bus_v" class="select">
        <option v-for="bus in bus_get" :key="bus._id" :value="bus">
          {{ bus.placa_vehiculo }}
        </option>
      </select>

      <input type="date" v-model="fecha_v" />
      <div class="botones">
        <button class="boton nuevo" @click="tikusado()">ruta nueva</button>
      </div>
    </div>





    <div class="puestos">
      <div class="puesto" v-for="(p, i) in resultados" :key="i">
        <div :style="puestos.includes(i) ? 'background:#fb4a4a' : 'background:#50ecc2'">
          <img src="../assets/puesto_img.png" alt="" />
          <span>{{ i+1 }}</span>

          <button v-if="!puestos.includes(i)" ype="button" class="btn btn-info" data-bs-toggle="modal"
            data-bs-target="#exampleModal" @click="num_puesto_f(i)">Vender</button>
            
        </div>
      </div>
    </div>











    <div class="conten">
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Realizar venta
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body momo">
              <div class="busqueda">
                <span>Dijite la cedula del cliente</span>
                <input type="text" placeholder="Cedula Cliente" v-model="buscado_v" />
              </div>
              <div class="form-group">
                <select v-model="id_cliente_v" @click="traeclientes()">
                  <option v-for="cliente in cliente_true" :key="cliente._id" :value="cliente._id">
                    {{ cliente.nombre }}
                  </option>
                </select>
                <span>valor ticket</span>
                <input v-model="valor" type="text" placeholder="valor de ticket">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                cancelar
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="enviar_tik()">
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Realizar venta
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="busqueda">
                <span>Dijite la cedula del cliente</span>
                <input type="text" placeholder="Cedula Cliente" v-model="buscado_v" />
              </div>
              <span>Elija el cliente</span>
              <div class="form-group">

                <select v-model="id_cliente_v">
                  <option v-for="cliente in resultados" :key="cliente._id" :value="cliente._id">
                    {{ cliente.nombre }}
                  </option>
                </select>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                cancelar
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="enviar_tik()">
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup>
import { useTikStore } from "../stores/ticket.js";
import { ref, onMounted, computed } from "vue";
import { useRutaStore } from "../stores/rutas.js";
import { useBUStore } from "../stores/buses.js";
import { useClientStore } from "../stores/clientes.js";

const useRutas = useRutaStore();
const usebuses = useBUStore();
const useclientes = useClientStore();


let rutas_get = ref([]);
let bus_get = ref([]);
let bus_v = ref([]);
let num_puesto = ref(0)
let clientes_get = ref([]);
let id_cliente_v = ref("");
let buscado_v = ref("");
let hora_v = ref("00:00");
let ruta_v = ref("");
let numero_puesto = ref("")
let fecha_v = ref("");
let puestos = ref([]);
let tik_vendidos = ref([]);
let resultados = ref([])
let cliente_true = ref([])

const useTike = useTikStore();
let valor = ref("")


async function traerbuses() {
  let bus = await usebuses.pedirBuses();
  bus_get.value = bus.data;
}

async function traerutas() {
  let ruta = await useRutas.pedirRutas();
  rutas_get.value = ruta.data;
  rutas_get.value = rutas_get.value.filter(ruta => ruta.estado === true);
  console.log("rutas");
}

async function traeclientes() {
  let cosa = await useclientes.pedirclientes();
  clientes_get.value = cosa.data;
  cliente_true.value = clientes_get.value.filter(cliente => cliente.estado === true);
}




function cambio_ruta() {
  traerutas()
  console.log(ruta_v.value.valor_puesto);
  hora_v.value = ruta_v.value.hora_salida
}



function cambio_bus() {

  const num = bus_v.value.cantidad_puestos
  resultados.value = []
  for (let i = 0; i < num; i++) {
    resultados.value.push({
      puesto: i + 1,
      estado: 0,
    });
  }
  console.log(resultados.value);
}


function num_puesto_f(num) {
  console.log(num);
  numero_puesto.value = num

}

function a (i){
console.log(i+1);
}

async function enviar_tik() {
  await useTike.addTickets(
    bus_v.value._id,
    id_cliente_v.value,
    ruta_v.value._id,
    numero_puesto.value,
    hora_v.value,
    fecha_v.value,
    valor.value
  );
  tikusado()
  
}



async function tikusado() {
  await useTike

    .pedir_tick(ruta_v.value._id, bus_v.value._id, fecha_v.value, hora_v.value)
    .then((response) => {
      puestos.value = response.data.datospuestos;
      tik_vendidos.value = response.data.datosbuscar;
      console.log("aaaaaaaaaaaaaa");
      console.log(puestos.value, tik_vendidos.value);
    });
  cambio_bus()
}



onMounted(() => {
  traerbuses();
  traerutas();
  traeclientes()
});
</script>




<style scoped>
#padre_mesas {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  position: relative;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.card {
  width: 230px;
  margin: 10px;
}

.listado {
  color: black;
}

.listado_pagos {
  position: absolute;
  top: 200px;
  left: 1100px;
}

header {
  font-size: 2rem;
  font-family: "Times New Roman", Times, serif;
  color: black;
}

td {
  background-color: rgb(209, 224, 226);
  padding: 5px;
}

tr {
  color: green;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1rem;
}

.nombre_res {
  color: rgb(185, 185, 33);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 4rem;
}

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



.modal select {
  position: relative;
  width: 100%;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  left: 10px;
}

.modal span {
  position: relative;
  font-size: 20px;
  left: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.puestos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  overflow-y: scroll;
  max-height: 500px;
  margin-top: 20px;

}


.puesto {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 230px;
  width: 180px;
  border-radius: 5px;
  justify-content: center;
  justify-items: center;
}

.puesto button {
  position: relative;
  top: -20px;
}

.puesto img {
  max-width: 100%;
  height: 10rem;
}

.puestos::-webkit-scrollbar {
  width: 5px;
}

.puestos::-webkit-scrollbar-thumb {
  background-color: #252966;
  border-radius: 20px;
}

.btn-primary {
  margin-top: 10px;
}

.padre {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 20px;
  /* Espacio entre las columnas */
}

.filtros {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.filtros select,
input {
  width: 80%;
  height: 40px;
  margin: 10px;
}

.boton {
  width: 150px;
  height: 40px;
  border-radius: 5px;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}

.usado {
  background-color: rgb(97, 190, 162);
}

.botones {
  display: flex;
}

.nuevo {
  background-color: rgb(56, 144, 238);
}

.ddd {
  background: rgb(74, 216, 166);
}

.select {
  text-align: center;
}

.puesto {
  margin: 20px 20px;
  text-align: center
}

.puestos {
  width: 96%;
}

.ca {
  color: #fb4a4a;
}
</style>