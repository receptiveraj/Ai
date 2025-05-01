const express = require('express');
const cors = require('cors');
const { createCanvas } = require('canvas');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Generate abstract art based on doodle input
app.post('/api/art', (req, res) => {
  const { doodle } = req.body;

  // Create a canvas
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  // Set random colors based on doodle
  const color = doodle.toLowerCase().includes("circle") ? 'blue' : 'red'; 

  // Simulate fractal art or geometric shapes
  ctx.fillStyle = color;
  ctx.fillRect(50, 50, 400, 400); // Drawing a simple square (can be replaced with fractals)
  
  // Add random circles as abstract art
  ctx.beginPath();
  ctx.arc(Math.random() * 500, Math.random() * 500, Math.random() * 100, 0, Math.PI * 2);
  ctx.fill();

  // Send the image as a base64 string
  const imageBase64 = canvas.toDataURL();

  res.json({
    artColor: color,
    pattern: 'Fractal-like or Geometric pattern',
    artImage: imageBase64,
    message: `Generated art based on your doodle: ${doodle}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
