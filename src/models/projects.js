import * as projectsServices from '../services/projects';
import { message } from 'antd';
export default {

  namespace: 'projects',

  state: {
    list: [],
    curProject: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(projectsServices.fetch);
      const { code, info, message } = data;
      if (code === 0) {
        yield put({
          type: 'save',
          payload: {
            list: info.siteList
          },
        });
      } else {
        console.log(message)
      }
    },
    *create({ payload: values }, { call, put }) {
      const { data } = yield call(projectsServices.create, values)
      if (data.code === 0) {
        message.success(data.message)
        yield put({ type: 'fetch' });
      } else {
        message.error(data.message)
      }
    },
    *remove({ payload: id }, { call, put }) {
      yield console.log(id);
      const { data } = yield call(projectsServices.remove, id);
      if (data.code === 0) {
        message.success(data.message)
        yield put({ type: 'fetch' });
      } else {
        message.error(data.message)
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, list: action.payload.list };
    },
    gotoProject(state, { payload: id }) {
      localStorage.setItem('curProject', id);
      return { ...state, curProject: id }
    }
  },

};
