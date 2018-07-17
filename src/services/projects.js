// import request from '../utils/request';
import instance from '../utils/axios';

export function fetch() {
  return instance.get('/api/sites/list');
}

export function remove({ id }) {
  return instance.post(`/api/projects/remove`, id);
}
