import mongoose from 'mongoose';


const clienteSchema = new mongoose.Schema({
    nombre : {type : String, required: true},
    cedula : {type : String, required: true, unique : true, minlength:9},
    telefono : {type : String, required: true, unique : true, minlength:9},
    estado : {type : Boolean ,default: true  },
    fecha_creacion : { type: Date, default: Date.now }
},
{collection : 'Clientes'});


const Cliente = mongoose.model('cliente', clienteSchema)

export default Cliente;


