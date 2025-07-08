import express from "express";
import { Timestamp } from "firebase-admin/firestore";

const PORT = 1230;

const server = express();
server.use(express.json());

server.get('/greet', (req, res) =>{
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IL'); 
    res.send({ msg: `hi from get endpoint <${formattedDate}>` });
  })
//aa


server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
  })