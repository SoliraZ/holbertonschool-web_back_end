import * as redis from 'redis';
import { promisify } from 'util';

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

const getValue = (schoolName, callback) => {
  client.get(schoolName)
    .then((value) => callback(null, value))
    .catch((err) => callback(err));
};
const getAsync = promisify(getValue);

async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.log(err);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
