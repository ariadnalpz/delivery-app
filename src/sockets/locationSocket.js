const supabase = require('../config/db');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('updateLocation', async (data) => {
      const { userId, lat, lon } = data;

      try {
        // Actualizar ubicación actual en la tabla users
        const { error: userError } = await supabase
          .from('users')
          .update({ location: `POINT(${lon} ${lat})` })
          .eq('id', userId);

        if (userError) throw userError;

        // Guardar en el historial de ubicaciones
        const { error: historyError } = await supabase
          .from('location_history')
          .insert([{ delivery_id: userId, location: `POINT(${lon} ${lat})` }]);

        if (historyError) throw historyError;

        // Emitir la nueva ubicación a los admins conectados
        io.emit('locationUpdate', { userId, lat, lon });
      } catch (error) {
        console.error('Error al actualizar ubicación:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });
};