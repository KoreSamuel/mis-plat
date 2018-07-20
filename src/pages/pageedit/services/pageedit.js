import instance from '../../../utils/axios';

export function fetch(values) {
  return instance.get(`/api/pages/detail`, {params: values} );
}
export function submit(values) {
  return instance.post('/api/pages/saveDetail', values)
}
