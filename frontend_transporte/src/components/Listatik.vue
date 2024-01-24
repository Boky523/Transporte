<template >
  <div>
    <div class="tabladiv" style="margin-top: 10px;">
      <h3 style="font-family: 'Times New Roman', Times, serif;left: 32%;position: relative;margin-bottom: 20px;"  >Lista de tickets vendidos</h3>

      <div class="a" v-if="useTike.lodin == true ">
          <div class="spinner-border text-primary" role="status" >
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>

      <div v-else class="tabla" style="overflow-y: scroll; max-height: 400px; position: relative">
        <table>
          <thead style="position: sticky; top: 0px; z-index: 1">
            <tr>
              <th>Nombre</th>
              <th>vehiculo</th>
              <th>ruta</th>
              <th>valor puesto</th>
              <th>hora salida</th>
              <th>Fecha Viaje</th>
              <th>fecha venta</th>
              <th>ver ticket</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tikect, index) in tickets" :key="index">
            
              <td>{{ tikect.cliente.nombre }}</td>
              <td>{{ tikect.vehiculo.placa_vehiculo }}</td>
              <td>{{ `${tikect.ruta.origen} ➡️ ${tikect.ruta.destino}` }}</td>
              <td>{{ tikect.valor_puesto }}</td>
              <td>{{ tikect.hora_salida }}</td>
              <td>{{ tikect.fecha_salida }}</td>
              <td>{{ tikect.fecha_tiket }}</td>
              <td>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#tik" @click="llevartik(tikect.cliente.nombre, tikect.vehiculo.placa_vehiculo, tikect.ruta.origen
                  , tikect.ruta.destino, tikect.valor_puesto,
                  tikect.hora_salida, tikect.fecha_tiket)">Ver ticket</button>
              </td>
            </tr>
          </tbody>
        </table>






        <div class="modal fade" id="tik" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Informacion Ticket
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body tikb">
            <span class="titulmo">Nombre</span>
            <span>{{ nombrep }}</span>
            <span class="titulmo">Vehiculo</span>
            <span>{{ vehiculo }}</span>
            <span class="titulmo">Origen</span>
            <span>{{ origenp }}</span>
            <span class="titulmo">Destino</span>
            <span>{{ destinop }}</span>
            <span class="titulmo">Valor</span>
            <span>{{ valorp }}</span>
            <span class="titulmo">Hora salida</span>
            <span>{{ hsalida }}</span>
            <span class="titulmo">Fecha salida</span>
            <span>{{ fechap }}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Salir
          </button>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useTikStore } from "../stores/ticket.js";
import { ref, onMounted } from "vue";
const useTike = useTikStore();
let tickets = ref([]);
let nombrep = ref('');
let vehiculo = ref('');
let origenp = ref('');
let destinop = ref('');
let valorp = ref('');
let hsalida = ref('');
let fechap = ref('');


async function traetickets() {

  let cosa = await useTike.pedirTickets();
  tickets.value = cosa.data;
  tickets.value.reverse()

}




function llevartik(nombre, placa, origen, destino, valor, horasalida, fecha) {
  nombrep.value = nombre;
  vehiculo.value = placa;
  origenp.value = origen;
  destinop.value = destino;
  valorp.value = valor;
  hsalida.value = horasalida;
  fechap.value = fecha;
}


onMounted(() => {
  traetickets();
});

</script>

<style scoped>
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

.tikb{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.titulmo{
  font-weight: 900;
}


.modal select {
  width: 100%;
  height: 35px;
}
</style>