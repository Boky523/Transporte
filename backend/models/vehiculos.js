import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema(
  {
    placa_vehiculo: { type: String },
    cantidad_puestos: { type: Number },
    marca: { type: String },
    modelo: { type: String },
    estado: {type : Boolean ,default: true  },
    id_chofer: {type: mongoose.Schema.Types.ObjectId, ref:"Chofer", require:true}
  },
  {
    collection: 'Vehiculos' // Especifica el nombre de la colección en la base de datos
  }
);

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
export default Vehiculo;




// {
//   "placa_empresarial": "WER234",
//   "placa_vehiculo": "QWE23rft",
//   "cantidad_puestos": "20",
//   "marca": "Toyota",
//   "modelo": "ASd30",
//   "estado": true,
//   "id_choofer": "64cad4eb46ee33050729ff6f"
// }