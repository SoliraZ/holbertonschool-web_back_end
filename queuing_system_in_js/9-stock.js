import express from 'express';
import * as redis from 'redis';
import { promisify } from 'util';

const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5,
  },
];

function getItemById(id) {
  return listProducts.find((p) => p.itemId === id);
}

const client = redis.createClient({ legacyMode: true });
client.on('error', () => {});
if (typeof client.connect === 'function') {
  client.connect().catch(() => {});
}

const getAsync = promisify((key, cb) => {
  client.get(key)
    .then((value) => cb(null, value))
    .catch((err) => cb(err));
});

const setAsync = promisify((key, value, cb) => {
  client.set(key, value)
    .then((reply) => cb(null, reply))
    .catch((err) => cb(err));
});

function reserveStockById(itemId, stock) {
  return setAsync(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const value = await getAsync(`item.${itemId}`);
  const reserved = parseInt(value, 10);
  return Number.isNaN(reserved) ? 0 : reserved;
}

const app = express();

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);
  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const reserved = await getCurrentReservedStockById(itemId);
  const currentQuantity = item.initialAvailableQuantity - reserved;
  res.json({ ...item, currentQuantity });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);
  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const reserved = await getCurrentReservedStockById(itemId);
  const currentQuantity = item.initialAvailableQuantity - reserved;

  if (currentQuantity <= 0) {
    res.json({ status: 'Not enough stock available', itemId });
    return;
  }

  await reserveStockById(itemId, reserved + 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(1245, () => {});

