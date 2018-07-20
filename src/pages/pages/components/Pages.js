import { connect } from 'dva';
import { Table, Popconfirm, Button, Card } from 'antd';
import router from 'umi/router'
import styles from './Pages.less';
import PagesModal from './PagesModal';

function Pages({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'pages/remove',
      payload: id,
    });
  }

  function editHandler(page_id, values) {
    dispatch({
      type: 'pages/patch',
      payload: { page_id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'pages/create',
      payload: values,
    });
  }

  function goToDetail(page_id) {
    dispatch({
      type: 'pages/toDetail',
      payload: page_id
    })
    router.push('/pageedit');
  }

  const columns = [
    {
      title: '页面名称',
      dataIndex: 'page_name',
      key: 'page_name',
      render: (text, record) => <a onClick={goToDetail.bind(null, record.page_id)}>{text}</a>,
    },
    {
      title: '页面URL',
      dataIndex: 'page_url',
      key: 'url',
    },
    {
      title: '页面模板',
      dataIndex: 'page_template',
      key: 'page_template',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <PagesModal record={record} onOk={editHandler.bind(null, record.page_id)}>
            <a>编辑</a>
          </PagesModal>
          <Popconfirm title="您确定要删除吗?" onConfirm={deleteHandler.bind(null, record.page_id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <Card>
        <div className={styles.create}>
          <PagesModal record={{}} onOk={createHandler}>
            <Button type="primary">新增页面</Button>
          </PagesModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          bordered
          dataSource={dataSource}
          rowKey={record => record.page_id}
          pagination={false}
        />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { list } = state.pages;
  return {
    list,
    loading: state.loading.models.pages,
  };
}

export default connect(mapStateToProps)(Pages);
