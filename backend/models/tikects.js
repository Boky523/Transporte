import mongoose from "mongoose";

const tiketSchema = new mongoose.Schema(
  {
    vehiculo: { type: mongoose.Schema.Types.ObjectId, ref:"Vehiculo" },
    cliente: { type: mongoose.Schema.Types.ObjectId , ref:"cliente" },
    ruta: { type: mongoose.Schema.Types.ObjectId, ref:"Ruta" },
    valor_puesto: { type: String, default:"sin valor" },
    fecha_tiket: { type: Date, default: Date.now },
    fecha_salida: {type: String, default:"sin valor"},
    hora_salida : { type: String, default:"alguna hora" },
    estado: { type: Boolean, default:true },
    numero_puesto: {type: Number,  require:true}
  },
  { collection: "Ticketes" }
);

const Tiket = mongoose.model("Tiket", tiketSchema);
export default Tiket;
