const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/run', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send('الكود مطلوب!');
  }

  exec(`node -e "${code}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(`Output: ${stdout}`);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
