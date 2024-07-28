const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const routes = require("./routes/routes");
const Websokect = require("./config/socket");
const http = require("http");
const expressLayouts = require("express-ejs-layouts");
const { datauser } = require("./config/socket");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("assets"));
app.use(bodyParser.json());

// Socket
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(expressLayouts);

// Routes
app.use("/", routes);

app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/tambah_data", (req, res) => {
  res.render("tambah-data");
});

// Sockets
io.on("connection", (socket) => {
  datauser(err, (users) => {
    if (err) throw err;
    socket.emit("loadUser", users);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
