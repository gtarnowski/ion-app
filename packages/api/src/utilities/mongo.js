import mongo from 'mongodb';
import dotenv from 'dotenv';
import get from 'lodash/get';
import first from 'lodash/first';
import randomId from 'random-id';
import moment from 'moment';
import { MONGO_ERRORS } from '../constants';

dotenv.config();
class Mongo {
  constructor() {
    this.URL = process.env.MONGO_URL;
    this.NAME = process.env.MONGO_DATABASE_NAME;
    this.ID_LENGTH = 12;
    if (!this.NAME || !this.URL) {
      throw new Error(MONGO_ERRORS.ENV_MISSING);
    }
  }

  connect(callback) {
    mongo.connect(
      this.URL,
      { useNewUrlParser: true },
      (error, connection) => {
        if (error) {
          throw new Error(error);
        } else if (!callback || typeof callback !== 'function') {
          throw new Error(MONGO_ERRORS.INVALID_CALLBACK);
        } else {
          const DataBase = connection.db(this.NAME);
          callback(connection, DataBase);
        }
      },
    );
  }

  createCollection(name) {
    this.connect((connection, DataBase) => {
      DataBase.createCollection(name, err => {
        if (err) throw err;
        console.log(`Collection ${name} created!`);
        connection.close();
      });
    });
  }

  async findOne(name, query) {
    const results = await this.find(name, query);
    return first(results);
  }

  find(collectionName, query = {}, options = {}) {
    if (!collectionName) throw new Error(MONGO_ERRORS.MISSING_COLLECTION_NAME);
    const { sort = {}, fields = {}, limit = 0 } = options;

    return new Promise(resolve => {
      this.connect((connection, DataBase) => {
        if (!connection) return;
        const results = DataBase.collection(collectionName)
          .find({ ...query, ...fields })
          .sort(sort)
          .limit(limit)
          .toArray();

        resolve(results);
      });
    });
  }

  insert(collectionName, data, { userId }) {
    if (!collectionName || !data) throw new Error(MONGO_ERRORS.INSERT_FAILED);

    return new Promise(resolve => {
      this.connect((connection, DataBase) => {
        data._id = randomId(this.ID_LENGTH);

        if (userId) {
          data.created = {
            createdAt: moment().toISOString(),
            createdBy: userId,
          };
        }

        try {
          const result = DataBase.collection(collectionName).insertOne(data);
          resolve(result);
        } catch (error) {
          throw new Error(error);
        }
      });
    });
  }

  insertMany(collectionName, data, { userId }) {
    if (!collectionName || !data) throw new Error(MONGO_ERRORS.INSERT_FAILED);

    return new Promise(resolve => {
      this.connect((connection, DataBase) => {
        data.forEach(row => {
          row._id = randomId(this.ID_LENGTH);

          if (userId) {
            row.created = {
              createdAt: moment().toISOString(),
              createdBy: userId,
            };
          }
        });

        try {
          const result = DataBase.collection(collectionName).insertMany(data);
          resolve(result);
        } catch (error) {
          throw new Error(error);
        }
      });
    });
  }

  update(collectionName, fields, data, { userId }) {
    if (!collectionName || !data) throw new Error(MONGO_ERRORS.UPDATE_FAILED);

    this.connect((connection, Database) => {
      let updated = null;
      if (userId) {
        updated = {
          updatedAt: moment().toISOString(),
          updatedBy: userId,
        };
      }

      try {
        Database.collection(collectionName).updateOne(
          fields,
          {
            ...data,
            ...{
              $set: {
                updated,
              },
            },
          },
          err => {
            if (err) throw err;
            connection.close();
          },
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  getInsertObject(result) {
    if (!result) return {};

    return get(result, 'ops[0]');
  }
}

export default new Mongo();
