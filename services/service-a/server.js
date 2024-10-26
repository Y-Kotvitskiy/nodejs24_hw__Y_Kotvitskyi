import { error } from 'console';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'produser is running' });
});

app.get('/message-recieve', async (req, res) => {
  res.send({ message: 'message-recieve' });
});

app.post('/mesage-send', async (req, res) => {
  const message = req.body.message;
  if (message) {
    try {
      const response = await fetch('http://localhost:3001/message-recieve', {
        body: JSON.stringify({ message }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.text();
      console.log('result', result);
      return res.send({ response: `Response is: ${result}` });
    } catch (error) {
      return res.send({ error: 'Something is goin wrong' });
    }
  }
  res.send({ error: 'Message is required!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
