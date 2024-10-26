import amqp from 'amqplib';

const sendToQueue = async (message) => {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const queue = 'test-queue'; // Use the same queue name as the consumer

    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Sent message: ${message}`);

    // Delay the closing of the channel to ensure the message is sent
    setTimeout(() => {
      channel.close();
      conn.close();
    }, 500);
  } catch (err) {
    console.error('Error in producer:', err);
  }
};

export default sendToQueue;
