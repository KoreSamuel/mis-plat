import * as menusServices from '../services/menus';
import {message} from 'antd';

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
      let newID = '';
      if (list.length) {
        newID = list[list.length - 1]._id + 1;
      } else {
        newID = +new Date();
      }
      return { ...state, list: [...list, { _id: newID, name: '', url: '' }] }
    },
    remove(state, { payload: item }) {
      const { list } = state;
      return { ...state, list: list.filter(k => k._id !== item._id) }
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      const { data } = yield call(menusServices.fetch, { id });
      const { list } = data.info;
      yield put({
        type: 'save',
        payload: {
          list,
        },
      });
    },
    *submit({ payload: { item } }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      const { data } = yield call(menusServices.submit, { item, id })
      if (data.code === 0) {
        message.success('保存成功')
      } else {
        message.error(data.message)
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/menus') {
          dispatch({ type: 'fetch', });
        }
      });
    },
  },
};
