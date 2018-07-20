import { connect } from 'dva';
import { Input, Button, Card, Divider, Form } from 'antd';
import SearchFields from './SearchFields';
import ShowFields from './ShowFields'
import FieldList from './FieldList';

const FormItem = Form.Item;

function PageSearch({ dispatch, url, page_template, page_name, searchFields, showFields, loading }) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  function addSearchFields(values) {
    dispatch({
      type: 'pageedit/addSearch',
      payload: values
    });
  }
  function addShowFields(values) {
    dispatch({
      type: 'pageedit/addShow',
      payload: values
    });
  }
  function changeUrl(e) {
    const value = e.target.value;
    dispatch({
      type: 'pageedit/urlChange',
      payload: value
    });
  }
  function submit() {
    dispatch({
      type: 'pageedit/submit'
    })
  }
  function removeSearch(values) {
    dispatch({
      type: 'pageedit/removeSearch',
      payload: values
    })
  }
  function removeShow(values) {
    dispatch({
      type: 'pageedit/removeShow',
      payload: values
    })
  }
  return (
    <div>
      <Card title={'页面名称：' + page_name}>
        <div style={{ maxWidth: 600 }}>
          <h4>配置项</h4>
          <Divider />
          <FormItem
            {...formItemLayout}
            label="请求地址"
          >
            <Input onChange={changeUrl} defaultValue={url} />
          </FormItem>
          <Divider />
          <SearchFields onOk={addSearchFields} />
          <Divider />
          <div>
            <p>已添加字段</p>
            <FieldList type="search" removeItem={removeSearch} list={searchFields} />
          </div>
          <Divider />
          <ShowFields onOk={addShowFields} />
          <Divider />
          <div>
            <p>已添加字段</p>
            <FieldList type="show" removeItem={removeShow} list={showFields} />
          </div>
          <Divider />
        </div>
        <Button onClick={submit}>确认保存</Button>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { url, page_template,  page_name, searchFields, showFields } = state.pageedit;
  return {
    url,
    page_template,
    page_name,
    searchFields,
    showFields,
    loading: state.loading.models.pageedit,
  };
}

export default connect(mapStateToProps)(PageSearch);
