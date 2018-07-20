import instance from '../../../utils/axios';

export function fetch(id) {
  return instance.get(`/api/pages/list?id=${id}`);
}

export function create(values) {
  return instance.post('/api/pages/create', values)
}

export function remove(id) {
  return instance.post('/api/pages/remove', id)
}

export function patch(values) {
  return instance.post('/api/pages/edit', values);
}
