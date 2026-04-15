import { createClient } from 'redis';

const client = createClient();
const channel = 'holberton school channel';

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

async function startSubscriber() {
  await client.connect();
  await client.subscribe(channel, async (message) => {
    console.log(message);

    if (message === 'KILL_SERVER') {
      await client.unsubscribe(channel);
      await client.quit();
    }
  });
}

startSubscriber().catch(() => {});
