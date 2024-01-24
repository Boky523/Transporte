import usuario from '../models/clientes.js';

export const obtenerClientes = async (req, res) => {
  try {
    const Cliente = await usuario.find();
    if (Cliente) {
      res.status(200).json(Cliente);
      
    } else {
      res.status(404).json({ error: 'Clientes no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener los Clientes.' });
  }
};



export const obtenerCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await usuario.findById(id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el cliente.' });
  }
};






export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new usuario(req.body);
    const clienteCreado = await nuevoCliente.save();
    res.status(201).json(clienteCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el cliente' });
  }
};









export const actualizarCliente = async (req, res) => {
  
  const id = req.params.id
  console.log(`cliente actualizado ${id}`);

  const actualizado={
    nombre:req.body.nombre,
    cedula:req.body.cedula,
    telefono:req.body.telefono,
    estado:req.body.estado
  } 
  
  try {
    const clienteActualizado = await usuario.findByIdAndUpdate(id, actualizado);
    
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





export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await usuario.findByIdAndDelete(id);
    if (clienteEliminado) {
      res.status(200).json(clienteEliminado);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el cliente.' });
  }
};





export const actualizarestado = async (req, res) => {

  const id = req.params.id
  console.log(`estado actulizado ${id}`);

  const actualizado={
    estado:req.body.estado
  } 
  
  try {
    const clienteActualizado = await usuario.findByIdAndUpdate(id, actualizado);
    
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




