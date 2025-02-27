const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai'); // Import the OpenAI library

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use the API key from the .env file
});

// Basic route
app.get('/', (req, res) => {
  res.send('AI-Powered Resume Builder API');
});

// API route to interact with OpenAI
app.post('/api/generateResume', async (req, res) => {
  try {
    // Assuming you want to use chat completion to generate resume content
    const { prompt } = req.body; // Get the resume prompt from the request body
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can change this model to the one you need
      messages: [
        { role: 'system', content: 'You are a helpful assistant for building resumes.' },
        { role: 'user', content: prompt }, // The prompt to generate the resume
      ],
    });

    // Send the OpenAI response back to the client
    res.json({
      message: "Resume generated successfully",
      openaiResponse: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error connecting to OpenAI:', error);
    res.status(500).json({ message: 'Failed to connect to OpenAI API', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
