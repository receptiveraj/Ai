const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const predictions = [
  "In a distant galaxy, your question will be answered by sentient clouds.",
  "Your fate is tied to an ancient artifact hidden in the heart of the moon.",
  "You will cross paths with an alternate version of yourself in the year 3031.",
  "In another timeline, you are a space pirate navigating the stars.",
  "A parallel universe is waiting for you to step into it. Prepare your spaceship!",
  "The answer to your question lies within the secret society of time travelers.",
  "A black hole is awaiting your next decision. Choose wisely."
];

app.post('/api/quantum-fortune', (req, res) => {
  const { question } = req.body;
  const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];

  res.json({ prediction: randomPrediction });
});

app.listen(PORT, () => {
  console.log("Quantum Fortune Teller API is up at port " + PORT);
});
