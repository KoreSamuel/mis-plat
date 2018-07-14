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
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(pagesServices.fetch);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload.data };
    },
  },

};
