import express from 'express';
import cors from 'cors';
import pcEquipments from './routers/pcEquipments';
import mysqlDb from './mysqlDb';
import categoriesRouter from './routers/categories';

const app = express();
const port = 8000;



app.use(cors());
app.use(express.json());
app.use('/items', pcEquipments);
app.use('/categories', categoriesRouter);

const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log('Listening on port', port);
  })
};

void run();
