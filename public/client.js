const socket = io();

// Unirse a una sala existente
document.getElementById("join-room").addEventListener("click", () => {
  const room = document.getElementById("room-input").value;
  const username = prompt("Escribe tu nombre:");
  if (room && username) {
    socket.emit("joinRoom", { username, room });
    document.getElementById("room-input").value = ""; // Limpiar campo
  }
});

// Crear una nueva sala
document.getElementById("create-room").addEventListener("click", () => {
  const room = document.getElementById("new-room-input").value;
  const username = prompt("Escribe tu nombre:");
  if (room && username) {
    socket.emit("createRoom", { username, room });
    document.getElementById("new-room-input").value = ""; // Limpiar campo
  }
});

// Asignar nuevos administradores
function assignAdmin(room, username) {
  socket.emit("assignAdmin", { room, username });
}

// Eliminar un mensaje
function deleteMessage(room, index) {
  socket.emit("deleteMessage", { room, index });
}

// Enviar mensajes en el chat
document.getElementById("send-message").addEventListener("click", () => {
  const message = document.getElementById("message-input").value;
  socket.emit("chatMessage", message);
  document.getElementById("message-input").value = ""; // Limpiar campo
});

// Recibir mensajes en el chat
socket.off("message");
socket.on("message", (message) => {
  const li = document.createElement("li");
  li.innerText = `${message.user}: ${message.text}`;
  document.getElementById("message-list").appendChild(li);
});

// Recibir historial de mensajes de una sala
socket.off("history");

// Actualizar lista de salas
socket.off("updateRoomsList");
socket.on("updateRoomsList", (rooms) => {
  const roomsList = document.getElementById("rooms-list");
  roomsList.innerHTML = ""; // Limpiar lista de salas
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    li.addEventListener("click", () => {
      const username = prompt("Escribe tu nombre:");
      socket.emit("joinRoom", { username, room });
    });
    roomsList.appendChild(li);
  });
});
