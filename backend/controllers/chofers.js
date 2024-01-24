import Chofers from '../models/chofers.js';

// Obtener todos los conductores
export const obtenerConductores = async (req, res) => {
  try {
    const conductores = await Chofers.find();
    res.status(200).json(conductores);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los conductores.' });
  }
};





// Obtener un conductor por su ID
export const obtenerConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductor = await Chofers.findById(id);
    if (conductor) {
      res.status(200).json(conductor);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el conductor.' });
  }
};





// Crear un nuevo conductor
export const crearConductor = async (req, res) => {
  try {
    const nuevoConductor = new Chofers(req.body);
    const conductorCreado = await nuevoConductor.save();
    res.status(201).json(conductorCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el conductor.' });
  }
};







// Actualizar un conductor existente
export const actualizarConductor = async (req, res) => {
  const id = req.params.id
  console.log("conductor editado");
  const actualizado={
    nombre:req.body.nombre,
    cedula:req.body.cedula,
    date_nacimiento:req.body.date_nacimiento,
    telefono:req.body.telefono,
    direccion:req.body.direccion,
    clase_pase:req.body.clase_pase,
    vigencia_pase:req.body.vigencia_pase,
    date_fin_contra:req.body.date_fin_contra,
    categoria_pase:req.body.categoria_pase,
    estado:req.body.estado
  }

  try {
    
    const conductorActualizado = await Chofers.findByIdAndUpdate(id,actualizado);

    if (conductorActualizado) {
      console.log(conductorActualizado);
      res.status(200).json(conductorActualizado);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el conductor.' });
  }
};




// Eliminar un conductor
export const eliminarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductorEliminado = await Chofers.findByIdAndDelete(id);
    if (conductorEliminado) {
      res.status(200).json(conductorEliminado);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el conductor.' });
  }
};



export const actualizarestado = async (req, res) => {
  
  const id = req.params.id
  console.log(`estado conductor ${id}`);

  const actualizado={
    estado:req.body.estado
  } 
  
  try {
    const clienteActualizado = await Chofers.findByIdAndUpdate(id, actualizado);
    
    if (clienteActualizado) {
      console.log(clienteActualizado);
      res.status(200).json(clienteActualizado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el cliente.',error });
  }
};