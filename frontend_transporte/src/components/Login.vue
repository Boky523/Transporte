<script setup >

import { useClientStore } from "../stores/admin.js";
let useadmin = useClientStore();
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

let nombre = ref("");
let contraseña = ref("");
let alerta_v = ref("");


function paso() {

  useadmin.login(nombre.value, contraseña.value)

    .then((response) => {
      let tok = response.data.token;
      sessionStorage.setItem("token", tok);
      if (response.data.status == 200) {
        console.log("sesion exitosa");
        router.push("/clientes");
      } else if (response.data.status == 404) {

        alerta_v.value = "Error al iniciar sesion"
        setTimeout(() => {
          alerta_v.value = ""
        }, 3000);
      }
    })
  // .catch((error) => {

  //   if (
  //     error.response.data.errors[0] &&
  //     error.response.data.errors[0].msg !== undefined
  //   ) {
  //     alert(error.response.data.errors[0].msg);
  //     console.log(error);

  //   } else {
  //     ("");
  //   }

  //   if (
  //     error.response.data.errors[1] &&
  //     error.response.data.errors[1].msg !== undefined
  //   ) {
  //     alert(error.response.data.errors[1].msg);
  //   } else {
  //     ("");
  //   }
  // });
}

</script>

<template>
  <div class="contenedor">
    <div class="login">

      <div class="img">
        <img src="../assets/login.jpg" alt="">
      </div>


      <div class="formulario">

        <div class="introducion">
        <div class="logo">
          <img src="../assets/Logotipo.png" alt="">
        </div>
        <div class="texintro">
          <h4>RelaxTravel</h4>
          <span class="lema">Viaja tranquilo, viaja soñando</span>
        </div>
        </div>


        

        <div class="inputContainer">
          <input required="" v-model="nombre" class="customInput" type="text">
          <label class="inputLabel">Nombre de usuario</label>
          <div class="inputUnderline"></div>
        </div>


        <div class="inputContainer">
          <input v-model="contraseña" required="" class="customInput" type="password">
          <label class="inputLabel">Contraseña</label>
          <div class="inputUnderline"></div>
        </div>



        <div class="alerta">
        <div role="status" v-if="useadmin.lodin == true">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span>{{ alerta_v }}</span>
      </div>




        <button class="ingreso" @click="paso()" v-if="useadmin.lodin == false">

          <p>Ingresar</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>


      </div>







    </div>
  </div>
</template>



<style scoped>
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d6d4d4;
  background-image: url("../assets/fondo_login_azul.png");
  background-repeat: no-repeat;
  background-size:cover;
}

.login {
  backdrop-filter: blur(3px);
  display: flex;
  background-color: #35155db9;
  overflow: hidden;
}

h4{
  color: #EEEEEE;
}

.lema{
  color: #EEEEEE;
}

.img {
  max-width: 25dvw;
  max-height: 100vh;
  overflow: hidden;
}


.formulario {
  
  padding: 50px 50px 0px 50px;
  display: flex;
  flex-direction: column;

}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.introducion{
  margin-bottom: 30px;
  margin-bottom: 100px;
}

.texintro{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


.alerta{
  color: #EEEEEE;
  min-height: 100px;
}
/* input input input input  */

.inputContainer {
  position: relative;
  margin-bottom: 80px;
}

.customInput {
  width: 80%;
  padding: 5px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #393E46;
  outline: none;
  transition: border-color 0.3s ease;
  color: #ffffff;
}

.customInput:focus,
.customInput:not(:placeholder-shown) {
  border-color: #EEEEEE;
}

.inputLabel {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  padding: 5px;
  font-size: 16px;
  color: #ffffff;
  transition: transform 0.3s ease, color 0.3s ease;
}

.customInput:focus+.inputLabel,
.customInput:not(:placeholder-shown)+.inputLabel {
  transform: translateY(-100%) translateX(-5px) scale(0.8);
}

.inputUnderline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90%;
  height: 2px;
  background-color: #ffffff;
}

.logo img{
  width: 200px;
}

/* boton boton boton boton  */

.ingreso{
  align-self: end;
  justify-self:end ;
}

button {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
}

button {
  --primary-color: #d270ff;
  --hovered-color: #ffffff;
  position: relative;
  display: flex;
  font-weight: 600;
  font-size: 20px;
  gap: 0.5rem;
  align-items: center;
}

button p {
  margin: 0;
  position: relative;
  font-size: 20px;
  color: var(--primary-color);
}

button::after {
  position: absolute;
  content: "";
  width: 0;
  left: 0;
  bottom: -7px;
  background: var(--hovered-color);
  height: 2px;
  transition: 0.3s ease-out;
}

button p::before {
  position: absolute;
  /*   box-sizing: border-box; */
  content: "Ingresar";
  width: 0%;
  inset: 0;
  color: var(--hovered-color);
  overflow: hidden;
  transition: 0.3s ease-out;
}

button:hover::after {
  width: 100%;
}

button:hover p::before {
  width: 100%;
}

button:hover svg {
  transform: translateX(4px);
  color: var(--hovered-color);
}

button svg {
  color: var(--primary-color);
  transition: 0.2s;
  position: relative;
  width: 15px;
  transition-delay: 0.2s;
}
</style>