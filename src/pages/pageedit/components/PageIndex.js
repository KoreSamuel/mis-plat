import { connect } from 'dva';
import PageSearch from './PageSearch';
import PageDetail from './PageDetail';
import './PageIndex.less';

function PageIndex({ page_template }) {
  return (
     +page_template === 2 ? <PageSearch /> : <PageDetail />
  );
}

function mapStateToProps(state) {
  const { page_template } = state.pageedit;
  return {
    page_template,
  };
}

export default connect(mapStateToProps)(PageIndex);
