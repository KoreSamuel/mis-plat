import instance from '../utils/axios';

export function fetch() {
  return instance.get('/api/sites/list');
}

export function create(values) {
  return instance.post('/api/sites/create', values)
}

export function remove(id) {
  return instance.post(`/api/sites/remove`, { id });
}
