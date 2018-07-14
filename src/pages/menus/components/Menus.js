import { connect } from 'dva';
import {  Button, Card, List, Input } from 'antd';
// import { routerRedux } from 'dva/router';
import styles from './Menus.less';

const ListItem = List.Item;

function Menus({ dispatch, list: dataSource, loading }) {
  /* function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
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
  } */

  return (
    <div className={styles.normal}>
      <Card>
        <List
          size='small'
          dataSource={dataSource.list}
          renderItem={item => (
            <ListItem>
              菜单名称：<Input defaultValue={item.name} style={{ width: 154, marginLeft: 16, marginRight: 20 }} />
              菜单URL：<Input defaultValue={item.url} style={{ width: 154, marginLeft: 16, marginRight: 20 }} /><a>上移</a><a>下移</a><a>删除</a>
            </ListItem>
          )}
        />
        <div style={{marginTop: 20,}}>
          <Button type="primary">增加</Button>
          <Button type="primary" style={{marginLeft: 10}}>确认保存</Button>
        </div>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const { list } = state.menus;
  return {
    list,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Menus);
