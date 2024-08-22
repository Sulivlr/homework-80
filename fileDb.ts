import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Equipment, EquipmentMutation} from './types';

const fileName = './db.json';
let data: Equipment[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (error) {
      data = []
    }
  },
  async getEquipment () {
    return data;
  },

  async addEquipment(item: EquipmentMutation) {
    const equipment: Equipment = {
      id: crypto.randomUUID().toString(),
      ...item,
    };
    data.push(equipment);
    await this.save();
    return equipment;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  }
};

export default fileDb;