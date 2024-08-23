import express from 'express';
import {Item, ItemMutation} from '../types';
import mysqlDb from '../mysqlDb';

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

router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({error: 'Please enter a name or description'});
  }

  router.delete('/:id', async (req, res) => {

  });

  router.put('/', async (req, res) => {

  });


  const item: ItemMutation = {
    category_id: parseInt(req.body.category_id),
    location_id: parseInt(req.body.location_id),
    title: req.body.name,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

});

export default router;

