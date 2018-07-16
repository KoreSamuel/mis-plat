import { connect } from 'dva';
import { Table, Popconfirm, Button, Card } from 'antd';
import styles from './Pages.less';
import PagesModal from './PagesModal';

function Pages({ dispatch, list: dataSource, loading, total, page: current }) {
  console.log(dataSource)
  function deleteHandler(id) {
    dispatch({
      type: 'pages/remove',
      payload: id,
    });
  }

  function editHandler(id, values) {
    dispatch({
      type: 'pages/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'pages/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '页面名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={'/pageedit?id=' + record.id}>{text}</a>,
    },
    {
      title: '页面URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '页面模板',
      dataIndex: 'template',
      key: 'template',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <PagesModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </PagesModal>
          <Popconfirm title="您确定要删除吗?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
          <Popconfirm title="您确定要导出吗?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">导出</a>
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
          rowKey={record => record.id}
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
