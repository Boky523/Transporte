import {defineStore} from "pinia"
import axios from "axios"
import {local} from '../variable.js'
import {web} from '../variable.js'
export const useRutaStore = defineStore("rutas", ()=>{
const pedirRutas = async()=>{

    try{
        return await axios.get(`${web}/rutas`)

    } catch (error){
        console.log("nos fuimos a");
        console.log(error);
    }

}

 const addRutas = async(info) =>{
    try {
        return await axios.post(`${web}/rutas`,info)
    } catch (error) {
        console.log(error);
        return error
    } 
 }




 const actualiRuta = async(
    id,
    origen, 
    destino,
    hora,
    observaciones,
    estado
    ) =>{

    try {
        const res = await axios.put(`${web}/rutas/${id}`,
        {

            origen: origen,
            destino: destino,
            hora_salida: hora,
            observaciones: observaciones,
            estado: estado
    
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
        const res = await axios.put(`${web}/rutas/estado/${id}`,
        {
            estado:estado
        }

        )
    } catch (error){
        console.log(error);
    }


 }

    return{
        addRutas,
        pedirRutas,
        actualiRuta,
        actuestado
    }
})