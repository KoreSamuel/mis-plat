import * as pageeditServices from '../services/pageedit';
export default {

  namespace: 'pageedit',

  state: {
    page_name: '',
    url: '',
    page_template: 0,
    searchFields: [],
    showFields: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/pageedit') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },

  effects: {
    *fetch({ payload: id }, { call, put }) {
      const { data } = yield call(pageeditServices.fetch, id);
      const { page_config, page_name, page_template } = data.info;
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
    *submit({ payload }, { call, put }) {
      yield console.log('submit')
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
