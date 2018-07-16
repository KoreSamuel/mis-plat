import request from '../utils/request';

export function fetch() {
  return request('/api/projects/list');
}

export function remove({ id }) {
  return request(`/api/projects/remove`, {
    methods: 'get',
    body: JSON.stringify(id)
  });
}
