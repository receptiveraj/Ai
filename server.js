const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Hugging Face API Key
const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
    console.error("ERROR: HF_API_KEY not set!");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${HF_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiReply = response.data.generated_text || "Nova couldn't understand.";
        res.status(200).json({ reply: aiReply });

    } catch (error) {
        console.error('Hugging Face Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

app.get('/', (req, res) => {
    res.send('Nova AI Assistant using DialoGPT is running!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
