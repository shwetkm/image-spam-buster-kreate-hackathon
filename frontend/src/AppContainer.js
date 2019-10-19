import React from 'react';
import { Layout, Row, Col, Icon, Menu } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class AppContainer extends React.Component {
  render() {
    const {
      children,
      ...otherProps
    } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
        child && React.cloneElement(child, otherProps),
    );
    return (
        <Layout>
          <Header>
            <Row>
              <Col span={1}>
                <Icon type="home" style={{ color: 'white' }} />
              </Col>
              <Col span={2} offset={10}>
                <span style={{ color: 'white' }}>Wall91</span>
              </Col>
              <Col span={4} />
            </Row>
          </Header>
          <Content>
            <Layout>
              <Sider collapsed={false}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                  </Menu.Item>
                  <SubMenu
                      key="sub1"
                      title={
                        <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
                      }
                  >
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu>
                  <SubMenu
                      key="sub2"
                      title={
                        <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
                      }
                  >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9">
                    <Icon type="file" />
                    <span>File</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Content>
                {childrenWithProps}
              </Content>
            </Layout>
          </Content>
        </Layout>
    );
  }
}

export default AppContainer;
