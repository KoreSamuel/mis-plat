import * as pagesServices from '../services/pages';
export default {

  namespace: 'pages',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/pages') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
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
    *create({ payload: values }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      const { data } = yield call(pagesServices.create, { values, id })
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
    *remove({ payload: page_id }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      const { data } = yield call(pagesServices.remove, { id, page_id });
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
    *patch({ payload: { page_id, values } }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      const { data } = yield call(pagesServices.patch, { values, page_id, id })
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
    toDetail(state, { payload: page_id }) {
      localStorage.setItem('curPage', page_id);
      return { ...state, curPage: page_id }
    }
  },

};
