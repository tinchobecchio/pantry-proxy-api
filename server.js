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

const PANTRY_API_BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket`

app.use(cors())
app.use(express.json())


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Generic handler for GET request to fetch data from specific basket
app.get('/:basketName', async (req,res) => {
    const { basketName } = req.params
    try {
        const response = await fetch(`${PANTRY_API_BASE_URL}/${basketName}`)
        if (!response.ok) {
             throw new Error(response.status);
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

// Generic handler for POST request to add new data to specific basket
app.post('/:basketName', async (req,res) => {
    const { basketName } = req.params
    const newData = req.body
    try {
        const response = await fetch(`${PANTRY_API_BASE_URL}/${basketName}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })

        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

// Generic handler for PUT request to update data in a specific basket
app.put('/:basketName', async (req,res) => {
    const { basketName } = req.params
    const newData = req.body
    try {
        const response = await fetch(`${PANTRY_API_BASE_URL}/${basketName}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })

        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

// Generic handler for DELETE request to delete a specific basket
app.delete('/:basketName', async (req,res) => {
    const { basketName } = req.params
    try {
        const response = await fetch(`${PANTRY_API_BASE_URL}/${basketName}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(response.status);
        }
        res.json({ message: `Basket ${basketName} cleared succesfully.`})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})