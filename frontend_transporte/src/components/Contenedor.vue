<template>
  <div class="contenedor">

    <div class="header-banner">



      <div class="cerrar">
        <router-link class="dropdown-item" to="/" @click="cerrarsesion()">
            <span class="spancerra">Cerrar sesión</span> <img src="../assets/cerrar-sesion.png" alt="">
          </router-link>
      </div>



      <div class="tabs">

        <router-link class="link" to="/clientes">
          <div class="tab" id="cliente"><samp class="clientes Administrar" label="Administrar clientes">Clientes</samp>
          </div>
        </router-link>
        <router-link class="link" to="/conductor">
          <div class="tab"><samp class="conductores Administrar" label="Administrar conductores">Administrar
              conductore</samp></div>
        </router-link>
        <router-link class="link" to="/buses">
          <div class="tab"><samp class="buses Administrar" label="Administrar buses">Administrar buses</samp></div>
        </router-link>
        <router-link class="link" to="/ruta">
          <div class="tab"><samp class="rutas Administrar" to="/ruta" label="Administrar rutas">Administrar rutas</samp>
          </div>
        </router-link>
        <router-link class="link" to="/ticket">
          <div class="tab" id="ticket"><samp class="ticket Administrar" label="vender ticket">vender ticket</samp></div>
        </router-link>
        <router-link class="link" to="/ventas" @click="listartik()">
          <div class="tab" id="ticket"><samp class="ticket Administrar" label="vender ticket">Lista de ventas</samp></div>
        </router-link>
      </div>

    </div>


    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>


  </div>
</template>
 


<script   setup>

import { ref } from 'vue'
import {useTikStore} from '../stores/ticket.js'

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const usetik = useTikStore()

function cerrarsesion() {
  sessionStorage.removeItem("token");
}

async function listartik(){
  await usetik.pedirTickets()
}

</script>
  
<style scoped>
.Administrar {
  color: rgb(255, 255, 255);
  font-size: 0.8rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 700;
}

.tabs {
  top: 75px;
  position: relative;
  display: flex;
}


.tab {
  background-color: rgb(38, 51, 73);
  border-radius: 5px 5px 0px 0px;
  border: solid 1px white;
  margin: 5px;
  bottom: -5px;
  width: 200px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s;
}

.tab:hover {
  transform: translateY(-10px);
  border-radius: 10px 10px 0px 0px;
  background-color: rgb(26, 32, 43);
  border: solid 2px rgb(99, 129, 192);
  height: 55px;
}

#ticket {
  background-color: rgb(85, 177, 149);
}


.header-banner {
  background-size: 90%;
  background-position: center;
  height: 200px;
  background-color: rgb(6, 6, 101);
}

.link {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

#cliente {
  background-color: rgb(54, 129, 179);
}

img {
  width: 45px;
  margin: 15px;
}



.spancerra{
  color: aliceblue;
}
.spancerra:hover{
color: #fa1a1a;
}

.cerrar{
  position: relative;
  left: 85%;
}


</style>