import express from 'express';
import mysqlDb from '../mysqlDb';
import {Category, CategoryMutation, Item} from '../types';
import {ResultSetHeader} from 'mysql2';

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res,next) => {
  try {
    const result = await mysqlDb.getConnection().query('' +
      'SELECT * FROM categories'
    );
    const categories = result[0] as Item[];
    return res.send(categories);
  } catch (e) {
    next(new Error('Not Found'));
  }
});

categoriesRouter.get("/:id", async (req, res,next) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    'SELECT * FROM items WHERE id = ?',
    [id]
  )
  const category = result[0] as Category[];
  if (category.length > 0) {
    return res.status(404).send({error: 'Not Found'});
  }
  return res.send(category[0]);
});


categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).send({ error: 'Title is required' });
    }

    const category: CategoryMutation = {
      title,
      description,
    };

    const insertResult = await mysqlDb.getConnection().query(
      'INSERT INTO categories (title, description) VALUES (?, ?,)',
      [category.title, category.description],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM categories WHERE id = ?',
      [resultHeader.insertId]
    );

    const categories = getNewResult[0] as Category[];
    return res.send(categories[0]);
  } catch (e) {
    next(e);
  }
});

export default categoriesRouter;