const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const artColors = ['#00ffea', '#ff00cc', '#ff6600', '#6600ff', '#00ff00'];
const patterns = ['Fractal', 'Geometric', 'Abstract', '3D'];

app.post('/api/art', (req, res) => {
  const { doodle } = req.body;

  // Randomize art style, color, and pattern based on the doodle input
  const randomArt = {
    artColor: artColors[Math.floor(Math.random() * artColors.length)],
    pattern: patterns[Math.floor(Math.random() * patterns.length)],
    message: `Your doodle '${doodle}' inspired a ${patterns[Math.floor(Math.random() * patterns.length)]} pattern!`
  };

  res.json(randomArt);
});

app.listen(PORT, () => {
  console.log("Hyper Dimensional Art Generator API is running on port " + PORT);
});
