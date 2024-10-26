import express from 'express';

const app = express();
// app.use();
app.use(express.json());

app.post('/message-recieve', async (req, res) => {
  const message = req.body.message;
  console.log(`Recieved message: ${message}`);
  res.send(message);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
