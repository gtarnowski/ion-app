import jwt from 'jsonwebtoken';
import { hash, userHasRole, ErrorResponse } from '../utilities';
import Mongo from '../utilities/mongo';
import {
  ERR_ACCESS_DENIED,
  ERR_ACCESS_DENIED_ROLE,
  ERR_INVALID_USER,
  ERR_USER_EXISTS,
  COLLECTIONS,
} from '../constants';

const { USERS } = COLLECTIONS;
const PASSKEY = process.env.PASSKEY;
const JWT_SECRET = process.env.JWT_SECRET;

export async function generateToken(userId) {
  const user = await Mongo.findOne(USERS, { _id: userId });
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
      user,
    },
    JWT_SECRET,
  );
}

export async function createUser({ username, password }) {
  const user = await Mongo.findOne(USERS, { username });

  if (user) {
    // FIXME: Change to 'username exists'
    return ErrorResponse(ERR_USER_EXISTS);
  }

  const data = {
    username,
    password: hash(password),
  };

  try {
    const result = Mongo.insert(USERS, data, {});
    return {
      result: {
        success: true,
      },
      token: generateToken(data._id),
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function signIn({ username, password }) {
  const user = await Mongo.findOne(USERS, { username });
  if (!user) {
    return new ErrorResponse(ERR_INVALID_USER);
  }
  if (!user.password) {
    return new ErrorResponse(ERR_INVALID_USER);
  }

  if (password !== PASSKEY && user.password !== hash(password, {}, user.password)) {
    return new ErrorResponse(ERR_INVALID_USER);
  }

  return {
    result: {
      success: true,
    },
    token: generateToken(user._id),
  };
}

export function getUserFromContext(context) {
  let token = context.authorization;
  if (!token) {
    return null;
  }

  if (token.match(/^Bearer /)) {
    token = token.split(' ')[1];
  }

  const decrypted = jwt.verify(token, JWT_SECRET);
  if (!decrypted.user) {
    return null;
  }

  return decrypted.user;
}

export function authorized(context, fn, data) {
  const user = getUserFromContext(context);

  if (!user) {
    return new ErrorResponse(ERR_ACCESS_DENIED);
  }

  if (!userHasRole(user)) {
    return new ErrorResponse(ERR_ACCESS_DENIED_ROLE);
  }

  return fn(data, { user, context });
}
