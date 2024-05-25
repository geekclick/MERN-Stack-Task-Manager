const express = require('express');
const errorMiddleware = require('./src/Middlewares/error-middleware');
const connectionDB = require('./src/DB/db');
const routes = require("./src/Routes/index");
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "POST, GET, DELETE, PATCH, HEAD, PUT",
    credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(errorMiddleware);
routes(app);

const path = require("path");
const clientDistPath = path.resolve(__dirname, "client", "dist");
app.use(express.static(clientDistPath));

const serveIndexFile = (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
};

app.get("/*", serveIndexFile);
app.get("/profile", serveIndexFile);
app.get("/projects", serveIndexFile);
app.get("/projects/:id", serveIndexFile);

const PORT = 5000;
connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});