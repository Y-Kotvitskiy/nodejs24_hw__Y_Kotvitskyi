import express from 'express';
import { recieveFromQueue, messages } from './consume.js';

const app = express();
// app.use();
app.use(express.json());

app.post('/message-recieve', async (req, res) => {
  const message = req.body.message;
  console.log(`Recieved message: ${message}`);
  res.send(message);
});

app.get('/queue', async (req, res) => {
  await recieveFromQueue();
  res.send('Established queue');
});

app.get('/messages', (req, res) => {
  const currentMessages = { ...messages };
  let i = messages.messageIndex;
  while (messages[i]) {
    delete messages[i];
    i--;
  }
  delete currentMessages.messageIndex;
  res.send({ currentMessages });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
