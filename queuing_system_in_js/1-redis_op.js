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

function setNewSchool(schoolName, value) {
  client.set(schoolName, value)
    .then((reply) => redisPrint(null, reply))
    .catch((err) => redisPrint(err));
}

function displaySchoolValue(schoolName) {
  client.get(schoolName)
    .then((reply) => console.log(reply))
    .catch((err) => console.log(err));
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
