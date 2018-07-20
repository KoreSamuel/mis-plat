import instance from '../../../utils/axios';

export function fetch({id}) {
  return instance.get(`/api/menus/list?id=${id}`);
}

export function submit(values) {
  return instance.post('/api/menus/mod', values);
}
