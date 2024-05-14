const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const appendMessage = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.appendChild(messageElement);
};

const appendUserJoinedMessage = (name) => {
  appendMessage(`${name} joined the chat`, "left");
};

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  appendUserJoinedMessage(name);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
