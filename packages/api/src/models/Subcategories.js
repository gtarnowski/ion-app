import Mongo from '../utilities/mongo';
import {
  ERR_CATEGORY_NOT_FOUND,
  COLLECTIONS,
  ERR_SUBCATEGORY_NOT_FOUND,
  ERR_NON_UNIQ_NAME,
  ERR_MISSING_CATEGORY_ID,
} from '../constants';

import { buildUrlSlug, ErrorResponse } from '../utilities';

const { CATEGORIES, SUBCATEGORIES } = COLLECTIONS;

export async function createSubCategory({ categoryId, name }, { user }) {
  if (!categoryId) {
    return ErrorResponse(ERR_MISSING_CATEGORY_ID);
  }

  const category = await Mongo.findOne(CATEGORIES, { _id: categoryId });
  if (!category) {
    return ErrorResponse(ERR_CATEGORY_NOT_FOUND);
  }

  const subcategories = await Mongo.find(SUBCATEGORIES, { name });
  const isNameUniq = !Boolean(subcategories.find(({ name: subCategoryName }) => subCategoryName === name));
  if (!isNameUniq) {
    return new ErrorResponse(ERR_NON_UNIQ_NAME);
  }

  // Happy path
  const subCategory = {
    categoryId,
    categoryName: category.name,
    name,
    url: buildUrlSlug([category.name, name]),
  };

  try {
    const result = await Mongo.insert(SUBCATEGORIES, subCategory, { userId: user._id });
    const document = Mongo.getInsertObject(result);
    if (document._id) {
        Mongo.update(CATEGORIES, { _id: category._id }, { $inc: { subCategoriesCount: 1 } }, {});
    }
    return {
      subCategory: document,
      result: {
        success: true,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function renameSubCategory({ subCategoryId, name }, { userId }) {
  const subCategory = await Mongo.findOne(SUBCATEGORIES, { _id: subCategoryId });
  const sameNamedSubcategory = await Mongo.find(SUBCATEGORIES, { name });

  if (!subCategory) return ErrorResponse(ERR_SUBCATEGORY_NOT_FOUND);
  if (sameNamedSubcategory) return ErrorResponse(ERR_NON_UNIQ_NAME);

  // Happy path
  try {
    return Mongo.update(SUBCATEGORIES, { _id: subCategoryId }, { $set: { name } }, { userId });
  } catch (error) {
    throw new Error(error);
  }
}
