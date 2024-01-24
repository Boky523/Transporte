import mongoose from 'mongoose';

const choferSchema = new mongoose.Schema(
  { 
    nombre: { type: String , required : true},
    cedula: { type: String, require: true },
    date_nacimiento : {type: String, require: true },
    telefono: { type: String, require: true  },
    direccion: { type: String, require: true  },
    clase_pase: { type: String, require: true  },
    vigencia_pase: { type: String, require: true  },
    date_fin_contra : {type: String, require: true},
    categoria_pase : {type: String , require : true},
    estado : {type: Boolean, default: true },
    createdat : {type: Date, default : Date.now}
  },
  {
    collection: 'Chofers' // Especifica el nombre de la colección en la base de datos
  }
);

const Chofer = mongoose.model('Chofer', choferSchema);
export default Chofer;

