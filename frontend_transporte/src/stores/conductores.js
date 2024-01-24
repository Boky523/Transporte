import {defineStore} from "pinia"
import axios from "axios"
import {local} from '../variable.js'
import {web} from '../variable.js'
export const useConductore = defineStore("conductor", ()=>{
const pedirconductor = async()=>{

    try{
        return await axios.get(`${web}/conductor`)

    } catch (error){
        console.log("nos fuimos a");
        console.log(error);
    }
}

 const addConductor = async(info) =>{
    try {
        return await axios.post(`${web}/conductor`,info)
    } catch (error) {
        console.log(error);
        return error
    } 
 }


 const actualiConductor = async(
    id,
    nombre,
    cedula,
    date_nacimiento,
    telefono,
    direccion, 
    clase_pase, 
    vigencia_pase,
    date_fin_contra, 
    categoria_pase, 
    estado) =>{
 
    try {
        console.log("llega al try");
        console.log(id);
        const res = await axios.put(`${web}/conductor/${id}`,
        {
            nombre:nombre,
            cedula:cedula,
            date_nacimiento:date_nacimiento,
            telefono:telefono,
            direccion:direccion,
            clase_pase:clase_pase,
            vigencia_pase:vigencia_pase,
            date_fin_contra:date_fin_contra,
            categoria_pase:categoria_pase,
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
        const res = await axios.put(`${web}/conductor/estado/${id}`,
        {
            estado:estado
        }

        )
    } catch (error){
        console.log(error);
    }
 }

    return{
        addConductor,
        pedirconductor,
        actualiConductor,
        actuestado
    }
})


