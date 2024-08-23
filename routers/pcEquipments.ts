import express from 'express';
import {Item, ItemMutation} from '../types';
import mysqlDb from '../mysqlDb';
import {imagesUpload} from '../multer';
import {ResultSetHeader} from 'mysql2';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await mysqlDb.getConnection().query(
    'SELECT * FROM items',
  );
  const items = result[0] as Item[];
  res.send(items);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    `SELECT * FROM items WHERE id = ?`,
    [id]
  );
  const item = result[0] as Item[];
  if (item.length === 0) {
    return res.status(404).send({error: 'Not Found'});
  }
  return res.send(item[0]);
});

router.post('/', imagesUpload.single('image'), async (req, res) => {

  const item: ItemMutation = {
    category_id: parseInt(req.body.category_id),
    location_id: parseInt(req.body.location_id),
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

  const insertResult = await mysqlDb.getConnection().query(
    'INSERT INTO items (category_id, location_id, title, description, image) VALUES (?, ?, ?, ?, ?)',
    [item.category_id, item.location_id, item.title, item.description, item.image],
  );

  const resultHeader = insertResult[0] as ResultSetHeader;
  console.log(resultHeader.insertId)

  const getNewResult = await mysqlDb.getConnection().query(
    'SELECT * FROM items WHERE id = ?',
    [resultHeader.insertId]
  );

  const items = getNewResult[0] as Item[];
  return res.send(items[0]);
});

export default router;

