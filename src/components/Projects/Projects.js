import { connect } from 'dva';
import { Table, Popconfirm, Button, Card } from 'antd';
// import { routerRedux } from 'dva/router';
// import Link from 'umi/link';
import styles from './Projects.less';
import ProjectsModal from './ProjectsModal';

function Projects({ dispatch, list: dataSource, loading, total, page: current }) {
  console.log(dataSource)

  /* function toProjectDetail(id) {
    dispatch(routerRedux.push({
      pathname: '/menus',
      query: { id },
    }));
  } */

  function deleteHandler(id) {
    dispatch({
      type: 'projects/remove',
      payload: id,
    });
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={'/menus?id=' + record.id}>{text}</a>,
    },
    {
      title: '项目描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ProjectsModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </ProjectsModal>
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
          <ProjectsModal record={{}} onOk={createHandler}>
            <Button type="primary">新增项目</Button>
          </ProjectsModal>
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
  const { list } = state.projects;
  return {
    list,
    loading: state.loading.models.projects,
  };
}

export default connect(mapStateToProps)(Projects);
