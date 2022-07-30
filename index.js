const express = require('express');
const env = require('./config/envConfig');
const cors = require("cors");
const connect = require('./config/db');
// const userRoutes = require("./routes/userRoutes");
const app = express();

// Connect Database 

connect();
app.use(cors());
app.use(express.json());

app.get("/",(req, res)=> {

    res.json({msg:"Welcome to crud"});

});

// app.use("/api",userRoutes);

const port = env.PORT || 5000;


app.listen(port, () =>{
    console.log(`Your server is running at port number:${port}`);
});