import express from 'express';
import cors from 'cors';
import pcEquipments from './routers/pcEquipments';
import mysqlDb from './mysqlDb';

const app = express();
const port = 8000;



app.use(cors());
app.use(express.json());
app.use('/items', pcEquipments);

const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log('Listening on port', port);
  })
};

void run();
