<template>
  <div class="contenedor" >
    <div class="filtros">
      <span>Rutas</span>
      <select v-model="ruta_v" @click="traerutas()" @change="cambio_ruta()" class="select">
        <option v-for="ruta in rutas_get" :key="ruta._id" :value="ruta">
          {{ ruta.origen + " " + "➡️" + " " + ruta.destino }}
        </option>
      </select>
      <span >Hora salida</span>
      <span >{{ hora_v }}</span>

      <span>Bus</span>
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


    <div id="antes">
      <img src="../assets/antes_rutas.png" alt="">
    </div>
    
    <div class="puestos" >
      <div class="puesto" v-for="(p, i) in resultados" :key="i">
        <div class="pues" :style="puestos.includes(i) ? 'background:#512B81'  : 'background:#4477CE'">
          <img src="../assets/puesto_img.png" alt="" />
          <span class="num_puesto">N.º {{i+1}}</span>

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
  document.getElementById('antes').style.display='none'
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
.contenedor{
  display: flex;
}
.filtros{
  background-color: #35155D;
  margin: 10px;
  border-radius: 20px;
  padding: 5px;
  width: 500px;
  height: 90vh;
  gap: 50px;
}


.filtros span {
  color: #ffffff;
  font-weight: 700;
  font-size: 20px;
}



#antes img{
  width: 600px;
  top: 20%;
  left: 50%;
  position: relative;
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
  height: 85vh;
  margin-top: 20px;

}

.puesto button {
width: 90%;
margin: 5%;
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


.pues{
  border-radius: 15px;
  display:flex;
  flex-direction: column;
  min-height: 250px;
}

.num_puesto{
  font-size: 20px;
  color: white;
}

.btn-primary {
  margin-top: 10px;
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




.botones {
  display: flex;
}

.nuevo {
  width: 150px;
  height: 40px;
  border-radius: 5px;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  background-color:#8CABFF;
  color: #512B81;
  transition: all 0.5s;
  border-color: rgba(255, 255, 255, 0);
}

.nuevo:hover{
  background-color: #7499ff;
  color: #ffff;
}

.nuevo:active{
  transform: scale(0.93);
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

.busqueda{
  display: flex;
  flex-direction: column;
}
</style>