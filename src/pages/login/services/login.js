// import request from '../../../utils/request';
import instance from '../../../utils/axios';

export function login(payload) {
  return instance.post('/api/login', payload);
}
