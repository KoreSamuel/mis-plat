import request from '../../../utils/request';
import instance from '../../../utils/axios';

export function fetch({id}) {
  return instance.get(`/api/sites/menu?id=${id}`);
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
