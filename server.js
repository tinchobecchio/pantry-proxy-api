import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const PANTRY_ID = process.env.PANTRY_ID

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})