import cliente from '../components/Cliente.vue'
import Buses from '../components/Buses.vue'
import Conductor from '../components/Conductor.vue'
import Ruta from '../components/Ruta.vue'
import Ticket from '../components/Ticket.vue'
import Login from '../components/Login.vue'
import Contenedor from '../components/Contenedor.vue'
import ventas from '../components/Listatik.vue'
import { createRouter , createWebHashHistory } from 'vue-router'


const routes = [
    { path: "/" , component : Login },
    {
        path : "/contenedor", component : Contenedor,

        children: [
        {path: "/buses" , component : Buses },
        {path: "/clientes", component : cliente},
        {path: "/conductor", component : Conductor},
        {path: "/ruta", component : Ruta},
        {path: "/ventas", component : ventas},
        {path: "/ticket", component : Ticket}
        ],
        beforeEnter: (to, from, next) => {
            const toke = sessionStorage.getItem('token');
            if(!toke && to.path !== '/'){
                next('/')
            }else{
                next()
            }
        }
    }
    
]


export const router = createRouter({
    history : createWebHashHistory(),
    routes
})