import Mongo from './utilities/mongo';
import { COLLECTIONS, ROLES, MONGO_ERRORS } from './constants';
import { hash } from './utilities';

export default async function initialProcess() {
  const { USERS } = COLLECTIONS;
  const ROOT_EMAIL = process.env.ROOT_EMAIL;
  const ROOT_USERNAME = process.env.ROOT_USERNAME;

  if (!ROOT_USERNAME) throw new Error(MONGO_ERRORS.ENV_MISSING)

  const user = await Mongo.findOne(USERS, { username: ROOT_USERNAME });
  if (user) return;


  const data = {
    username: ROOT_USERNAME,
    password: hash(process.env.ROOT_PASSWORD),
    role: ROLES.ADMIN,
    email: ROOT_EMAIL,
  };

  const { insertedId } = await Mongo.insert(USERS, data, {});
  if (insertedId) {
    console.log(`"${process.env.ROOT_USERNAME}" User Created`); // eslint-disable-line no-console
  }
}
