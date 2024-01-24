import Vehiculo from '../models/vehiculos.js';

export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find()
   .populate("id_chofer","nombre")
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los vehiculos.' });
  }
};



export const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id);
    if (vehiculo) {
      res.status(200).json(vehiculo);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el vehículo.' });
  }
};






export const crearVehiculo = async (req, res) => {
  try {
    const nuevoVehiculo = new Vehiculo(req.body);
    const vehiculoCreado = await nuevoVehiculo.save();
    res.status(201).json(vehiculoCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el vehiculo.' });
  }
};








export const actualizarVehiculo = async (req, res) => {
  const id  = req.params.id
  console.log(`bus actualizado ${id}`);

  const actualizado={
    placa_vehiculo:req.body.placa_vehiculo,
    cantidad_puestos:req.body.cantidad_puestos,
    marca:req.body.marca,
    modelo:req.body.modelo,
    estado:req.body.estado,
    id_chofer:req.body.id_chofer
  } 

  try {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, actualizado);

    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehiculo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el vehículo.' });
  }
};


export const actualizarestado = async (req, res) => {
  
  const id = req.params.id
  console.log(`estado bus ${id}`);

  const actualizado={
    estado:req.body.estado
  } 
  
  try {
    const clienteActualizado = await Vehiculo.findByIdAndUpdate(id, actualizado);
    
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











export const eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(id);
    if (vehiculoEliminado) {
      res.status(200).json(vehiculoEliminado);
    } else {
      res.status(404).json({ error: 'Vehiculo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el vehiculo.' });
  }
};

export const actualizarVencimientoSeguro = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_vencimiento_seguro } = req.body;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      id,
      { fecha_vencimiento_seguro },
      { new: true }
    );
    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehiculo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la fecha de vencimiento del seguro.' });
  }
};





export const actualizarNumeroLicenciaTransito = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_licencia_transito } = req.body;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      id,
      { numero_licencia_transito },
      { new: true }
    );
    if (vehiculoActualizado) {
      res.status(200).json(vehiculoActualizado);
    } else {
      res.status(404).json({ error: 'Vehiculo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el número de licencia de tránsito.' });
  }
};
