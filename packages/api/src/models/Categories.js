import Mongo from '../utilities/mongo';
import { COLLECTIONS, ERR_CATEGORY_NOT_FOUND, ERR_MAX_CATEGORY_LIMIT, ERR_NON_UNIQ_NAME } from '../constants';
import { ErrorResponse, buildUrlSlug } from '../utilities';

const { CATEGORIES } = COLLECTIONS;
const CATEGORY_LIMIT = process.env.CATEGORY_LIMIT;

export async function createCategory({ name }, { user }) {
  const categories = await Mongo.find(CATEGORIES, {});
  if (categories && categories.length >= CATEGORY_LIMIT) {
    return new ErrorResponse(ERR_MAX_CATEGORY_LIMIT);
  }

  const isNameUniq = !Boolean(categories.find(({ name: categoryName }) => categoryName === name));
  if (!isNameUniq) {
    return new ErrorResponse(ERR_NON_UNIQ_NAME);
  }

  // Happy path
  const category = {
    name,
    subCategoriesCount: 0,
    url: buildUrlSlug([name]),
  };

  try {
    const result = await Mongo.insert(CATEGORIES, category, { userId: user._id });
    const document = Mongo.getInsertObject(result);
    return {
      category: document,
      result: {
        success: true,
      },
    };
  } catch (errorKey) {
    throw new Error(errorKey);
  }
}

export async function renameCategory({ categoryId, name }, { userId }) {
  const category = await Mongo.findOne(CATEGORIES, { _id: categoryId });
  const sameNamedCategory = await Mongo.findOne(CATEGORIES, { name });

  if (!category) return new ErrorResponse(ERR_CATEGORY_NOT_FOUND);
  if (sameNamedCategory) return new ErrorResponse(ERR_NON_UNIQ_NAME);

  // Happy path
  try {
    return Mongo.update(CATEGORIES, { _id: categoryId }, { $set: { name } }, { userId });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCategory({ categoryId }) {
  try {
    const category = await Mongo.findOne(CATEGORIES, { _id: categoryId });
    if (!category) return new ErrorResponse(ERR_CATEGORY_NOT_FOUND);

    return {
      category,
    }
  } catch (errorKey) {
    throw new Error(errorKey);
  }
}