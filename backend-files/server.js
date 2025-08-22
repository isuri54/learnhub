const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async ({ sender, receiver, text }) => {
    const Message = mongoose.model("Message");
    const newMsg = new Message({ sender, receiver, text });
    await newMsg.save();

    io.emit("newMessage", newMsg); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get('/', (req, res) => {
    res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});
