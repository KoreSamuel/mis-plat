import request from '../../../utils/request';

export function fetch() {
  return request(`/api/menus`);
}

export function remove(id) {
  return request(`/api/menus/${id}`, {
    methods: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/api/menus/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
export function create(values) {
  return request('/api/menus', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
