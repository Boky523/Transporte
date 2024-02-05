<template>
  <div class="contenedor">

    <div class="header-banner">
      <div>
        <router-link class="dropdown-item" to="/" @click="cerrarsesion()">
          <span class="spancerra">Cerrar sesión</span> <img class="img-cerrar" src="../assets/cerrar-sesion.png" alt="">
        </router-link>
      </div>
    </div>

   
      <div class="tabs">
        <router-link class="link" to="/clientes">
          <div class="tab" id="cliente"><img src="../assets/clientes.png" alt=""> <samp class="clientes Administrar" label="Administrar clientes">Clientes <span class="flecha">></span></samp>
          </div>
        </router-link>
        <router-link class="link" to="/conductor">
          <div class="tab"><img src="../assets/conductor.png" alt=""><samp class="conductores Administrar" label="Administrar conductores">conductores <span class="flecha">></span></samp></div>
        </router-link>
        <router-link class="link" to="/buses">
          <div class="tab"><img src="../assets/bus.png" alt=""><samp class="buses Administrar" label="Administrar buses">Buses <span class="flecha">></span></samp></div>
        </router-link>
        <router-link class="link" to="/ruta">
          <div class="tab"><img src="../assets/rutas.png" alt=""><samp class="rutas Administrar" to="/ruta" label="Administrar rutas">Rutas<span class="flecha">></span></samp>
          </div>
        </router-link>
        <router-link class="link" to="/ticket">
          <div class="tab" id="ticket"><img src="../assets/ticket.png" alt=""><samp class="ticket Administrar" label="vender ticket">Tickets <span class="flecha">></span></samp></div>
        </router-link>
        <router-link class="link" to="/ventas" @click="listartik()">
          <div class="tab" id="ticket"><img src="../assets/ventas.png" alt=""><samp class="ticket Administrar" label="vender ticket">Lista de ventas <span class="flecha">></span></samp></div>
        </router-link>
      </div>
    


    <router-view  class="view" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>


  </div>
</template>
 


<script   setup>

import { ref } from 'vue'
import { useTikStore } from '../stores/ticket.js'

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const usetik = useTikStore()

function cerrarsesion() {
  sessionStorage.removeItem("token");
}

async function listartik() {
  await usetik.pedirTickets()
}

</script>
  
<style scoped>
.header-banner {
  height: 60px;
  background-color: #35155D;
  display: flex;
  justify-content:end;
  align-items: center;
}


img {
  width: 45px;
  margin: 15px;
}



.spancerra {
  color: aliceblue;
  font-size: 15px;
  font-weight: 600;
}

.spancerra:hover {
  color: #fa1a1a;
}

.spancerra:hover ~ .img-cerrar{
  filter: drop-shadow(0 0 10px red);
}


.tabs {
  overflow: hidden;
  width: 70px;
  background-color: #522b81f6;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100vh;
  padding-top: 50px;
  transition: all 1s;
  z-index: 1000;
}


.tabs:hover{
  width: 250px;
  background-color: #421d70;
}
.tab img{
  width: 30px;
  filter: invert(1);
}

.tab{
  margin-top: 10px;
  padding: 10px;
  color: rgb(0, 0, 0);
  width: 100%;
  display: inline;
  white-space: nowrap; 
}

.tab:hover{
  background-color: #522b81;
  transition: all 0.5s;
}

.tab:hover .flecha {
  margin-left: 20px;
  transition: all 1s;
}

.Administrar {
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 700;
}



.link {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}





.view{
  position: relative;
  left: 5%;
  max-width: 95%;
}
</style>