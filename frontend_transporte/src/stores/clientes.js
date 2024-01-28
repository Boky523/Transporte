import {defineStore} from "pinia"
import axios from "axios"
import {web} from '../variable.js'
import {ref}  from "vue";


export const useClientStore = defineStore("cliente", ()=>{
let lodin  = ref(true)

const pedirclientes = async()=>{

    try{
        lodin.value = false
        return await axios.get(`${web}/cliente`)

    } catch (error){
        lodin.value = false
        console.log("nos fuimos a");
        console.log(error);
       
    }finally{
        lodin.value = false
    }

}





 const addClient = async(info) =>{
    try {
        return await axios.post(`${web}/cliente`,info)
    } catch (error) {
        console.log(error);
        return error
    } 
 }



 const actualiClient = async(
    id,
    nombre, 
    cedula,
    telefono, 
    estado
    ) =>{

    try {
        const res = await axios.put(`${web}/cliente/${id}`,
        {
            nombre:nombre,
            cedula:cedula,
            telefono:telefono,
            estado:estado
    
        }
        )
        console.log("aaaaaaaayudaaaaaaaaaaaa");
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        
    } 
 }


 const actuestado = async (
    id,
    estado
 ) =>{

    try {
        const res = await axios.put(`${web}/cliente/estado/${id}`,
        {
            estado:estado
        }

        )
    } catch (error){
        console.log(error);
    }


 }



    return{
        addClient,
        pedirclientes,
        actualiClient,
        actuestado,
        lodin
    }
})