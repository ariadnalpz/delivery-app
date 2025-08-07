const io = require('socket.io-client');

const socket = io('http://localhost:3000');

// Prueba para simular un delivery enviando ubicación
socket.on('connect', () => {
  console.log('Conectado al servidor:', socket.id);

  // Enviar ubicación cada 10 segundos
  setInterval(() => {
    const data = {
      userId: 2, // ID de delivery1
      lat: 40.7128, // Ejemplo: Nueva York
      lon: -74.0060
    };
    console.log('Enviando ubicación:', data);
    socket.emit('updateLocation', data);
  }, 10000);
});

// Simular que el admin recibe ubicaciones
socket.on('locationUpdate', (data) => {
  console.log('Ubicación recibida:', data);
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});