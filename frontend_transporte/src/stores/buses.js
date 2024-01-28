import {defineStore} from "pinia"
import axios from "axios"
import {web} from '../variable.js'
export const useBUStore = defineStore("bus", ()=>{
const pedirBuses = async()=>{

    try{
        return await axios.get(`${web}/vehiculos`)

    } catch (error){
        console.log("nos fuimos a");
        console.log(error);
    }


}


const pedirBus = async()=>{

    try{
        return await axios.get(`${web}/vehiculos/${id}`)

    } catch (error){
        console.log("nos fuimos a");
        console.log(error);
    }


}






 const addBuses = async(info) =>{
    try {
        console.log("try bus");
        return await axios.post(`${web}/vehiculos`,info)
    } catch (error) {
        console.log(error);
        return error
    } 
 }


 







 const actualizarbus = async(
    id,
    nombre,
    placa_vehiculo_v,
    cantidad_puestos_v, 
    marca_v, 
    modelo_v,
    estado) =>{
 
    try {
        console.log("llega al store actualizar bus");
        console.log(id);
        const res = await axios.put(`${web}/vehiculos/${id}`,
        {
            placa_vehiculo:placa_vehiculo_v,
            cantidad_puestos:cantidad_puestos_v,
            marca:marca_v,
            modelo:modelo_v,
            estado:estado,
            id_chofer: nombre
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
console.log("entro por donde era");
    try {
        const res = await axios.put(`${web}/vehiculos/estado/${id}`,
        {
            estado:estado
        }

        )
    } catch (error){
        console.log(error);
    }


 }







    return{
        addBuses,
        pedirBuses,
        actualizarbus,
        actuestado,
        pedirBus
    }
})

