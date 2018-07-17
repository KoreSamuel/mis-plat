import * as loginServices from '../services/login';
import { message as Message } from 'antd';
export default {

  namespace: 'login',

  state: {
  },

  subscriptions: {
  },

  effects: {
    *login({ payload }, { call, put, select }) {
      const { data } = yield call(loginServices.login, payload);
      const { code, info, message } = data;
      if (code === 0) {
        localStorage.setItem('authorization', info.token);
        localStorage.setItem('user', JSON.stringify(info.user))
      } else {
        console.log(message)
        Message.error(message);
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload.data };
    },
  },

};