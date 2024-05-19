const express = require('express');
const app = express();
const routes = require("./src/Routes/index");

// middlewares
const errorMiddleware = require('./src/Middlewares/error-middleware')

const connectionDB = require('./src/db/db');
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "POST ,GET, DELETE, PATCH, HEAD",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(errorMiddleware);
routes(app);

const path = require("path");
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "dist")));
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});
const PORT = 5000;
connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    })
});