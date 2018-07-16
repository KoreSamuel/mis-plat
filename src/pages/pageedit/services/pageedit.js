import request from '../../../utils/request';

export function fetch({ id }) {
  return request(`/api/pageedit?id=${id}`);
}
