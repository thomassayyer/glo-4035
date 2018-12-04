import DBManager from '../Database';
import Config from '../../config';

const { db } = Config;

class DensityManager {
  
  async getAll() {
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('densities').find().toArray();
    client.close();
    return result;
  }

  async create(payload){
    const client = await DBManager.getConnection();
    const result = await client.db(`${db.name}`).collection('densities').insertOne(payload);
    client.close();
    return result;
  }

  async remove(payload) {
    const { password } = payload;
    const error = { errormsg:"Bad password", status: 1};
    if(password == db.pwd) {
      const client = await DBManager.getConnection();
      const result = await client.db(`${db.name}`).collection('densities').remove();
      client.close();
      return result;
    }
    return error;
  }

}

export default new DensityManager();