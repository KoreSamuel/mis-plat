import { connect } from 'dva';
import { Card } from 'antd';
import MenusForm from './MenusForm';
import styles from './Menus.less';

function Menus({ dispatch, list, loading }) {
  function handleRemove(item) {
    dispatch({
      type: 'menus/remove',
      payload: item,
    });
  }

  function handleAdd() {
    dispatch({
      type: 'menus/add'
    })
  }

  return (
    <div className={styles.normal}>
      <Card>
        <MenusForm data={list}
          handleRemove={handleRemove}
          handleAdd={handleAdd}
        />
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
