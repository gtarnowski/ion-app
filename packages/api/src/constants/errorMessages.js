export const ERR_ACCESS_DENIED = 'access-denied';
export const ERR_ACCESS_DENIED_ROLE = 'access-denied-role';
export const ERR_INVALID_USER = 'invalid-user';
export const ERR_MAX_CATEGORY_LIMIT = 'max-category-limit';
export const ERR_USER_EXISTS = 'user-exists';
export const ERR_MISSING_USER_ID = 'missing-user-id';
export const ERR_MISSING_CATEGORY_ID = 'missing-category-id';
export const ERR_MISSING_SUBCATEGORY_ID = 'missing-subcategory-id';
export const ERR_CATEGORY_NOT_FOUND = 'category-not-found';
export const ERR_SUBCATEGORY_NOT_FOUND = 'subcategory-not-found';
export const ERR_NON_UNIQ_NAME = 'non-uniq-name';

export const ERROR_MESSAGES = new Map()
  .set(ERR_ACCESS_DENIED, 'Access Denied')
  .set(ERR_ACCESS_DENIED_ROLE, 'Access Denied - wrong user role')
  .set(ERR_INVALID_USER, 'Invalid user or password')
  .set(ERR_MAX_CATEGORY_LIMIT, 'Max category limit reached')
  .set(ERR_USER_EXISTS, 'This username exists')
  .set(ERR_MISSING_USER_ID, 'User ID is missing')
  .set(ERR_MISSING_CATEGORY_ID, 'Missing Category Id')
  .set(ERR_CATEGORY_NOT_FOUND, 'Category not found')
  .set(ERR_SUBCATEGORY_NOT_FOUND, 'Subcategory not found')
  .set(ERR_NON_UNIQ_NAME, 'This name already exists')
  .set(ERR_MISSING_SUBCATEGORY_ID, 'Missing Subcategory Id');


export const MONGO_ERRORS = {
  INVALID_CALLBACK: 'Mongo: Invalid callback method',
  MISSING_COLLECTION_NAME: 'Mongo: missing collection name',
  INSERT_FAILED: 'Mongo-Insert: missing database name or data',
  UPDATE_FAILED: 'Mongo-Update: missing database name or data',
  ENV_MISSING: 'Mongo: env variables are missing'
};
