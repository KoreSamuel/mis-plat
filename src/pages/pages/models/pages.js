import * as pagesServices from '../services/pages';
export default {

  namespace: 'pages',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/pages') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },

  effects: {
    *fetch({ payload: id }, { call, put }) {
      const { data } = yield call(pagesServices.fetch, id);
      const { code, info, message } = data;
      if (code === 0) {
        yield put({
          type: 'save',
          payload: {
            list: info.list
          },
        });
      } else {
        console.log(message)
      }
    },
  },

  reducers: {
    save(state, { payload: { list } }) {
      return { ...state, list };
    },
  },

};
