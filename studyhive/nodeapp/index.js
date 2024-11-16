const express = require('express');
const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5001; // Port where the server will run

const endpoint = process.env['VISION_ENDPOINT'];
const key = process.env['VISION_KEY'];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ['Caption', 'Read'];

// CORS setup: allow React app running on localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',  // Allow the frontend running on this port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware
app.use(express.json());

// API Endpoint for analyzing image from Base64
app.post('/api/analyze-image', async (req, res) => {
  const { imageBase64 } = req.body;  // Receive Base64 string from frontend

  if (!imageBase64) {
    return res.status(400).send('Base64 image is required');
  }

  try {
    const result = await client.path('/imageanalysis:analyze').post({
      body: {
        data: imageBase64,  // Pass Base64 data to Azure API
      },
      queryParameters: {
        features: features,
      },
      contentType: 'application/json',
    });

    const iaResult = result.body;

    let response = {};
    if (iaResult.captionResult) {
      response.caption = {
        text: iaResult.captionResult.text,
        confidence: iaResult.captionResult.confidence,
      };
    }
    if (iaResult.readResult) {
      response.textBlocks = iaResult.readResult.blocks;
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
