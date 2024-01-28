import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue";
import {web} from '../variable.js'
let lodin  = ref(false)
export const useTikStore = defineStore("useTikStore", () => {
  
    const pedirTickets = async () => {

        try {
         lodin.value = ref(true)

            return await axios.get(`${web}/tikets`)

        } catch (error) {
            console.log("nos fuimos a");
            console.log(error);
         lodin.value = ref(true)

        }finally{
         lodin.value = ref(false)
        }
    }






    const addTickets = async (
        vehiculo,
        cliente,
        ruta,
        numero_puesto,
        hora_salida,
        fecha_salida,
        valor_puesto
    ) => {
        try {

            const tikect = {
                vehiculo,
                cliente,
                ruta,
                numero_puesto,
                hora_salida,
                fecha_salida,
                valor_puesto
            }

            return await axios.post(`${web}/tikets`, tikect)
        } catch (error) {
            console.log(error);
            return error
        }
    }


    const pedir_tick = async (
        idruta,
        idbus,
        idfecha,
        idhora
        
    ) => {


      try {
              return await axios.get(`${web}/tikets/t`, {
            params: {
                idruta: idruta,
                idbus: idbus,
                idfecha: idfecha,
                idhora: idhora
                
            }
        
        })  
          lodin.value = true
      } catch (error) {
        throw error
        lodin.value = true
      }finally{
        lodin.value = false

      }

    }



    const actualiTickets = async (
        id,
        origen,
        destino,
        hora_salida,
        fecha_salida,
        observaciones,
        estado
    ) => {

        try {
            const res = await axios.put(`${web}/tikets/${id}`,
                {

                    origen: origen,
                    destino: destino,
                    hora_salida: hora_salida,
                    fecha_salida: fecha_salida,
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

    return {

        pedirTickets,
        addTickets,
        actualiTickets,
        pedir_tick,
        lodin
    }
})