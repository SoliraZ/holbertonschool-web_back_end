import * as redis from 'redis';

const client = redis.createClient({ legacyMode: true });
const redisPrint = redis.print || ((err, reply) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Reply: ${reply}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

if (typeof client.connect === 'function') {
  client.connect().catch(() => {});
}

const data = [
  ['Portland', 50],
  ['Seattle', 80],
  ['New York', 20],
  ['Bogota', 20],
  ['Cali', 40],
  ['Paris', 2],
];

function hsetWithCallback(key, field, value, callback) {
  client.hSet(key, field, value)
    .then((reply) => callback(null, reply))
    .catch((err) => callback(err));
}

function hgetallWithCallback(key, callback) {
  client.hGetAll(key)
    .then((reply) => callback(null, reply))
    .catch((err) => callback(err));
}

function fillHash(index = 0) {
  if (index >= data.length) {
    hgetallWithCallback('HolbertonSchools', (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log({ ...reply });
    });
    return;
  }

  const [field, value] = data[index];
  hsetWithCallback('HolbertonSchools', field, value, (err, reply) => {
    redisPrint(err, reply);
    fillHash(index + 1);
  });
}

client.del('HolbertonSchools')
  .then(() => fillHash())
  .catch((err) => console.log(err));
