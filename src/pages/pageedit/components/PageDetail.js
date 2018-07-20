import { connect } from 'dva';
import { Input, Button, Card, Divider, Form } from 'antd';
import DetailFields from './DetailFields';
import FieldList from './FieldList';

const FormItem = Form.Item;

function PageDetail({ dispatch, url, page_template, page_name, searchFields, showFields, loading }) {
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
          <DetailFields onOk={addSearchFields} />
          <Divider />
          <div>
            <p>已添加字段</p>
            <FieldList type="search" list={searchFields} />
          </div>
          <Divider />
        </div>
        <Button onClick={submit}>确认保存</Button>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { url, page_template, page_name, searchFields, showFields } = state.pageedit;
  return {
    url: url || '',
    page_template,
    page_name,
    searchFields,
    showFields,
    loading: state.loading.models.pageedit,
  };
}

export default connect(mapStateToProps)(PageDetail);
