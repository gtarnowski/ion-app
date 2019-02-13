import crypto from 'crypto';
import { ROLES }from '../constants';
import { kebabCase, lowerCase, isArray } from 'lodash';
export { ErrorResponse } from './errorResponse';

export const hash = password =>
  crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

export const userHasRole = ({ role }) => role && (role === ROLES.ADMIN || role === ROLES.SHOP_ADMIN);

export const buildUrlSlug = paths => {
  if (!paths || !isArray(paths)) return '';

  const filteredPaths = paths.filter(Boolean);
  if (filteredPaths.length === 0) return '';

  let path = '';

  filteredPaths.forEach(pathName => {
    if (pathName) {
      const slug = kebabCase(lowerCase(pathName));
      path += `/${  slug}`;
    }
  });

  return path;
};
