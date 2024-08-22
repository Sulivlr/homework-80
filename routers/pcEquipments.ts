import express from 'express';
import fileDb from '../fileDb';
import {Equipment, EquipmentMutation} from '../types';

const router = express.Router();

router.get('/', async (req, res) => {
  const equipment = await fileDb.getEquipment();
  res.send(equipment);
});

router.get('/:id', async (req, res) => {
  const equipments = await fileDb.getEquipment();
  const equipment = equipments.find((e) => e.id === req.params.id);
  return res.send(equipment);
});

router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).send({error: 'Please enter a name or description'});
  }

  router.delete('/:id', async (req, res) => {

  });

  router.put('/', async (req, res) => {

  });


  const equipment: EquipmentMutation = {
    name: req.body.name,
    description: req.body.description,
  };

  const pcEquipment = await fileDb.addEquipment(equipment);
  return res.send(pcEquipment);
});

export default router;

