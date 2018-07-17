import * as projectsServices from '../services/projects';
export default {

  namespace: 'projects',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch', payload: query });
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
    *remove({ payload: id }, { call, put }) {
      yield console.log(id);
      const { data } = yield call(projectsServices.remove, id);
      yield put({
        type: 'save',
        payload: {
          data
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, list: action.payload.list };
    },
  },

};
