import { connect } from 'dva';
import { Table, Popconfirm, Button, Card } from 'antd';
import router from 'umi/router';
import styles from './Projects.less';
import ProjectsModal from './ProjectsModal';

function Projects({ dispatch, list: dataSource, loading }) {

  function goToProject(id) {
    dispatch({
      type: 'projects/gotoProject',
      payload: id
    })
    router.push('/menus');
  }

  function deleteHandler(id) {
    dispatch({
      type: 'projects/remove',
      payload: id,
    });
  }

  function exportHandler(id) {
    dispatch({
      type: 'projects/export',
      payload: id
    })
  }

  function editHandler(id, values) {
    dispatch({
      type: 'projects/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'projects/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'site',
      key: 'site',
      render: (text, record) => <a onClick={goToProject.bind(null, record.site_id)}>{text}</a>,
    },
    {
      title: '项目别名',
      dataIndex: 'site_name',
      key: 'site_name',
    },
    {
      title: '项目描述',
      dataIndex: 'site_desc',
      key: 'site_desc',
    },
    {
      title: '项目模板',
      dataIndex: 'site_template',
      key: 'site_template',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ProjectsModal record={record} onOk={editHandler.bind(null, record.site_id)}>
            <a>编辑</a>
          </ProjectsModal>
          <Popconfirm title="您确定要删除吗?" onConfirm={deleteHandler.bind(null, record.site_id)}>
            <a href="">删除</a>
          </Popconfirm>
          <Popconfirm title="您确定要导出吗?" onConfirm={exportHandler.bind(null, record.site_id)}>
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
          rowKey={record => record.site_id}
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
