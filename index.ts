import express from 'express';
import cors from 'cors';
import pcEquipments from './routers/pcEquipments';
import config from './config';
import fileDb from './fileDb';

const app = express();
const port = 8000;



app.use(cors());
app.use(express.json());
app.use('/equipments', pcEquipments);

const run = async () => {
  await fileDb.init();
  app.listen(port, () => {
    console.log('Listening on port', port);
  })
};

void run();
