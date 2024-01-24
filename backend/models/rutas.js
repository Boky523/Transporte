import mongoose from 'mongoose';

const rutaSchema = new mongoose.Schema(
  {
    origen: { type: String, required : true }, 
    destino: { type: String , required : true },
    valor_puesto: { type: String, required : true },
    observaciones: { type: String,  default : "ninguna observacion"},
    hora_salida: { type: String, required : true  },
    estado : { type : Boolean , default : true},
    createdAt : {type : String , default : Date.now}
  },
  {
    collection: 'Rutas', // Especifica el nombre de la colección en la base de datos
  }
);

const Ruta = mongoose.model('Ruta', rutaSchema);
export default Ruta;



// {
//   "origen": "socorro",
//   "destino": "sadere", 
//   "vehiculo": "ferrree",
//   "hora_salida": "asdasddsa", 
//   "fecha_salida": "aerewt",
//   "observaciones": "Zona lluviosa",
//   "estado" : "true"
// }