import * as menusServices from '../services/menus';

export default {
  namespace: 'menus',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { list } }) {
      return { ...state, list };
    },
    add(state) {
      const { list } = state;
      const newID = +list[list.length - 1].id + 1;
      return { ...state, list: [...list, { id: newID, name: '', url: '' }] }
    },
    remove(state, { payload: item }) {
      const { list } = state;
      return { ...state, list: list.filter(k => k.id !== item.id) }
    }
  },
  effects: {
    *fetch({ payload: id }, { call, put }) {
      const { data } = yield call(menusServices.fetch, id);
      const { list } = data.info;
      yield put({
        type: 'save',
        payload: {
          list,
        },
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/menus') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
