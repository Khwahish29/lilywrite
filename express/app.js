import express from 'express';
import cors from 'cors';
import { upload } from './pinata.js';
import dotenv  from "dotenv"

dotenv.config()

const app = express();

const corsOption = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(express.json())

app.use(cors(corsOption))

app.post("/upload/", async(req, res) => {
    const { prompt } = req.body;
    const cid = await upload(prompt);
    res.status(201).send(cid);
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})