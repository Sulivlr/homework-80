import express from 'express';
import fileDb from '../fileDb';
import {EquipmentMutation} from '../types';

const router = express.Router();

router.get('/', async (req, res) => {
  const equipment = await fileDb.getEquipment();
  res.send(equipment);
});

router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({error: 'Please enter a name or description'});
  }

  const equipment: EquipmentMutation = {
    name: req.body.name,
    description: req.body.description,
  };

  const pcEquipment = await fileDb.addEquipment(equipment);
  return res.send(pcEquipment);
});

export default router;

