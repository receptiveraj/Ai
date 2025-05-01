const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const artColors = ['#00ffea', '#ff00cc', '#ff6600', '#6600ff', '#00ff00'];

// Generate fractal art (simulated here as a color)
app.post('/api/art', (req, res) => {
  const { doodle } = req.body;
  
  // Generate a random color and pattern (could be based on doodle input in real scenario)
  const randomArt = {
    artColor: artColors[Math.floor(Math.random() * artColors.length)],
    pattern: 'Fractal Pattern',
    message: `Your doodle '${doodle}' inspired fractal art!`
  };

  // Simulate fractal art (You can replace this with actual fractal generation code)
  res.json(randomArt);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
