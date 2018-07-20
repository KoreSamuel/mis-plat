import * as pageeditServices from '../services/pageedit';
import { message } from 'antd';
import router from 'umi/router';
export default {

  namespace: 'pageedit',

  state: {
    page_name: '',
    url: '',
    page_template: null,
    searchFields: [],
    showFields: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/pageedit') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      let page_id = yield select(state => state.pages.curPage);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      if (!page_id) {
        page_id = localStorage.getItem('curPage');
      }
      const { data } = yield call(pageeditServices.fetch, { id, page_id });
      const { page_config = {url: '', fields: {}}, page_name, page_template } = data.info;
      yield put({
        type: 'save',
        payload: {
          page_name,
          url: page_config.url || '',
          page_template,
          searchFields: page_config.fields.searchFields || [],
          showFields: page_config.fields.showFields || []
        },
      });
    },
    *submit({ payload }, { call, put, select }) {
      let id = yield select(state => state.projects.curProject);
      let page_id = yield select(state => state.pages.curPage);
      if (!id) {
        id = localStorage.getItem('curProject');
      }
      if (!page_id) {
        page_id = localStorage.getItem('curPage');
      }
      const values = yield select(state => state.pageedit)
      const { data } = yield call(pageeditServices.submit, { id, page_id, values });
      if (data.code === 0) {
        message.success('保存成功');
        router.push('/pages');
      } else {
        message.error(data.message)
      }
    }
  },

  reducers: {
    save(state, { payload: { page_name, url, page_template, searchFields, showFields } }) {
      return { ...state, page_name, url, page_template, searchFields, showFields };
    },
    addSearch(state, action) {
      const { searchFields } = state;
      return { ...state, searchFields: [...searchFields, action.payload] }
    },
    addShow(state, action) {
      const { showFields } = state;
      return { ...state, showFields: [...showFields, action.payload] }
    },
    urlChange(state, action) {
      return { ...state, url: action.payload }
    }
  },

};
