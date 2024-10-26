import amqp from 'amqplib';
const messages = { messageIndex: 0 };

const recieveFromQueue = async () => {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const queue = 'test-queue'; // Use the same queue name as the producer

    await channel.assertQueue(queue, { durable: false });
    console.log('Waiting for messages to pass in...');

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const rabitMessage = msg.content.toString();
          messages.messageIndex++;
          messages[messages.messageIndex] = rabitMessage;
          console.log(`Received message: ${rabitMessage}`);
        }
      },
      { noAck: true },
    );
  } catch (err) {
    console.error('Error in consumer:', err);
  }
};

export { recieveFromQueue, messages };
