const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", require("./routes/index.js"));

app.listen(3000, () => console.log("Server running on 3000"));
