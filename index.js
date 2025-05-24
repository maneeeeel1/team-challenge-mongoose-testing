const express = require("express");
const app = express();
const PORT = 3000;
const dbConnection = require("./config/config.js");
require("dotenv").config({ path: './env/.env' })

app.use(express.json());

const postRoutes = require("./routes/posts.js")
app.use("/", postRoutes);

dbConnection();

app.listen(PORT,() => console.log(`server listening port ${PORT}`));
