import { authorized, getUserFromContext, createUser, signIn } from '../models/Users';
import { createSubCategory, renameSubCategory } from '../models/Subcategories';
import { createCategory, renameCategory, getCategory } from '../models/Categories';

const authorizationRequiredMutations = {
  createCategory: (_, data, context) => authorized(context, createCategory, data),
  createSubCategory: (_, data, context) => authorized(context, createSubCategory, data),
};

const nonAuthorizedMutations = {
  signIn: (_, data) => signIn(data),
  createUser: (_, data) => createUser(data),
};

const nonAuthorizedQueries = {
  category: (_, data) => getCategory(data),
  user: (_, data, context) => getUserFromContext(context),
};

export default {
  Query: {
    ...nonAuthorizedQueries,
  },
  Mutation: {
    ...nonAuthorizedMutations,
    ...authorizationRequiredMutations,
  },
};
