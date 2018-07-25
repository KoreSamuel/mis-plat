import { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import SiderMenu from "../components/SiderMenu";
import { getMenuData } from '../common/menu';
import router from 'umi/router';
import logo from '../assets/logo.svg';
import GlobalHeader from "../components/GlobalHeader";
import widthRouter from 'umi/withRouter';

const { Content, Header } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    localStorage.removeItem('authorization');
    localStorage.removeItem('user');
    router.push('/login')
  }

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    let user = localStorage.getItem('user') || '';
    user = user ? JSON.parse(user) : {};
    if (location.pathname === '/login') {
      return <Layout>
        <Content>
          {children}
        </Content>
      </Layout>
    }
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData(location)}
          location={location}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: user.username,
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
              }}
              logout={this.logout}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default widthRouter(connect()(BasicLayout));
