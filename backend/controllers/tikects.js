import Tiket from '../models/tikects.js';

export const obtenerTickets = async (req, res) => {
  try {
    const tickets = await Tiket.find()
      .populate("vehiculo")
      .populate("cliente")
      .populate("ruta")

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los tickets.' });
  }
};


export const traigotiket = async (req, res) => {
  const { idruta, idbus, idfecha, idhora } = req.query; 
  
  try {
    const buscar = await Tiket.find({
      $and: [
        { ruta: idruta },
        { vehiculo: idbus },
        { fecha_salida: idfecha}
      ]
    })
      .populate("vehiculo")
      .populate("ruta")
      .populate("cliente")

    let puestos = [];
    buscar.forEach((r, i) => {
      puestos.push(r.numero_puesto);
    });

    console.log(puestos);


    res.status(200).json({
      datosbuscar:buscar,
      datospuestos:puestos 
    })

  } catch (error) {
    res.json({ msj: "no coinciden todos.." });
    console.log(error);
  }
};




export const obtenerTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Tiket.findById(id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el ticket (soyobtenertiket).' });
  }
};




// Crear un nuevo ticket
export const crearTicket = async (req, res) => {
  try {
    const nuevoTicket = new Tiket(req.body);
    const ticketCreado = await nuevoTicket.save();
    res.status(201).json(ticketCreado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el ticket.' });
  }
};





// Actualizar un ticket existente
export const actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketActualizado = await Tiket.findByIdAndUpdate(id, req.body, { new: true });
    if (ticketActualizado) {
      res.status(200).json(ticketActualizado);
    } else {
      res.status(404).json({ error: 'Ticket no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el ticket.' });
  }
};

// Eliminar un ticket
export const eliminarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketEliminado = await Tiket.findByIdAndDelete(id);
    if (ticketEliminado) {
      res.status(200).json(ticketEliminado);
    } else {
      res.status(404).json({ error: 'Ticket no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el ticket.' });
  }
};
